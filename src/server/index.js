import express from 'express';
import { join } from 'path';
import { log } from 'winston';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// import multer from 'multer'; // multipart/form-data
// const upload = multer({ dest: 'uploads/' });

import routes from './routes';

const configureDevelopment = app => {
    const clientConfig = require('../../webpack/client');
    const serverConfig = require('../../webpack/server');

    const publicPath = clientConfig.output.publicPath;
    const outputPath = clientConfig.output.path;

    const multiCompiler = require('webpack')([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];

    app.use(require('webpack-dev-middleware')(multiCompiler, {publicPath}));
    app.use(require('webpack-hot-middleware')(clientCompiler));

    app.use(publicPath, express.static(outputPath));

    app.use(require('webpack-hot-server-middleware')(multiCompiler, {
        serverRendererOptions: { outputPath }
    }));

    app.set('views', join(__dirname, '../../public/views'));
};

const configureProduction = app => {
    let clientStats;
    let serverRender;

    if (process.env.NODE_ENV === 'production') {
      clientStats = require('../../public/assets/stats.json');
      serverRender = require('../../public/assets/app.ssr.js').default;
    }

    const publicPath = '/';
    const outputPath = join(__dirname, '');

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({
        clientStats,
        outputPath
    }));

    app.set('views', join(__dirname, '../views'));
};

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(favicon(join(__dirname, '../../public/img/favicon.ico')));

app.use('/api', routes);

log('info', `Configuring server for environment: ${process.env.NODE_ENV}...`);
if (process.env.NODE_ENV === 'development') {
    configureDevelopment(app);
} else {
    configureProduction(app);
}

log('info', 'Configuring server engine...');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => log('info', `Server listening on port ${app.get('port')}...`));

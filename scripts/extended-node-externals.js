const nodeExternals = require('./node-externals');
const projectExternals = {
    '../../public/assets/stats.json': 'commonjs ../../public/assets/stats.json',
    '../../public/assets/stats.json': 'commonjs ../../public/assets/stats.json'
};

module.exports = {
    ...nodeExternals,
    ...projectExternals
};

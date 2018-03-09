import Home from '../components/Home';
import List from '../components/List';
import NotFound from '../components/NotFound';

const routes = [
  { path: '/',
    exact: true,
    component: Home
  },
  { path: '/home',
    component: Home
  },
  { path: '/p',
    component: Home,
  },
  { path: '/list',
    exact: true,
    component: List,
  },
  { path: '/list/1',
    component: Home
  },
  { path: '/privet',
    exact: true,
    component: List,
    routes: [
      { path: '/privet/1',
        component: Home
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;

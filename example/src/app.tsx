import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GettingStarted from './page/getting-started';
import Root from './root';
import Home from './page/home';
import Api from './page/api';
import Example from './page/example';
import Theme from './page/theme';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/getting-started',
          element: <GettingStarted />,
        },
        {
          path: '/api',
          element: <Api />,
        },
        {
          path: '/example',
          element: <Example />,
        },
        {
          path: '/theme',
          element: <Theme />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.DEV ? undefined : '/react-simple-toasts',
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

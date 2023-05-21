import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GettingStarted from './page/getting-started';
import Root from './root';
import Home from './page/home';
import Example from './page/example';
import Api from './page/api';

const router = createBrowserRouter([
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GettingStarted from './page/getting-started';
import Root from './root';
import Home from './page/home';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

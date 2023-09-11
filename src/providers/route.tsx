import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { ProtectedRoute } from '../components/protected-route';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};

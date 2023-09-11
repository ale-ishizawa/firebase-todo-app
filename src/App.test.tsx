import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const TestComponent = () => <div>Testing</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TestComponent />,
      },
    ],
  },
]);

const renderApp = () => {
  render(<RouterProvider router={router} />);
};

test('renders learn react link', () => {
  renderApp();
  const loginButton = screen.getByText('Login');
  expect(loginButton).toBeInTheDocument();
  expect(screen.getByText('Testing')).toBeInTheDocument();
});

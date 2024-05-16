import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: ':details',
    element: <HomePage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

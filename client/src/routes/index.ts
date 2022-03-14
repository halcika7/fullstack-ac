import { lazy, LazyExoticComponent } from 'react';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Home from '../pages/home';

type Route = {
  path: string;
  Component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
};

export const basicRoutes: Route[] = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
];

export const authenticatedRoutes: Route[] = [
  {
    path: '/dashboard',
    Component: lazy(() => import('../pages/dashboard')),
  },
  {
    path: '/orders',
    Component: lazy(() => import('../pages/orders')),
  },
  {
    path: '/profile',
    Component: lazy(() => import('../pages/profile')),
  },
];

export const adminRoutes: Route[] = [
  {
    path: '/activities',
    Component: lazy(() => import('../pages/activities')),
  },
  {
    path: '/programs',
    Component: lazy(() => import('../pages/programs')),
  },
  {
    path: '/program',
    Component: lazy(() => import('../pages/programs/program')),
  },
];

export const customerRoutes: Route[] = [
  {
    path: '/order',
    Component: lazy(() => import('../pages/order')),
  },
];

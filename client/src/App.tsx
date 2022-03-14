import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Layout from './components/layouts/layout';
import { getMe } from './pages/auth/store/actions';
import { AppState } from './store/reducer';
import FullSpinner from './components/spinner/full-spinner';
import ProtectedRoute from './routes/protected/protected.route';
import AuthenticatedLayout from './components/layouts/authenticated.layout';
import RoleRoute from './routes/protected/role.route';
import {
  adminRoutes,
  authenticatedRoutes,
  basicRoutes,
  customerRoutes,
} from './routes';

const authState = createSelector(
  (state: AppState) => state.auth,
  auth => ({ token: auth.token, loading: auth.loading })
);

function App() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector(authState);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  if (loading) return <FullSpinner />;

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {basicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
          {authenticatedRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <route.Component />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            />
          ))}
          {adminRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <RoleRoute userRole="admin">
                    <AuthenticatedLayout>
                      <route.Component />
                    </AuthenticatedLayout>
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
          ))}
          {customerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <RoleRoute userRole="customer">
                    <AuthenticatedLayout>
                      <route.Component />
                    </AuthenticatedLayout>
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from 'src/guards/GuestGuard';
import MainLayout from 'src/layouts/main';
import AuthGuard from 'src/guards/AuthGuard';
import Profile from 'src/pages/Profile';
import useAuth from 'src/hooks/useAuth';
import OthersProfile from 'src/pages/OthersProfile';
import EventDetail from 'src/pages/EventDetail';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import AdminHome from 'src/pages/admin/AdminHome';
import AdminEvents from 'src/pages/admin/AdminEvents';
import AdminUsers from 'src/pages/admin/AdminUsers';
import AdminComments from 'src/pages/admin/AdminComments';
import AdminReports from 'src/pages/admin/AdminReports';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {

  const { user } = useAuth()
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },
    {
      path: '/user',
      element: <AuthGuard><MainLayout /></AuthGuard>,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'profile/:id', element: <OthersProfile /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ]
    },
    {
      path: '/event',
      element: <AuthGuard><MainLayout /></AuthGuard>,
      children: [
        { path: 'detail/:id', element: <EventDetail /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ]
    },
    {
      path: '*',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/home" replace />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/admin',
      element: <RoleBasedGuard accessibleRoles={["Admin"]} ><DashboardLayout /></RoleBasedGuard>,
      children: [
        { element: <Navigate to="dashboard" replace />, index: true },
        { path: 'dashboard', element: <AdminHome /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'events', element: <AdminEvents /> },
        { path: 'comments', element: <AdminComments /> },
        { path: "reports", element: <AdminReports /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ]
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));

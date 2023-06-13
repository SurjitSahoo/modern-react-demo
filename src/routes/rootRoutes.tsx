import PageNotFound from 'pages/errors/notFound';
import ReduxClientStateDemo from 'pages/reduxClientState';
import ReduxServerStateDemo from 'pages/reduxServerState';
import { Route, Routes, Navigate } from 'react-router';

export function RootRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/reduxClientStateDemo' />} />
      <Route path='/reduxClientStateDemo' element={<ReduxClientStateDemo />} />
      <Route path='/reduxServerStateDemo' element={<ReduxServerStateDemo />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

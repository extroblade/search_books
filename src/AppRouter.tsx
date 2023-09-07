import { Route, Routes, Navigate } from 'react-router-dom';
import { SearchPage } from '@/pages';
import { BookPage } from '@/pages';

const routes = [
  { path: '/', element: <SearchPage /> },
  { path: '/book/:id', element: <BookPage /> },
  { path: '*', element: <Navigate to={'/'} replace /> },
];

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

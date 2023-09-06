import { Route, Routes, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage.tsx';
import { BookPage } from './pages/BookPage.tsx';

const routes = [
  { path: '/', element: <MainPage /> },
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

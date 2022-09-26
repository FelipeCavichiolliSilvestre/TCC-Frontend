import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WithNavbar from '@/layouts/WithNavbar';
import WithoutNavbar from '@/layouts/WithoutNavbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfessorsPage from './ProfessorsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNavbar />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<WithNavbar />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/professors" element={<ProfessorsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

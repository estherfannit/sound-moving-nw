import { Outlet, Route, Routes } from 'react-router-dom';
import Switcher from './components/Switcher.jsx';
import Hub from './components/Hub.jsx';
import OptionLanding from './components/OptionLanding.jsx';
import PageView from './components/PageView.jsx';
import NotFound from './components/NotFound.jsx';

function Layout() {
  return (
    <>
      <Outlet />
      <Switcher />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Hub />} />
        <Route path="option/:letter" element={<OptionLanding />} />
        <Route path="option/:letter/:slug" element={<PageView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

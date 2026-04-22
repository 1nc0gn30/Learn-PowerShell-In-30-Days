import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import DayDetail from '../pages/DayDetail';
import Projects from '../pages/Projects';
import NotFound from '../pages/NotFound';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day/:dayNumber" element={<DayDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

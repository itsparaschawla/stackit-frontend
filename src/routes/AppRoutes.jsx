import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Ask from '../pages/Ask';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import QuestionDetails from '../pages/QuestionDetails';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/ask" element={<PrivateRoute><Layout><Ask /></Layout></PrivateRoute>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/questions/:id" element={<Layout><QuestionDetails /></Layout>} />
      <Route path="/profile/:username" element={<Layout><Profile /></Layout>} />
    </Routes>
  );
}


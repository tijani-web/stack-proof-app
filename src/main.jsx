// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LanguageGrid from './components/LanguageGrid.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CodeQuest from './pages/CodeQuest.jsx';
import { UserProvider } from './firebase/UserContext.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import AboutUs from './pages/AboutUs.jsx';
import LeaderBoard from './pages/LeaderBoard.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/language-selector', element: <LanguageGrid /> },
  { path: '/code-quest', element: <CodeQuest /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/leaderboard', element: <LeaderBoard /> }
],
  { basename: '/stack-proof-app' }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);

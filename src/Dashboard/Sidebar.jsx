// src/dashboard/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../firebase/UserContext';
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const auth = getAuth(); 

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  };

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-links">
        <div className="sidebar-main">
        <NavLink to="/dashboard">🏠 Dashboard</NavLink>
        </div>
       <div className="sidebar-links">
         <NavLink to="/language-selector">🧠 Challenges</NavLink>
        <NavLink to="/leaderboard">🏆 LeaderBoard</NavLink>
       </div>
      </nav>

      <div className="sidebar-footer">
        <hr
          style={{
            background: '#ffffff',
            border: 'none',
            height: '1px',
            margin: '1rem 0',
          }}
        />
        {user && (
          <>
            <p className="user-email">{user.email}</p>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

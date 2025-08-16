import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Layout from '../components/Layout';
import TopBar from './Topbar';
import './dashboard.css';
import { useUser } from '../firebase/UserContext';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import XPCard from './XpCard';
import StatsGrid from './StatsGrid';
import RecentChallenges from './RecentChallenge';
import LevelProgress from './LevelProgress';
import StartChallenge from './StartChallenge';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
  const fetchUserXP = async () => {
    if (user) {
      setUsername(user.displayName || user.email?.split('@')[0]);

      const docRef = doc(db, 'users', user.uid, 'profile', 'data');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const xpValue = Number(data.xp);
        setXp(isNaN(xpValue) ? 0 : xpValue);
      } else {
        setXp(0);
      }
    }
  };

  fetchUserXP();
}, [user]);


  if (isLoading) return null;

  return (
    <Layout>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <TopBar username={username} xp={xp} />
          <XPCard xp={xp} />
          <StatsGrid />
          <RecentChallenges />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { useUser } from '../firebase/UserContext';
import { collection, getDocs } from 'firebase/firestore';

const StatsGrid = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    total: 0,
    passed: 0,
    failed: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const historyRef = collection(db, 'users', user.uid, 'history');
      const historySnap = await getDocs(historyRef);

      let passed = 0;
      let failed = 0;

      historySnap.forEach(doc => {
        const data = doc.data();
        if (data.result === 'passed') passed++;
        else if (data.result === 'failed') failed++;
      });

      setStats({
        total: passed + failed,
        passed,
        failed,
      });
    };

    fetchStats();
  }, [user]);

  const successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;

  const gridItems = [
    { label: 'Total Challenges', value: stats.total },
    { label: 'Challenges Passed', value: stats.passed },
    { label: 'Challenges Failed', value: stats.failed },
    { label: 'Success Rate', value: `${successRate}%` },
  ];

  return (
    <div className="stats-grid">
      {gridItems.map((item, index) => (
        <div className="stat-box" key={index}>
          <h4>{item.value}</h4>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

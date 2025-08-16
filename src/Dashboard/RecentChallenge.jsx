import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useUser } from '../firebase/UserContext';

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'just now';

  let millis = null;

  try {
    if (timestamp.toMillis) {
      millis = timestamp.toMillis();
    } else if (timestamp.seconds) {
      millis = timestamp.seconds * 1000; // fallback if stored as { seconds, nanoseconds }
    } else if (typeof timestamp === 'number') {
      millis = timestamp;
    } else {
      millis = new Date(timestamp).getTime();
    }
  } catch {
    return 'just now';
  }

  if (!millis || isNaN(millis)) return 'just now';

  const secondsAgo = Math.floor((Date.now() - millis) / 1000);

  if (secondsAgo < 60) return 'just now';
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} min ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hr ago`;
  return `${Math.floor(secondsAgo / 86400)} day${secondsAgo >= 172800 ? 's' : ''} ago`;
};



const RecentChallenges = () => {
  const { user } = useUser();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      const historyRef = collection(db, 'users', user.uid, 'history');
      const q = query(historyRef, orderBy('timestamp', 'desc'), limit(5));
      const snap = await getDocs(q);

      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChallenges(data);
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="recent-challenges">
      <h3>Recent Challenges</h3>
      {challenges.length === 0 ? (
        <p className="no-history">No challenges yet.</p>
      ) : (
        <ul>
          {challenges.map(({ id, taskTitle, taskLanguage, result, xp, timestamp }) => (
            <li key={id} className={result === 'passed' ? 'passed' : 'failed'}>
              <div className="challenge-language">
                <strong>{taskLanguage || 'Unknown'}</strong> {/* ✅ fallback */}
              </div>
              <div className="challenge-info">
                <strong>{taskTitle || 'Untitled Challenge'}</strong> {/* ✅ fallback */}
                <span>{result === 'passed' ? '✅ Passed' : '❌ Failed'}</span>
              </div>
              <div className="challenge-meta">
                <span className="xp">+{xp || 0} XP</span>
                <span className="time">{formatTimeAgo(timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentChallenges;

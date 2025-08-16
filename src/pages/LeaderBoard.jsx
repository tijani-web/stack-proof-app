import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
import { FaStar, FaMedal, FaBolt } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import './leaderBoard.css';
import Layout from "../components/Layout";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const profilesSnap = await getDocs(collectionGroup(db, "profile"));
        const results = [];

        profilesSnap.forEach((docSnap) => {
          if (docSnap.id === "data") {
            const data = docSnap.data();
            results.push({
              id: docSnap.ref.parent.parent.id,
              username: data.username || "Anonymous",
              xp: data.xp || 0
            });
          }
        });

        setLeaders(results.sort((a, b) => b.xp - a.xp).slice(0, 10));
      } catch (error) {
        console.error("Leaderboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const triggerConfetti = (rank) => {
    if (rank > 2) return;
    confetti({
      particleCount: 50 + (3 - rank) * 30, // More for higher ranks
      spread: 70,
      origin: { y: 0.6 },
      colors: rank === 0 ? ['#ffd700', '#ffffff'] : 
              rank === 1 ? ['#c0c0c0', '#ffffff'] : 
              ['#cd7f32', '#ffffff']
    });
  };

  if (loading) return (
    <Layout>
      <div className="leaderboard-wrapper">
        <div className="leaderboard">
          <h2>🏆 Loading Leaderboard...</h2>
          <ul>
            {Array(10).fill().map((_, i) => (
              <li key={i} className="leader-row skeleton" style={{ "--row-index": i }}>
                <span className="rank"></span>
                <span className="name"></span>
                <span className="xp"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );

  if (leaders.length === 0) return (
    <Layout>
      <div className="leaderboard-wrapper">
        <div className="leaderboard" style={{ color: '#94a3b8' }}>
          <p>Login or stay logged in to see the leaderboard.</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="leaderboard-wrapper">
        <div className="leaderboard">
          <h2>🏆 Leaderboard (Top 10 Overall)</h2>
          <ul>
            {leaders.map((leader, index) => (
              <li 
                key={leader.id} 
                className="leader-row"
                style={{ "--row-index": index }}
                onClick={() => triggerConfetti(index)}
              >
                <span className="rank">
                  {index === 0 && <FaMedal style={{ color: 'gold' }} />}
                  {index === 1 && <FaMedal style={{ color: 'silver' }} />}
                  {index === 2 && <FaMedal style={{ color: '#cd7f32' }} />}
                  {index >= 3 && <FaStar style={{ color: '#94a3b8' }} />}
                </span>
                <span className="name">{leader.username}</span>
                <span className="separator"> – </span>
                <span className="xp">
                  {leader.xp.toLocaleString()} XP <FaBolt className="bolt" />
                </span>
                {index < 3 && (
                  <span className="rank-badge">{index + 1}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NavLink } from 'react-router-dom';
import { useUser } from '../firebase/UserContext';

export default function QuestResult({
  isPassed,
  timeLeft,
  baseXp,
  bonusXp,
  totalXp,
  onRetry,
  onNewChallenge,
  onLogin,
  onSignUp,
  onClose,
}) {
  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        zIndex: 2000,
      });
    }
  }, [isPassed]);
  const { user } = useUser();

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  return (
    <div className="modal-overlay">
      <div className={`quest-result-modal ${isPassed ? 'success' : 'fail'}`}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>✖</button>

        {/* Title */}
        <h2 className="modal-title">
          {isPassed ? '🎉 Challenge Completed!' : ' Almost There!'}
        </h2>

        {/* Result Info */}
        <ul className="result-info">
          <li><strong>Status:</strong> {isPassed ? 'Passed' : ' Failed'}</li>
          <li><strong>Time Left:</strong> ⏱ {formatTime(timeLeft)}</li>

          {isPassed && (
            <>
              <li><strong>Base XP:</strong> ⚡{baseXp}</li>
              <li><strong>Bonus XP:</strong> ⚡{bonusXp}</li>
              <li><strong>Total XP:</strong> ⚡{totalXp}</li>
            </>
          )}
        </ul>

       {!user && (
         <>
           {/* Tip */}
           <p className="result-tip">
             {isPassed
               ? '🔒 Login / Sign up to save your XP and track your progress!'
               : '💡 You can retry and improve!'}
           </p>

           {/* Auth Buttons */}
           <div className="auth-actions" style={{ display: 'flex', gap: '10px' }}>
             <NavLink to="/login" onClick={onLogin} className="btn-secondary">🔐 Login</NavLink>
             <NavLink to="/sign-up" onClick={onSignUp} className="btn-secondary">📝 Sign Up</NavLink>
           </div>
         </>
       )}

        {/* Bottom Buttons */}
        <div className="result-actions">
          <button onClick={onNewChallenge} className="btn-primary">🧠 Try Another Challenge</button>
          <button onClick={onRetry} className="btn-secondary">🔁 Retry This Challenge</button>
        </div>
      </div>
    </div>
  );
}

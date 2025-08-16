import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful! Redirecting...');

      const pendingXP = localStorage.getItem('pendingXP');
      if (pendingXP) {
        const userRef = doc(db, "users", auth.currentUser.uid, "profile", "data");
        const docSnap = await getDoc(userRef);
        const prevXP = docSnap.exists() ? docSnap.data().xp || 0 : 0;
        await setDoc(userRef, { xp: prevXP + parseInt(pendingXP) });
        localStorage.removeItem('pendingXP');
      }

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setError('Login failed. Check your credentials.');
    }
  };

  const passwordReset = async () => {
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Reset email sent. Check your inbox.');
    } catch (err) {
      setError('Failed to send reset email.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Welcome Back</h1>
          <p>Level up your skills. One challenge at a time.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <div className="login-card">
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="input-icon">✉️</span>
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span className="input-icon">🔒</span>
              </div>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <button type="submit" className="login-button">Login</button>
              <div className="login-footer">
                <button type="button" onClick={passwordReset} className="reset-password-link">Forgot password?</button>
                <span>Don't have an account? <NavLink to="/sign-up" className="sign-up-link">Register</NavLink></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const { username, email, password } = formData;

      // Create Firebase Auth account
      await createUserWithEmailAndPassword(auth, email, password);

      // Set display name in Auth profile
      await updateProfile(auth.currentUser, { displayName: username });

      // Parse pendingXP from localStorage (handle JSON structure)
      const pendingXPRaw = localStorage.getItem('pendingXP');
      let pendingXP = 0;

      if (pendingXPRaw) {
        try {
          const parsed = JSON.parse(pendingXPRaw);
          pendingXP = parsed.xp || 0;
        } catch {
          // fallback if parsing fails
          pendingXP = Number(pendingXPRaw) || 0;
        }
      }

      // Prepare Firestore user data
      const userRef = doc(db, 'users', auth.currentUser.uid, 'profile', 'data');

      await setDoc(userRef, {
        username, // store username
        xp: pendingXP,
        xpByLanguage: {}, // start empty
      });

      if (pendingXPRaw) localStorage.removeItem('pendingXP');

      setSuccess('Account created successfully! Redirecting...');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setSignupError(error.message || 'Sign up failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-content">
          <h1>Join the Quest</h1>
          <p>Track your progress. Earn XP. Climb the leaderboard.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-btn"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            {success && <p className="success">{success}</p>}
            {signupError && <p className="error">{signupError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

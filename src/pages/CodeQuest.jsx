import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import ChallengeHeader from '../components/ChallengeHeader';
import TaskDetails from '../components/TaskDetails';
import tasks from '../utils/fullTasks.json';
import QuestEditor from '../components/QuestEditor';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestOutput from '../components/QuestOutput';
import QuestResult from '../components/QuestResult';
import Timer from '../components/Timer';
import { db } from '../firebase/firebase';
import { FieldPath } from 'firebase/firestore';
import './error.css'
import {
  doc,
  getDoc,
  setDoc,
  increment,
  updateDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function CodeQuest() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const resultRef = useRef();

  const normalize = (str) => str?.toString().trim().replace(/\r?\n/g, '');

  const { selectedLanguage, selectedDifficulty, selectedCategories } = state || {};

  const filteredTasks = tasks.filter(
    (t) =>
      t.language === selectedLanguage &&
      t.difficulty === selectedDifficulty &&
      selectedCategories?.every((cat) => t.categories.includes(cat))
  );

  useEffect(() => {
    if (filteredTasks.length > 0) {
      const random = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
      setTask(random);

      const fallbackTime = {
        Beginner: 5,
        Intermediate: 10,
        Advanced: 15,
      }[random.difficulty] || 5;

      setTimeLeft(fallbackTime * 60);
    }
  }, [selectedLanguage, selectedDifficulty, selectedCategories]);

  if (!state) {
  return (
    <Layout>
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Challenge Not Selected</h2>
          <p className="error-message">Please go back and choose a coding challenge to continue.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="error-button"
          >
            <span className="button-icon">←</span>
            Return to Challenges
          </button>
        </div>
      </div>
    </Layout>
  );
}

if (!task) {
  return (
    <Layout>
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">🔍</div>
          <h2 className="error-title">Task Not Found</h2>
          <p className="error-message">We couldn't find the challenge you're looking for.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="error-button"
          >
            <span className="button-icon">←</span>
            Back to Selection
          </button>
        </div>
      </div>
    </Layout>
  );
}

  const xpTable = {
    Beginner: 50, 
    Intermediate: 75,
    Advanced: 100,
  };

  const initialMinutesTime = {
    Beginner: 5,
    Intermediate: 10,
    Advanced: 15,
  }[task.difficulty] || 5;
  
const saveXPToFirestore = async (xpEarned, task) => {
  const user = getAuth().currentUser;
  if (!user) {
    localStorage.setItem(
      'pendingXP',
      JSON.stringify({ xp: xpEarned, language: task.language })
    );
    return;
  }

  const profileRef = doc(db, 'users', user.uid, 'profile', 'data');

  try {
    await setDoc(
      profileRef,
      {
        xp: increment(xpEarned),
        [`xpByLanguage.${task.language}`]: increment(xpEarned),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to save XP:', err);
  }
};


  const saveToHistory = async ({ result, earnedXP, task }) => {
    const user = getAuth().currentUser;

    const historyData = {
      result,
      xp: earnedXP,
      taskTitle: task.title,
      taskLanguage: task.language, // ✅ added so history can display it
      timestamp: new Date(), // store as Firestore Timestamp-friendly Date object
    };
    if (!user) {
      const pendingHistory = JSON.parse(localStorage.getItem('pendingHistory')) || [];
      pendingHistory.push(historyData);
      localStorage.setItem('pendingHistory', JSON.stringify(pendingHistory));
      return;
    }

    const historyRef = collection(db, 'users', user.uid, 'history',);

    try {
      await addDoc(historyRef, historyData);
    } catch (err) {
      console.error('Failed to save challenge history:', err);
    }
  };

  const handleSubmitComplete = (finalOutput, isError, submissionStatus) => {
    setOutput(finalOutput);
    setError(isError);
    setStatus(submissionStatus);

    const passed = normalize(finalOutput) === normalize(task.expectedOutput);
    const baseXP = xpTable[task.difficulty] || 50;
    const bonusXP = Math.floor((timeLeft / (initialMinutesTime * 60)) * 25);
    const totalXP = passed ? baseXP + bonusXP : 0;

    if (passed) {
      saveXPToFirestore(totalXP, task);
    }

    saveToHistory({
      result: passed ? 'passed' : 'failed',
      earnedXP: totalXP,
      task,
    });

    setTimeout(() => {
      setShowResult(true);
    }, 3000);
  };

  const handleRetry = () => {
    setOutput('');
    setError(false);
    setStatus(null);
    setShowResult(false);
  };

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/sign-up');
  const handleCloseResult = () => setShowResult(false);

  const baseXP = xpTable[task.difficulty] || 50;
  const bonusXP = Math.floor((timeLeft / (initialMinutesTime * 60)) * 25);
  const isPassed = normalize(output) === normalize(task.expectedOutput);
  const totalXP = isPassed ? baseXP + bonusXP : 0;

  return (
    <Layout>
      <div className={`code-con ${output ? 'dimmed' : ''}`}>
        <div className="challenge-header">
          <ChallengeHeader language={task.language} difficulty={task.difficulty} />
          <Timer initialMinutes={initialMinutesTime} onTimeUpdate={setTimeLeft} />
        </div>

        <div className="code-grid">
          <TaskDetails task={task} />
          <QuestEditor
            starterCode={task.starterCode}
            defaultLanguage={task.defaultLanguage}
            judgeLanguageId={task.judgeLanguageId}
            expectedOutput={task.expectedOutput}
            onSubmitComplete={handleSubmitComplete}
          />
          <QuestOutput output={output} error={error} status={status} isLoading={false} />
        </div>
      </div>

      {showResult && (
        <QuestResult
          ref={resultRef}
          isPassed={isPassed}
          timeLeft={timeLeft}
          baseXp={baseXP}
          bonusXp={bonusXP}
          totalXp={totalXP}
          onRetry={handleRetry}
          onNewChallenge={() => navigate('/language-selector')}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          onClose={handleCloseResult}
        />
      )}
    </Layout>
  );
}

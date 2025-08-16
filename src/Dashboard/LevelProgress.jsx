import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const getLevel = (xp) => Math.floor(xp / 500) + 1;
const getProgressToNext = (xp) => xp % 500;

const LevelProgress = ({ xp }) => {
  const level = getLevel(xp);
  const currentProgress = getProgressToNext(xp);
  const remainingXP = 500 - currentProgress;

  const data = {
    labels: ['Earned', 'Remaining'],
    datasets: [
      {
        data: [currentProgress, remainingXP],
        backgroundColor: ['#7e5bef', '#e2e2e2'],
        borderWidth: 6,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} XP`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="level-progress-card">
      <h3>Level {level}</h3>
      <div className="doughnut-wrapper">
        <Doughnut data={data} options={options} />
        <div className="center-text">
          <h4>{currentProgress} / 500</h4>
          <p>XP to Level {level + 1}</p>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;

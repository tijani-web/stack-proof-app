import React from 'react'

const SkillAnalysis = () => {
  return (
    <>
         {/* Analysis */}
       <div className="analysis-card glass">
            <h3>AI Skill Insight</h3>
            <p className="analysis-description">
              Based on your resume and submission, here are the tech stacks and proficiencies detected:
            </p>
            <ul className="skills-list">
              <li><span className="dot react" /> React (Advanced)</li>
              <li><span className="dot js" /> JavaScript (Intermediate)</li>
              <li><span className="dot css" /> CSS (Basic)</li>
              <li><span className="dot node" /> Node.js (Basic)</li>
            </ul>
          </div>
    </>
  )
}

export default SkillAnalysis
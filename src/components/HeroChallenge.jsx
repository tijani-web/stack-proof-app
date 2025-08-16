import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { FaCode } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const HeroChallenge = () => {
    const [code, setCode] = useState(`function add(a, b) {
    //complete the function
    }`);
    const [showModal, setShowModal] = useState(false);
    const handleSubmit = () => {
        try {
            const userFunc = new Function(`${code}; return add(4, 6);`);
            const result = userFunc();
              if (result === 10) {
                setShowModal(true);
            } else {
                alert("⚠️ Incorrect! Please try again.");
            }

        } catch (err) {
          
           alert("⚠️ Error in your code.");
        }
    }

  return (
    <>
      <div className="challenge">
        <div className="challenge-left">
            <div className="challenge-left-con">
              <h1>🧠 Task: Add Two Numbers</h1>
            <p> Write a JavaScript function called <code>add</code> that takes two numbers and returns their sum.</p>
            <p className='hint'>Hint: You can use the <code>+</code> operator to add two numbers.</p>
            <p className='code'><span>Cheat Code:</span>function add(a, b)''return a + b; </p>
            </div>
        </div>
        <div className="challenge-right">
            <div className="editor-main-con">
              <Editor
                // height="300px"
                width="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value)}
                theme='vs-dark'
                style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                className='hero-monaco'
            />
            <button className='btn-primary' onClick={handleSubmit}>Submit Code <FaCode className='icon'/> </button>
            </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>🎉 Challenge Complete!</h2>
              <p>Select your next challenge: Pick your stack, difficulty</p>
              <NavLink to="/language-selector" className="btn-primary">Start Challenge</NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default HeroChallenge
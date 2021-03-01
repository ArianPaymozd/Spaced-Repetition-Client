import React, { useEffect, useState, useContext } from 'react'
import {useSpring, animated} from 'react-spring'
import ApiContext from '../../ApiContext';
import Goo from '../../components/Goo/Goo';
import config from '../../config';
import TokenService from '../../services/token-service';
import './Learning.css'

function LearningRoute() {
  const context = useContext(ApiContext)

  const [isCorrect, setIsCorrect] = useState(false)
  const [word, setWord] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => res.json())
    .then(data => {
        setWord(data.nextWord)
        setTotalScore(data.totalScore)
        setCorrect(data.wordCorrectCount)
        setIncorrect(data.wordIncorrectCount)
    })
  })

  const handleGuess = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guess: e.target['guess-input'].value
      })
    })
    .then(res => res.json())
    .then(data => {
        setWord(data.nextWord)
        setTotalScore(data.totalScore)
        setCorrect(data.wordCorrectCount)
        setIncorrect(data.wordIncorrectCount)
        setIsCorrect(data.isCorrect)
    })
  }

  return (
    <div>
      <animated.div className='learning-page' style={{transform }}>
          <h2 className='current-word'>{word}</h2>
          <div className='scores'>
            <h3 className='total-score'>{totalScore}</h3>
            <div className='word-scores'>
              <span className='correct'>{correct}</span>
              <span className='incorrect'>{incorrect}</span>
            </div>
          </div>
          <form className='guess' onSubmit={handleGuess}>
            <input className='guess-input' name='guess-input' type='text' placeholder='Whats your guess?' />
            <button className='guess-check' onClick={() => set(state => !state)}>Check</button>
          </form>
      </animated.div>
      <animated.div className='learning-page-result' style={{ zIndex: flipped ? 2 : 0, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
        <h2 className='result'>{isCorrect ? 'Congrats! you got it right' : 'Oh no you were a little off!'}</h2>
        <button className='next' onClick={() => set(state => !state)}>Next</button>
      </animated.div>
      <Goo />
  </div>
  );
  
}

export default LearningRoute

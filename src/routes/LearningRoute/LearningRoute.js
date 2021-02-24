import React, { Component } from 'react'
import ApiContext from '../../ApiContext';
import Goo from '../../components/Goo/Goo';
import config from '../../config';
import TokenService from '../../services/token-service';
import './Learning.css'

class LearningRoute extends Component {
  static contextType = ApiContext

  state = {
    word: '',
    totalScore: 0,
    correct: 0,
    incorrect: 0
  }

  componentDidMount() {
    console.log(this.context.words)
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        word: data.nextWord,
        totalScore: data.totalScore,
        correct: data.wordCorrectCount,
        incorrect: data.wordIncorrectCount
      })
    })
  }

  render() {
    return (
      <div>
        <section className='learning-page'>
          <h2 className='current-word'>{this.state.word}</h2>
          <div className='scores'>
            <h3 className='total-score'>{this.state.totalScore}</h3>
            <div className='word-scores'>
              <span className='correct'>{this.state.correct}</span>
              <span className='incorrect'>{this.state.incorrect}</span>
            </div>
          </div>
          <form className='guess'>
            <input className='guess-input' type='text' placeholder='Whats your guess?' />
            <button className='guess-check' type='submit'>Check</button>
          </form>
        </section>
        <Goo />
      </div>
    );
  }
}

export default LearningRoute

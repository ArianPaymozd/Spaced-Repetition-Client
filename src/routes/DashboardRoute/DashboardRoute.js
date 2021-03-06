import React, { Component } from 'react'
import ApiContext from '../../ApiContext';
import config from '../../config'
import TokenService from '../../services/token-service';
import WordsList from '../../components/WordsList/WordsList'
import './Dashboard.css'


class DashboardRoute extends Component {
  static defaultProps = {
    history: {push: () => {}}
  }

  state = {
    language: {},
    words: []
  }

  static contextType = ApiContext

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
    .then(data => this.setState({
      language: data.language,
      words: data.words
    }))
  }
  
  handleRedirect = () => {
    this.props.history.push('/learn')
  }
  
getCorrectCount = (wordsArr) => {
  let correct = 0
  for (let i = 0; i < wordsArr.length; i++) {
      correct += wordsArr[i].correct_count
  }
  return correct
}

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words
    }
    console.log(value)
    return (
      <ApiContext.Provider value={value}>
        <section className='dashboard'>
          <h2 className='language'>{this.state.language.name}</h2>
            <p>Total correct: {this.getCorrectCount(this.state.words)}</p>
            <button className='learn-button' onClick={this.handleRedirect}>start learning</button>
          <WordsList />
        </section>
      </ApiContext.Provider>
    );
  }
}

export default DashboardRoute

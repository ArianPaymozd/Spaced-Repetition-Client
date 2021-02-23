import React, {useContext} from 'react'
import ApiContext from '../../ApiContext'

import './WordsList.css'


export default function WordsList() {
    const context = useContext(ApiContext)
    return (
        <div className='words-list'>
            {context.words.map((word, idx) => {
                return (
                    <div className='word-item' key={idx}>
                        <h1>{word.original}</h1>
                        <span>correct: {word.correct_count} </span>
                        <span>incorrect: {word.incorrect_count}</span>
                    </div>
                )
            })}
        </div>
    )
}
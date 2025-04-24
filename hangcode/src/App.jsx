import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {languages}  from './languages.js'
import { getFarewell } from './utils.js'
import clsx from 'clsx'
import getWord from './utils.js'
import Confetti from 'react-confetti'

function App() {
  // State variables
  const [word, setWord] = useState(() => getWord())
  const [attempts, setAttempts] = useState([])

  // Derived variables
  const wrongAttemptsCount = attempts.filter(letter => !word.includes(letter)).length
  const GameWon =  word.split("").every(letter => attempts.includes(letter))
  const lastGuessedLetter = attempts[attempts.length - 1]
  // Constan variables
  const alphabet = "qwertyuiopasdfghjklñzxcvbnm"


  function guess(letter) {
    setAttempts(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]) 

      /** 
      * const letterSet = new Set(prevLetters)
      * letterSet.add(letter)
      */
  }

  const languagesElements = languages.map((language, index) => (
    <span 
      className = {clsx({
        'language': true,
        'lost': wrongAttemptsCount > index,
      })}
      key={index} 
      style={{ backgroundColor: language.backgroundColor, color: language.color }}
    >
      {language.name}
    </span>
    
  ))

  const GameLost = wrongAttemptsCount >= languagesElements.length
  
  const letterElements = word.split("").map((letter, index) => (
    <span 
      key={index} 
      className={clsx({
        'missed-letter': GameLost && !attempts.includes(letter)
      })}
    >
      {GameLost || attempts.includes(letter) ? letter : " "}
    </span>
  ));

  const keyboardElements = alphabet.split("").map((letter, index) => (
    <button 
      key={index} 
      onClick={() => guess(letter)}
      disabled={GameWon || GameLost}
      aria-disabled={attempts.includes(letter)}
      aria-label = {`Guess the letter ${letter}`}
      className={clsx({
        "keyboard-button": !attempts.includes(letter),
        "correct": word.includes(letter) && attempts.includes(letter), 
        "incorrect": !word.includes(letter) && attempts.includes(letter),
      })} >
        {letter}
    </button>
  ))
  
  const statusClass = clsx({
    'status': true,
    'win': GameWon,
    'lost': GameLost,
    'deadLanguage': wrongAttemptsCount > 0 && !word.includes(lastGuessedLetter)
  })

  function renderStatus() {
    if (GameLost) {
      return (
        <>
          <p> You Lost!</p>
          <p>Try again!</p>
        </>
      )
    } else if (GameWon) {
      return (
      <>
        <p> You won!</p>
        <p>Well done! 🥳</p>
      </>
    )} else if (wrongAttemptsCount > 0 && !word.includes(lastGuessedLetter)) {
      return (
        <>
          <p>{getFarewell(languages[wrongAttemptsCount - 1].name)}</p>
        </>
      )
    }
  }

  function restart() {
    setWord(getWord())
    setAttempts([])
  }

  return(
    <main>
      {GameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
      <header>
        <h4>Hangcode</h4>
        <p>Guess the word within 8 attempts to keep the programming word safe! Be careful!</p>
      </header>
      <section aria-live="polite" role="status" className= {statusClass}>
          {renderStatus()}
      </section>
      <section className='languages-container'>
        {languagesElements}
      </section>

      <section className='word'>
        <p>
          {letterElements}
        </p>
      </section>
      {/**This section is for screen readers only */ }
      <section className="sr-only" aria-live='polite' role="status">
        <p>
          {word.includes(lastGuessedLetter) ?
            `The letter ${lastGuessedLetter} is in the word!` :
            `The letter ${lastGuessedLetter} is not in the word!`
          }
          You have {languages.length - wrongAttemptsCount} attempts left.
        </p>
         <p>Current word: {word.split("").map(letter =>
            attempts.includes(letter) ? letter + "." : "blank.").join("")}
          </p>
      </section>

      <section className='keyboard'>
        {keyboardElements}
      </section>
      <div>
        {(GameLost || GameWon) && <button className='restart' onClick={() => restart()}>New Game</button>}
      </div>
  
    </main>
  )
  
  
}

export default App

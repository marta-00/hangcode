import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {languages}  from './languages.js'

function App() {
  const [word, setWord] = useState("react")
  const alphabet = "qwertyuiopasdfghjklñzxcvbnm"
  const languagesElements = languages.map(language => (
    <span className='language' key={language.name} style={{ backgroundColor: language.backgroundColor, color: language.color }}>
      {language.name}
    </span>
  ))

  const letterElements = word.split("").map((letter, index) => (
    <span key={index}>{letter}</span>
  ))

  const keyboardElements = alphabet.split("").map((letter, index) => (
    <button key={index}>{letter}</button>
  ))

  return(
    <main>
      <header>
        <h4>Hangcode</h4>
        <p>Guess the word within 8 attempts to keep the programming word safe! Be careful!</p>
      </header>
      <section className='status'>
        <p> You win!</p>
        <p> Well done! 🥳 </p>
      </section>
      <section className='languages-container'>
        {languagesElements}
      </section>
      <section className='word'>
      <p>
          {letterElements}
        </p>
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      <button className='restart'>New Game</button>
    </main>
  )
  
  
}

export default App

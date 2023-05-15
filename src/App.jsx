import React, {useState, useRef} from 'react';
import './components/style.css'
import axios from 'axios';
import Stats from './components/Stats';
import QuoteGenerator from './components/QuoteGenerator';
import Limit from './components/Limit';
import CheckWord from './components/CheckWord';


export default function App() {
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);

  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(30);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState([]);
  const [factor, setFactor] = useState(2);

  const [disabled, setDisabled] = useState(false)

  const timeNameRef = useRef(null); 
  const cwNameRef = useRef(null);
  const cwRef = useRef(null);
  const timeRef = useRef(null);
  const restartBtnRef = useRef(null)

  const thirtyRef = useRef(null);
  const sixtyRef = useRef(null);
  const begRef = useRef(null);
  const proRef = useRef(null);

  

  async function fetchData() {
    try {
      const response = await axios.get('https://random-word-api.vercel.app/api?words=30');
      setWords([...response.data]);
    } catch (error) {
      console.log(error);
    }
  }
  

  function handleInput(value) {
    if(!startTimer){
      setStartTimer(true)
    }
    
    if(value.endsWith(' ')) {

      setCurrentIndex(i => i + 1)
      setInput('');

      
      setCorrectWords(data => {
        const word = value.trim()
        const newResult = [...data]
        newResult[currentIndex] = word === words[currentIndex]
        return newResult
      })
    } else {
      setInput(value)
    }
  }

  function restart() {
    setCurrentIndex(0);
    setCorrectWords([]);
    setTimer(30);
    
    timeRef.current.innerText = timer;
    timeNameRef.current.innerText = 'Time';
    cwRef.current.innerText = correctWords;
    cwNameRef.current.innerText = 'CW';

    setInput('');
    setDisabled(false);
  
    fetchData();
    limitVisible();
  }

  function limitVisible() {
    if (thirtyRef.current) {
      thirtyRef.current.style.visibility = 'visible';
    }
    if (sixtyRef.current) {
      sixtyRef.current.style.visibility = 'visible';
    }
    if (begRef.current) {
      begRef.current.style.visibility = 'visible';
    }
    if (proRef.current) {
      proRef.current.style.visibility = 'visible';
    }
  }
  
 

  return (
    <div className='container-fluid box'>
      <h1 id='heading' className='yellow'>Typing Speed Test</h1>
      {words.length !== 0 && (<div className='top'>
        <Limit
          setTimer = {setTimer}
          displayTest = {fetchData}
          factor = {factor}
          setFactor = {setFactor}
          thirtyRef = {thirtyRef}
          sixtyRef = {sixtyRef}
          begRef = {begRef}
          proRef = {proRef}
        />

        <Stats
          startTimer = {startTimer}
          correctWords = {correctWords.filter(Boolean).length}
          timer = {timer}
          setTimer = {setTimer}
          restartBtnRef = {restartBtnRef}
          thirtyRef = {thirtyRef}
          sixtyRef = {sixtyRef}
          begRef = {begRef}
          proRef = {proRef}
          setStartTimer = {setStartTimer}
          setDisabled = {setDisabled}
          wordsSubmitted = {currentIndex}
          factor = {factor}
          timeNameRef = {timeNameRef}
          timeRef = {timeRef}
          cwNameRef = {cwNameRef}
          cwRef = {cwRef}
        /> 
      </div>)}
      
      <div id='text-display' className='text-display'>

      {words.length === 0 && (
      <QuoteGenerator
        displayTest = {fetchData}
      />)}

      {words.map((word, i) => {
        return <CheckWord
          key={i} 
          id={word}
          text={word}
          current={i === currentIndex}
          correct={correctWords[i]}
        />
      })}
      </div>

      {words.length !== 0 && (<div>
        <div className='input-area center'>
          <textarea 
            rows={1}
            className='text-input'
            id='textInput'
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            type="text"
            disabled={disabled}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>

        <div  className="restart-button center">
          <a ref={restartBtnRef} className = "current" onClick={restart}>
            <i className="fas fa-redo"></i>
          </a>
        </div>
      </div>)}
      

      <footer className="center">
        &copy;2023 <a className="grey" href="https://leslieriola.github.io/" target="blank">Leslie Riola</a> & <a className="grey" href="https://github.com/Aczeal14" target="blank">Joshua Modar</a>
      </footer>
    </div>
  );
};
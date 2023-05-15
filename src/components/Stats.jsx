import React, {useEffect} from 'react';

export default function Stats(props) {
  const {startTimer, correctWords, timer, setTimer, restartBtnRef, thirtyRef, sixtyRef, begRef, proRef, setStartTimer, setDisabled, wordsSubmitted, factor, timeNameRef, timeRef, cwNameRef, cwRef,} = props
  

  useEffect(() => {
    let seconds
    if(startTimer) {
      seconds = setInterval(() => {
        setTimer(oldTime => oldTime - 1)
        limitInvisible()
      }, 1000);
    }
    return () => clearInterval(seconds);
  }, [startTimer]);

  useEffect(() => {
    if(timer === 0){
    setStartTimer(false)
    setDisabled(true);
    restartBtnRef.current.focus();

    displayScore()
  }
  }, [timer, correctWords, wordsSubmitted, factor])
  

  function displayScore(){
    let percentageAcc = 0;
    if(wordsSubmitted!==0){
      percentageAcc = Math.floor((correctWords/wordsSubmitted)*100);
    }

    if (timeRef) {
      timeRef.current.innerText = `${percentageAcc}%`;
    }
    if (timeNameRef) {
      timeNameRef.current.innerText = 'PA';
    }

    if (cwRef) {
      cwRef.current.innerText = factor * correctWords;
    }
    if (cwNameRef) {
      cwNameRef.current.innerText = 'WPM';
    }
  }

  function limitInvisible() {
    if (thirtyRef.current) {
      thirtyRef.current.style.visibility = 'hidden';
    }
    if (sixtyRef.current) {
      sixtyRef.current.style.visibility = 'hidden';
    }
    if (begRef.current) {
      begRef.current.style.visibility = 'hidden';
    }
    if (proRef.current) {
      proRef.current.style.visibility = 'hidden';
    }
  }
  

  return (
    <div className="stats center">
      <div className="stat-block if">
        <div ref={timeNameRef} className = "stat-name yellow if">Time:</div>
        <div ref={timeRef} className="details if">{timer}</div>
      </div>
      <div className="stat-block if">
        <div ref={cwNameRef} className = "stat-name yellow if">CW:</div>
        <div ref={cwRef} className="details if">{correctWords}</div>
      </div>
    </div>
  )
}



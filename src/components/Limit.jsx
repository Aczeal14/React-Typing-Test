import React, {useEffect, useState, useRef} from 'react'

export default function Limit(props) {
  const {setTimer, displayTest, factor, setFactor, thirtyRef, sixtyRef, begRef, proRef} = props

  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    const itema = difficulty === 1 ? begRef.current : proRef.current;
    const itemr = difficulty === 1 ? proRef.current : begRef.current;

    itema?.classList.add('yellow');
    itemr?.classList.remove('yellow');

  }, [difficulty]);

  useEffect(() => {
    const itema = factor === 1 ? sixtyRef.current : thirtyRef.current;
    const itemr = factor === 1 ? thirtyRef.current : sixtyRef.current;

    itema?.classList.add('yellow');
    itemr?.classList.remove('yellow');

  }, [factor]);
  
  function setTime30() {
    setTimer(30);
    setFactor(2);
  }

  function setTime60() {
    setTimer(60);
    setFactor(1);
  }

  function setDifficultyBeg() {
    displayTest(1)
    setDifficulty(1);
  }
  
  function setDifficultyPro() {
    displayTest(2)
    setDifficulty(2);
  }

  return (
    <div className="limits-box">
      <div className="limit">
        <button ref={thirtyRef} onClick={setTime30} className='yellow selector' >30s{' '}</button>
        <button ref={sixtyRef} onClick={setTime60} className='selector'>60s</button>
      </div>
      <div className="limit">
        <button ref={begRef} onClick={setDifficultyBeg} className='yellow selector'>beginner{' '}</button>
        <button ref={proRef} onClick={setDifficultyPro} className='selector'>pro</button>
      </div>
    </div>
  )
}

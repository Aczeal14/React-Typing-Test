import React from 'react';

export default function CheckWord(props) {
  const{ text, current , correct } = props

  if(correct === true) {
    return <span className='correct'>{text} </span>
  }

  if(correct === false) {
    return <span className='incorrect'>{text} </span>
  }

  if(current) {
    return <span className='current'>{text} </span>
  }

  return <span>{text} </span>
}

CheckWord = React.memo(CheckWord)
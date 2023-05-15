import Axios from 'axios'
import { useState } from 'react';


export default function QuoteGenerator(props) {
  const {displayTest} = props
  const [quote, setQuote] = useState(() => {
    Axios.get("https://api.quotable.io/random")
    .then(res => {
      setQuote(res.data.content + " -" + res.data.author )
    })
  });

  

  return (
    <div className="btn-container">
    <div>
      {quote}
    </div>
    <button onClick={displayTest} className="button">
      Play
    </button>
    </div>
    
  )
}

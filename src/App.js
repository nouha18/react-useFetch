import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...');
    setQuote(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get('https://api.quotable.io/random', { cancelToken: source.token })
      .then(res => {
        setLoading(false);
        setQuote(res.data.content);
      })
      .catch(err => {
        setLoading(false);
        setError('An error occurred. Awkward..');
      });
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="App">
      <button>Fetch Quote</button>
      {loading && <p>{loading}</p>}
      {quote && <p>"{quote}"</p>}
      {error || (null && <p>{error}</p>)}
    </div>
  );
}

export default App;

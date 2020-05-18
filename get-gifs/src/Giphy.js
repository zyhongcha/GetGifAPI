import React, { useState, useEffect } from 'react';

function useGifs(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=mXmulCy28eLR2OOqfa9y2GQ2EgoCtSYJ&q=${query}&limit=10&offset=0&rating=G&lang=en`);
        const json = await response.json();
        setResults(
          json.data.map(item => item.images.preview.mp4)
        )
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (query != '') {
      fetchData();
    }
  }, [query]);
  return [results, loading];
}

export default function GiphyHook() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGifs(query);

  return (
    <div>
      <h1>Fetch Gifs using Giphy API</h1>
      <form onSubmit={e => {
        e.preventDefault();
        setQuery(search);
      }}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for gifs!" />
        <button type="submit">Search</button>
      </form>
      <br />
      {loading ? <h1>"Wait a bit"</h1> : (
        results.map(result => 
          <video key={result} src={result} autoPlay loop />
        ))}
    </div>
  )
}
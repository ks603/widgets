import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
  const [term, setTerm] = useState('Programming')
  const [results, setResults] = useState([])

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      })

      setResults(data.query.search)
    }

    if (term && !results.length) {
      search()
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search()
        }
      }, 500)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [term])

  const renderedResults = results.map((results) => {
    return (
      <div key={results.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${results.pageid}`}
            rel="noreferrer"
            target="_blank"
          >
            GO
          </a>
        </div>
        <div className="content">
          <div className="header">{results.title}</div>
          <span dangerouslySetInnerHTML={{ __html: results.snippet }}></span>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  )
}

export default Search

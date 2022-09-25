import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/characters').then((response) => {
      console.log(response.data)
      setCharacters(response.data)
    })
  }, [])

  return (
    <div>
      <form>
        <div>
          Character: <input value={characters[60].character} />
        </div>

        {characters[60].decrepitude.effectsOfAging.map((d) => (
          <div>{d.score}</div>
        ))}
        {characters[60].characteristics.map((c) => (
          <div>
            {c.characteristic}
            {c.description}
            {c.score}
          </div>
        ))}
      </form>
    </div>
  )
}

export default App

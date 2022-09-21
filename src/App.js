import logo from './logo.svg'
import './App.css'
import { data } from './testDb'

function App() {
  return (
    <div>
      {data.basicData.map((b) => (
        <div>
          {b.attribute}
          {b.value}
        </div>
      ))}
      {data.characteristics.map((c) => (
        <div>
          {c.attribute}
          {c.description}
          {c.score}
        </div>
      ))}
    </div>
  )
}

export default App

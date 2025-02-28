import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/searchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchBar />
    </>
  )
}

export default App

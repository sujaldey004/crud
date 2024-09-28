import { useState } from 'react'
import './App.css'
import CreateUser from './component/create'
import ReadUser from './component/read'

function App() {
  const [data, setData] = useState("")

  return (
    <>
      {/* <CreateUser className = "flex m-0"></CreateUser> */}
      <ReadUser></ReadUser>
    </>
  )
}

export default App

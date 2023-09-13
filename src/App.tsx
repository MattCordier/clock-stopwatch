import { useState } from 'react'
import { ChangeEvent } from 'react'
import { ToggleSwitch } from './toggle-switch'

function App() {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(false)

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected((event.target as HTMLInputElement).checked);
  }


  return (
    <>
      <ToggleSwitch checked={selected} onChange={handleCheckBox} />
      {selected ? <h3>Stopwatch</h3> : <h3>Clock</h3>}
    </>
  )
}

export default App

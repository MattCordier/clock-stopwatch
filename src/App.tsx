import { useState } from 'react'
import { ChangeEvent } from 'react'
import { ToggleSwitch } from './toggle-switch'
import { TimePiece } from './time-piece'

function App() {
  const [selectedMode, setSelectedMode] = useState(false)
  let mode = selectedMode ? 'stopwatch' : 'clock';

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMode((event.target as HTMLInputElement).checked);
  }

  return (
    <>
      <ToggleSwitch checked={selectedMode} onChange={handleCheckBox} title='Select a Mode' />
      <TimePiece mode={mode} />
    </>
  )
}

export default App

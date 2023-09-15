import { useState, useRef } from "react";

const useStopWatch = () => {
    const [tick, setTick] = useState(0)
    const timeRef = useRef(0)


    const handleStart = () => {
        timeRef.current = setInterval(() => { setTick((tick) => tick + 1) }, 1000)
    }

    const handlePause = () => {
        clearInterval(timeRef.current)
    }

    const handleReset = () => {
        clearInterval(timeRef.current)
        setTick(0)
    }

    return {
        tick, handleStart, handlePause, handleReset
    }
}

export default useStopWatch
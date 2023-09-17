import { useState, useRef } from "react";

const useStopWatch = () => {
    const [tick, setTick] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)

    const timeRef = useRef(0)


    const handleStart = () => {
        timeRef.current = setInterval(() => { setTick((tick) => tick + 1) }, 1000)
        setIsActive(true)
        setIsPaused(false)
    }

    const handlePause = () => {
        clearInterval(timeRef.current)
        setIsActive(false)
    }

    const handleReset = () => {
        clearInterval(timeRef.current)
        setIsActive(false)
        setTick(0)
    }

    return {
        tick, handleStart, handlePause, handleReset, isActive, isPaused
    }
}

export default useStopWatch
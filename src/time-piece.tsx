import useClock from "./hooks/useClock";
import useStopWatch from "./hooks/useStopWatch";
import { TimePieceCanvas } from "./time-piece-canvas";

export function TimePiece(props: any) {

    const { mode } = props

    const { seconds, minutes, hours } = useClock()
    const { tick, handleStart, handlePause, handleReset } = useStopWatch()

    return (
        <TimePieceCanvas mode={mode} ss={seconds} mm={minutes} hh={hours} tick={tick} size={600}>

            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
            <h3>{tick}</h3>


        </TimePieceCanvas>
    )
}
import useClock from "./hooks/useClock";
import useStopWatch from "./hooks/useStopWatch";

export function TimePiece(props: any) {

    const { mode } = props

    const { seconds, minutes, hours } = useClock()
    const { tick, handleStart, handlePause, handleReset } = useStopWatch()

    return (mode == 'clock') ?
        (<h3>Clock {hours} : {minutes} : {seconds} </h3>) :
        (<>
            <h3>Stopwatch</h3>
            <button onClick={handleStart}>Start</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
            <h3>{tick}</h3>
        </>
        )
}
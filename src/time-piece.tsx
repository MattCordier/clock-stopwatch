import useClock from "./hooks/useClock";
import useStopWatch from "./hooks/useStopWatch";
import { TimePieceCanvas } from "./time-piece-canvas";
import styles from "./time-piece.module.css"

export function TimePiece(props: any) {

    const { mode } = props

    const { seconds, minutes, hours } = useClock()
    const { tick, handleStart, handlePause, handleReset, isActive, isPaused } = useStopWatch()

    return (
        <TimePieceCanvas mode={mode} size={600} ss={seconds} mm={minutes} hh={hours} tick={tick} >
            {(!isActive ?
                <button onClick={handleStart} className={styles.startBtn} >Start</button> :
                <button onClick={handlePause} className={styles.pauseBtn}>Pause</button>
            )
            }
            < button onClick={handleReset} className={styles.resetBtn}>Reset</button>
        </TimePieceCanvas >
    )
}
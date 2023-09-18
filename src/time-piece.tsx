
import { TimePieceCanvas } from "./time-piece-canvas";
import useStopWatch from "./hooks/useStopWatch";
import styles from "./time-piece.module.css"

export function TimePiece(props: any) {
    const { tick, handleStart, handlePause, handleReset, isActive } = useStopWatch();
    const { mode } = props;

    return (
        <TimePieceCanvas mode={mode} size={600} tick={tick} >
            {(!isActive ?
                <button onClick={handleStart} className={styles.startBtn} >Start</button> :
                <button onClick={handlePause} className={styles.pauseBtn}>Pause</button>
            )
            }
            < button onClick={handleReset} className={styles.resetBtn}>Reset</button>
        </TimePieceCanvas >
    )
}
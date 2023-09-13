import useClock from "./hooks/useClock";



export function TimePiece(props: any) {

    const { mode } = props

    const { seconds, minutes, hours } = useClock()

    //hold the callback functions that handle stopwatch modes

    return (mode == 'clock') ? (<h3>Clock {hours} : {minutes} : {seconds} </h3>) : (<h3>Stopwatch</h3>)


}
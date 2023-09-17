import { useState, useEffect } from "react";

const useClock = () => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)



    const setClock = (now: Date) => {
        // time calculation from https://www.kirupa.com/html5/totally_awesome_analog_clock.htm Section "Getting the Current Time, Part II"
        let milliseconds = now.getMilliseconds();
        let seconds = now.getSeconds();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        seconds += milliseconds / 1000;
        minutes += seconds / 60;
        hours += minutes / 60;

        setSeconds(seconds)
        setMinutes(minutes)
        setHours(hours)
    }


    useEffect(() => {
        let id = setInterval(() => {
            setClock(new Date());
        }, 40);

        return () => clearInterval(id);
    }, []);

    return {
        seconds, minutes, hours
    }
}

export default useClock
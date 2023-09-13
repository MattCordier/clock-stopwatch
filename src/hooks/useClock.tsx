import { useState, useEffect } from "react";

const useClock = () => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)

    function setClock(now: Date) {
        setSeconds(now.getSeconds())
        setMinutes(now.getMinutes())
        setHours(now.getHours())
    }

    useEffect(() => {
        let id = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return {
        seconds, minutes, hours
    }
}

export default useClock
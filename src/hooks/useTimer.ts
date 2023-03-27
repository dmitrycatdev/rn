import {useEffect, useState} from 'react';

const useTimer = (maxSeconds: number, callback?: () => void) => {
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        let timerId:  NodeJS.Timeout | null = null

        if (seconds >= maxSeconds) {
            callback?.()
            reset()
        } else if (isActive) {
            timerId = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            // @ts-ignore
            clearInterval(timerId)
        }
        // @ts-ignore
        return () => clearInterval(timerId);
    }, [isActive, seconds])

    function toggle(isActive: boolean) {
        setIsActive(isActive)
    }

    function reset() {
        setSeconds(0)
        setIsActive(true)
    }

    return {seconds, toggle, reset}
}

export default useTimer

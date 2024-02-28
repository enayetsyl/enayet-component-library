import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const StopWatch = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })

  let timeHandler = useRef()

  const timeInc = () => {
    timeHandler.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.seconds === 59) {
          return { minutes: prevTime.minutes + 1, seconds: 0 };
        } else {
          return { minutes: prevTime.minutes, seconds: prevTime.seconds + 1 };
        }
      });
    }, 1000);
  }
  
  useEffect(() => {
    timeInc()
    return () => clearInterval(timeHandler.current)
  },[])

  return (
    <div >
   
      <h1>{time.minutes > 0 && `${time.minutes} min`} {time.seconds} sec</h1>
    </div>
  );
}

export default StopWatch
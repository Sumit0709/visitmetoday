import React, { useEffect, useState } from 'react'

const Timer = ({removeTimer}) => {
    const startTime = 59;
    const [remainingTime, setremainingTime] = useState(startTime)


    const updateTime = () => {

        setTimeout(()=>{
                let n = remainingTime-1;
                setremainingTime(n);
        },1000)

        // const interval = setInterval(() => {
        //     let n = remainingTime-1;
        //         setremainingTime(n);
        //     if(remainingTime<=0){
        //         clearInterval(interval)
        //     }
        // }, 1000);
    }

    useEffect(() => {
        if(remainingTime <= 0){
            removeTimer();
        }
        else{
            updateTime();
        }
    },[remainingTime])

  return (
    <div>
        You can resend otp after <span style={{fontWeight: 500}}>{remainingTime}</span> seconds.
    </div>
  )
}

export default Timer
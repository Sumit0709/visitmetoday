import React, { useState, useEffect } from 'react';
import { getCounter } from '../../apiCalls/counter';

const Counter = () => {
  
    const [counters, setCounters] = useState({
        signup : 324,
        signin: 0,
        profileCreated: 313, 
        profileVisited: 973, 
        extendedProfiles: 0, 
        totalActiveTime: 0, 
        averageActiveTime: 0
    })

    const onGetCounter = () => {
        getCounter()
            .then(data => {
                if(data.success){
                    setCounters(data.counter);
                }
            })
    }

    useEffect(() => {
        onGetCounter();
    },[])

  return (
    <div>
      <div className='row text-center mt-4' style={{width:"100%", paddingBottom:'40px',justifyContent:'space-around'}}>
        {/* <div className=' mt-5' style={{margin: 'auto', width:'400px', textAlign: 'left'}}> */}
            <div className='col-sm-4'><div style={{fontWeight:'600', fontSize:'25px'}}>{counters.signup}</div> Registrations done</div>
            <div className='col-sm-4'><div style={{fontWeight:'600', fontSize:'25px'}}>{counters.profileCreated}</div> Profiles Created</div>
            <div className='col-sm-4'><div style={{fontWeight:'600', fontSize:'25px'}}>{counters.profileVisited}</div> profiles Visited</div>
        {/* </div> */}
    </div>
    </div>
  );
};

export default Counter;

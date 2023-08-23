import React from 'react'

import loadingVideo from "../media/loading.mp4"
import "./Loading.css"

const Loading = ({height, width}) => {
  return (
    <div className="loading_content">
        {/* Loading... */}
        <div className="load-6">
            <div className="letter-holder">
            <div className="l-1 letter">L</div>
            <div className="l-2 letter">o</div>
            <div className="l-3 letter">a</div>
            <div className="l-4 letter">d</div>
            <div className="l-5 letter">i</div>
            <div className="l-6 letter">n</div>
            <div className="l-7 letter">g</div>
            <div className="l-8 letter">.</div>
            <div className="l-9 letter">.</div>
            <div className="l-10 letter">.</div>
            </div>
        </div>
        {/* spinning */}
        <div className="load-9">
            <div className="spinner">
            <div className="bubble-1"></div>
            <div className="bubble-2"></div>
            </div>
        </div>
    </div>
    // <div>
    //     <h2>Loading...</h2>
    //     <video src={loadingVideo} type="video/mp4" width={width} height={height} loop autoplay="" muted style={{borderRadius:"50% 50%"}}></video>
    // </div>
  )
}

export default Loading
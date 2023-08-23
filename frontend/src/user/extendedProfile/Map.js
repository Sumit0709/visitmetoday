import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '500px'
};

const center = {
  lat: 22.522100822651456,
//   -3.745,
  lng: 88.3466005630456
//   -38.523
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


//   return (
//     <div>
//         {/* <div> */}
//         {/* <a href='https://goo.gl/maps/ma7nEzK1eKUopb598'></a> */}
//         <iframe src="
//         https://www.google.com/maps/place/Jatin+Das+Metro+Station/@22.5221936,88.3443445,17z/data=!4m6!3m5!1s0x3a0277c33094a023:0x6d95bb057a2f028e!8m2!3d22.5221856!4d88.346521!16s%2Fg%2F11j4msthc9
//         " width="800" height="600" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
//     </div>
//     )

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
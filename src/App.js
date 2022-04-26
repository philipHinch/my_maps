import './App.css';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//hooks
import { useEffect, useState } from 'react';
//spinner
import Spinner from './assets/spinner.gif';

function App() {

  const [geoLocation, setGeoLocation] = useState(null)

  useEffect(() => {
    getLocation()
  }, [])

  //get location function takes 3 parameters, 1 for success, 1 for unsuccess, 1 for optional parameters
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })
  }

  const successLocation = (position) => {
    setGeoLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    })
  }

  const errorLocation = (position) => {
    setGeoLocation({
      lat: 51.5,
      lon: -0.1
    })
  }

  console.log(geoLocation);

  // if (!geoLocation) {
  //   return <img src={Spinner} alt="" />
  // }

  return (
    <div className="App">
      {geoLocation && <Map
        id='map'
        initialViewState={{
          longitude: geoLocation.lon,
          latitude: geoLocation.lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}>
        <NavigationControl />
      </Map >}

      {!geoLocation && <Map
        id='map'
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}>
        <NavigationControl />
      </Map >}
    </div>
  );
}

export default App;

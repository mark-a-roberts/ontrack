import React from 'react';
import GoogleMapReact from 'google-map-react';
import Sidebar from './sidebar';
import './App.css';

const App: React.FC = () => {
    let defaultProps = {
        center: {
            lat: 51.5,
            lng: -0.12
        },
        zoom: 11
    };
  return (
    <div className="App">
      <Sidebar />
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCTQDk2x-ZzaBAGcLKsY5TQPM08G_o6x2I' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            </GoogleMapReact>
        </div>
    </div>
  );
};

export default App;

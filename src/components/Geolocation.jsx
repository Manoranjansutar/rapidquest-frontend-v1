import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFub3JhbmphbnN1dGFyIiwiYSI6ImNtMDN6Z3BrMzAzNGIyanNoZjZoY3lmOGsifQ.cyaU8dDYTqhP8XGVKbaRlQ'; // Replace with your actual Mapbox access token

const GeolocationComponents = () => {
    const url = "https://reapidquest-backend.onrender.com/";
    const [geolocation, setGeolocation] = useState([]);
    const [error, setError] = useState(null);
    const [viewState, setViewState] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 1
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);

    useEffect(() => {
        const fetchGeolocation = async () => {
            try {
                const response = await axios.get('https://reapidquest-backend.onrender.com/api/geolocation');
                const locationsWithCoords = await Promise.all(response.data.customerLocations.map(async (location) => {
                    try {
                        const geocodeResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location._id.city},${location._id.province},${location._id.country}.json?access_token=${MAPBOX_TOKEN}`);
                        const [longitude, latitude] = geocodeResponse.data.features[0].center;
                        return { ...location, latitude, longitude };
                    } catch (error) {
                        console.error(`Error geocoding ${location._id.city},${location._id.province},${location._id.country}:`, error);
                        return { ...location, latitude: null, longitude: null };
                    }
                }));
                setGeolocation(locationsWithCoords);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            }
        };
        fetchGeolocation();
    }, []);

    return (
        <div className='w-[400px] md:w-[600px] bg-white rounded-lg  shadow-md p-4 '>
            <h2 className="mb-4 text-xl font-bold md:text-2xl">Geographical Distribution of Customers</h2>
            <MapGL
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '400px' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {geolocation.map((location, index) => (
                    location.latitude && location.longitude && (
                        <Marker
                            key={index}
                            latitude={location.latitude}
                            longitude={location.longitude}
                            offsetTop={-20}
                        >
                            <div
                                onMouseEnter={() => setHoveredLocation(location)}
                                onMouseLeave={() => setHoveredLocation(null)}
                                onClick={() => setSelectedLocation(location)}
                                style={{
                                    cursor: 'pointer',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: '12px',
                                    position: 'relative',
                                    zIndex:'10'
                                }}
                            >
                                {location.customerCount}
                                {hoveredLocation === location && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        padding: '5px',
                                        borderRadius: '3px',
                                        whiteSpace: 'nowrap',
                                        zIndex: 20,
                                        fontSize: '12px'
                                    }}>
                                        {location._id.city}
                                    </div>
                                )}
                            </div>
                        </Marker>
                    )
                ))}
                {selectedLocation && (
                    <Popup
                        latitude={selectedLocation.latitude}
                        longitude={selectedLocation.longitude}
                        onClose={() => setSelectedLocation(null)}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <div>
                            {selectedLocation._id.city}, {selectedLocation._id.province}, {selectedLocation._id.country} <br />
                            Customers: {selectedLocation.customerCount}
                        </div>
                    </Popup>
                )}
            </MapGL>
        </div>
    );
};

export default GeolocationComponents;
















  

  








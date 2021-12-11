import React, { useState, useEffect } from "react";
// import for material ui
import { CssBaseline, Grid } from "@material-ui/core";

// import api
import { getPlacesData } from "./api";

// import components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

// when using material ui to get full width on components on mobile devices set xs=12

function App() {
  // state hooks
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [autocomplete, setAutocomplete] = useState(null);

  // use effects
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
      setCoordinates({ lat: latitude, lng: longitude})
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filteredPlaces)
  }, [rating]);

  useEffect(() => {
    // console.log(coordinates, bounds)
    setIsLoading(true);

    getPlacesData(type, bounds && bounds.ne, bounds && bounds.sw).then((data) => {
      // console.log(data);
      setPlaces(data);
      setFilteredPlaces([])
      setRating('');
      setIsLoading(false);
    });
  }, [type, bounds]);

  

  const onLoad = (autoComp) => {
    setAutocomplete(autoComp)
  }

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  }

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} onLoad={onLoad} onPlaceChanged={onPlaceChanged}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>  {/* for medium devices set md=4 */}
          <List 
          places={filteredPlaces.length ? filteredPlaces : places}  // if we have the filtered places render it, else reander places
          childClicked={childClicked} 
          isLoading={isLoading} 
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>  {/* Map is a larger component so set medium to 8 */}
          <Map 
          setCoordinates={setCoordinates} 
          setBounds={setBounds} 
          coordinates={coordinates} 
          places={filteredPlaces.length ? filteredPlaces : places} 
          setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

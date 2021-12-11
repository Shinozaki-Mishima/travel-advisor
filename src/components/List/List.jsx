import React, { useState, useEffect, createRef } from 'react';
// material-ui imports
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

// style import
import useStyles from "./list-styles";

// component imports 
import PlaceDetails from '../PlaceDetails/PlaceDetails';

function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {
    // instantiate hooks
    const classes = useStyles();
    
    const [elementRef, setElementRef] = useState([]);
    // console.log({ childClicked })

    // use eff
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elementRef[i] || createRef());
        setElementRef(refs);
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotels, Attractions</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(event) => setType(event.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(event) => setRating(event.target.value)}>
                            <MenuItem value={0}>All Ratings</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>4.5 and above</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>  {/* '?.' is a null check (optional chaining) so if places!=null map over it*/}
                        {places?.map((place, i) => (
                            <Grid ref={elementRef[i]} item key={i} xs={12}>
                                <PlaceDetails 
                                place={place} 
                                selected={Number(childClicked) === i} 
                                refProp={elementRef[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
            </>
            )}
        </div>
    )
}

export default List;

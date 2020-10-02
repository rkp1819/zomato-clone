import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "./Card";
import FilterDialog from "./FilterDialog";
// otherstuff
import axios from "axios";
// mui
import { InputBase, Toolbar, IconButton, Grid } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
// contextAPI
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const config = {
  headers: { "user-key": "" },
};

function Home() {
  const [citySelected, setCitySelected] = useState(false);
  const [cityInput, setCityInput] = useState("");

  const [
    { city, cities, restaurants, filteredRestaurants, isRestaurantsFiltered },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/cities?q=${city.name}`,
        config
      )
      .then((res) => {
        dispatch({
          type: actionTypes.SET_CITIES,
          cities: res.data.location_suggestions,
        });
      })
      .catch((err) => {
        alert(err.msg);
      });
  }, [city]);

  function handleChangeCity(event) {
    let val = event.target.value;
    console.log("in handleChangeCity " + event.key);
    setCityInput(val);
  }

  function changeCity(event) {
    console.log(event.key);
    let val = event.target.value;
    if (event.key == "Enter" && val) {
      dispatch({ type: "SET_CITY", city: { ...city, name: val } });
      setCitySelected(false);
    }
  }

  function selectCity(item) {
    console.log("selected City " + item.name, item);
    dispatch({ type: "SET_CITY", city: item });
    setCitySelected(true);
    setCityInput("");
    dispatch({
      type: "IS_RESTAURANTS_FILTERED",
      isRestaurantsFiltered: false,
    });

    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${item.id}&entity_type=city`,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_RESTAURANTS,
          restaurants: res.data.restaurants,
        });
      });
  }

  return (
    <div className="home_root_container">
      <div className="home_root">
        <h1 className="home_root_header">Zomato Clone</h1>
        <p className="home_root_helper">
          Discover the best food & drinks in{" "}
          {citySelected && city.name ? city.name : "Your city"}
        </p>
        <div className="home_root_search_container">
          <div className="home_root_search">
            <div className="home_root_search_cityselector">
              <InputBase
                autoFocus={true}
                onKeyPress={changeCity}
                placeholder="Location"
                required={true}
                value={cityInput ? cityInput : ""}
                onChange={handleChangeCity}
              />
            </div>
            <div className="home_root_search_bar">
              <InputBase
                placeholder="Search for restaurant, cuisine or a dish"
                required={true}
              />
            </div>
            <br />
          </div>
          {!citySelected &&
            cities.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => selectCity(item)}
                  className="home_root_search_cityview"
                  tabindex={0}
                  onKeyDown={() => selectCity(item)}
                >
                  {item.name}
                </div>
              );
            })}
        </div>
      </div>
      {citySelected && (
        <Toolbar>
          <IconButton
            onClick={() => {
              dispatch({
                type: actionTypes.SET_OPENFILTER,
                openFilter: true,
              });
            }}
          >
            <FilterListIcon />
          </IconButton>
          <FilterDialog />
        </Toolbar>
      )}
      <Grid container className={"home_root_restaurants"} spacing={2}>
        {isRestaurantsFiltered
          ? filteredRestaurants.map((item, index) => {
              return (
                <Grid key={index} item xs={12} md={4} sm={6}>
                  <Card key={index} {...item} />
                </Grid>
              );
            })
          : restaurants.map((item, index) => {
              return (
                <Grid key={index} item xs={12} md={4} sm={6}>
                  <Card key={index} {...item} />
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}

export default Home;

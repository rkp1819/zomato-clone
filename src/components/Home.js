import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "./Card";
import axios from "axios";

import { InputBase } from "@material-ui/core";

const config = {
  headers: { "user-key": "8cd455d78407927ed585bf555240c308" },
};

function Home() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [citySelected, setCitySelected] = useState(false);
  const [cityInput, setCityInput] = useState("");

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/cities?q=${city.name}`,
        config
      )
      .then((res) => {
        setCities(res.data.location_suggestions);
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
      setCity({ ...city, name: val });
      setCitySelected(false);
    }
  }

  function selectCity(item) {
    console.log("selected City " + item.name, item);
    setCity(item);
    setCitySelected(true);
    setCityInput("");
    axios
      .get(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${item.id}&entity_type=city`,
        config
      )
      .then((res) => {
        console.log(res);
        setRestaurants(res.data.restaurants);
      });
  }

  return (
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
              >
                {item.name}
              </div>
            );
          })}
      </div>
      <div className="home_root_restaurants">
        {restaurants.map((item, index) => {
          return <Card key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Home;

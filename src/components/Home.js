import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

import { InputBase } from "@material-ui/core";

const config = {
  headers: { "user-key": "" },
};

function Home() {
  const [city, setCity] = useState("Hyderabad");

  useEffect(() => {
    axios
      .get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, config)
      .then((res) => console.log(res.data.location_suggestions))
      .catch((err) => {
        alert(err.msg);
      });
  }, [city]);

  function changeCity(event) {
    console.log(event.key);
    let val = event.target.value;
    if (event.key == "Enter") {
      setCity(val);
    }
  }

  return (
    <div className="home_root">
      <h1 className="home_root_header">Zomato Clone</h1>
      <p className="home_root_helper">
        Discover the best food & drinks in {city}
      </p>

      <div className="home_root_search">
        <div className="home_root_search_cityselector">
          <InputBase
            autoFocus={true}
            onKeyPress={changeCity}
            placeholder="Location"
            required={true}
          />
        </div>
        <div className="home_root_search_bar">
          <InputBase
            placeholder="Search for restaurant, cuisine or a dish"
            required={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

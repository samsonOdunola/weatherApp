import { useState, useEffect } from "react";
import Output from "./Output";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Weatherapp = () => {
  const [Data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const success = (res) => {
    let pos = res.coords;
    setLat(pos.latitude);
    setLong(pos.longitude);
    console.log(pos.longitude);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b2545afba199684407d88773f4e5782c&units=metric`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.code);
      });
    console.log("working");
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, errors, options);
    console.log("useEffect");
  }, [lat]);

  const searchLocation = (event) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b2545afba199684407d88773f4e5782c&units=metric`;
    if (event.key === "Enter" && location !== "") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res);
        })
        .catch((err) => {
          setLoading(err);
        });

      setLocation("");
    }
  };

  return (
    <header>
      {console.log("renderpage")}
      <nav>
        <input
          type="text"
          value={location}
          onKeyDown={searchLocation}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="Enter Location"
        />{" "}
        <FaSearch onClick={(event) => searchLocation()} className="search" />
      </nav>
      {Data ? <Output props={Data} /> : <div className="loading">{error}</div>}
    </header>
  );
};

export default Weatherapp;

import React, { useState } from "react";
import Results from "./Results";
import Search from "./Search";

const WeatherContainer = () => {
    const [cities, setCities] = useState([]);
    const searchHandling = (data) => {
        var city = cities.find(c => c.id == data.id);
        if (city) {//Refresh data with the new response
            city = data;
        }
        else {
            cities.push(data);
        }
        setCities(cities => [...cities]);
    }

    return (<div className="container">
        <div className="header">
            <h6>Odeon Weather</h6>
        </div>
        <div className="body">
            <Search searchHandling={searchHandling} />
            <Results cities={cities} />
        </div>
    </div>)
}

export default WeatherContainer
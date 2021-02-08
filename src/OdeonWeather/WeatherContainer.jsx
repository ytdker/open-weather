import React, { Component } from "react";
import { GetCity } from "../Helpers";
import Results from "./Results";
import Search from "./Search";

export default class WeatherContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: []
        }

        this.searchHandling = this.searchHandling.bind(this);
    }

    searchHandling(data) {

        var city = this.state.cities.find(c => c.id == data.id);
        if (city) {//Refresh data with the new response
            city = data;
        }
        else {
            this.state.cities.push(data);
        }

        this.setState((state) => ({ cities: state.cities }));
    }

    render() {
        return <div className="container">

            <div className="header">
                <h6>Odeon Weather</h6>
            </div>

            <div className="body">
                <Search searchHandling={this.searchHandling} />
                <Results cities={this.state.cities} />
            </div>
        </div>
    }

}
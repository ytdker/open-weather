import React, { Component } from "react";
import moment, { utc } from 'moment'
import { GetCity } from "../Helpers";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.search = null;

        this.onKeyEnter = this.onKeyEnter.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    onKeyEnter(e) {
        if (e.which == 13) {//enter
            e.preventDefault();
            this.onClickSearch();
        }

    }

    onChangeCity(e) {
        let val = e.target.value.trim();
        this.search = val;

        if (this.state.errorMessage)
            this.setState({ errorMessage: null });

    }

    onClickSearch() {
        if (!this.search) {
            this.setState({ errorMessage: "Please enter a city name" })
        }
        else {
            GetCity(this.search).then(
                (data) => {
                    let result = {};
                    result.id = data.city.id;
                    result.city = data.city.name;

                    let startDate = moment().utc().format('yyyy-MM-DD HH:mm:ss');
                    let endDate = moment().utc().add(1, 'days').format('yyyy-MM-DD HH:mm:ss');
                    let filtered = data.list.filter(i => moment(i.dt_txt).isBefore(endDate) && moment(i.dt_txt).isAfter(startDate)).map(i => { i.dt_txt = moment.utc(i.dt_txt).local().format('yyyy-MM-DD | hh:mm A'); return i; });

                    filtered.forEach(item => {
                        var time = item.dt_txt.split('|')[1].trim();
                        result[time] = item.main.temp;
                    });

                    this.props.searchHandling(result);
                    this.clearInput();
                },
                (e) => {
                    this.setState({ errorMessage: e.responseJSON.message });
                }
            );
        }
    }

    clearInput() {
        this.search = null;
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

    render() {
        return <div className="row">
            <div className="col-8">

                <div className="form-group">
                    <input className="form-control form-control-sm" type="text" placeholder="City"
                        onChange={this.onChangeCity} onKeyPress={this.onKeyEnter}
                    />
                </div>

            </div>

            <div className="col-4">
                <div className="form-group">
                    <button className="btn search-btn btn-primary" type="button"
                        onClick={this.onClickSearch}>Search</button>
                </div>
            </div>

            {
                this.state.errorMessage ?
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                    : null
            }

        </div >
    }
}


const ErrorMessage = (props) => <div className="col-12">
    <div className="form-group text-left">
        <p className="text-danger">{props.errorMessage}</p>
    </div>
</div>
import React, { useState } from "react";
import moment from 'moment'
import { GetCity } from "../Helpers";

const Search = (props) => {
    let [state, setState] = useState({ errorMessage: null })
    let search = null;

    const onKeyEnter = (e) => {
        if (e.which == 13) {//enter
            e.preventDefault();
            onClickSearch();
        }
    }

    const onChangeCity = (e) => {
        search = e.target.value.trim();
        if (state.errorMessage)
            setState(state => ({ ...state, errorMessage: null }));
    }

    const onClickSearch = () => {
        if (!search) {
            setState((state) => ({ ...state, errorMessage: "Please enter a city name" }));
        }
        else {
            const fetchData = async () => {
                try {
                    let response = await GetCity(search);
                    let data = response.data;
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

                    props.searchHandling(result);
                    clearInput();
                }
                catch (e) {
                    let errorText = e && e.response && e.response.data ? e.response.data.message : "An unexpected error has occurred"
                    setState((state) => ({ ...state, errorMessage: errorText }));
                }
            }

            fetchData();
        }
    }

    const clearInput = () => {
        search = null;
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }


    return <div className="row">
        <div className="col-8">
            <div className="form-group">
                <input className="form-control form-control-sm" type="text" placeholder="City"
                    onChange={(e) => onChangeCity(e)} onKeyPress={onKeyEnter}
                />
            </div>
        </div>

        <div className="col-4">
            <div className="form-group">
                <button className="btn search-btn btn-primary" type="button"
                    onClick={onClickSearch}>Search</button>
            </div>
        </div>
        {state.errorMessage ? <ErrorMessage errorMessage={state.errorMessage} /> : null}
    </div>
}

const ErrorMessage = (props) => <div className="col-12">
    <div className="form-group text-left">
        <p className="text-danger">{props.errorMessage}</p>
    </div>
</div>

export default Search
import axios from "axios";

const APIKEY = "daa01e8a1a844cdd988b11b8ddb0bf37";
const URL = "https://api.openweathermap.org/data/2.5/forecast";
export function GetCity(city) { return axios.get(`${URL}?q=${city}&appid=${APIKEY}&units=metric`); }
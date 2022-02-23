import axios from "axios";

 export function getCountries() {
    return async function(dispatch) {
        var json = await axios.get ("http://localhost:3001/countries")
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }
} 



export function getNameCountries (payload) {
    return async function (dispatch) {
        try{
            var json = await axios.get("http://localhost:3001/countries?name=" + payload)
            return dispatch({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            })
        } catch (error){
            return console.log(error)
        }
    }
}

export function postActivities(payload){
    return async function (dispatch) {
        const json = await axios.post("http://localhost:3001/activity", payload);
        console.log(json)
        return json;
    }
}

export function filterCountriesByContinent(payload){
    return {
        type: "FILTER_BY_CONTINENT",
        payload
    }
}

export function filterByActivity(payload) {
    return {
        type: "FILTER_BY_ACTIVITY",
        payload
    }
}

export function sortByName(payload){
    return {
        type: "SORT_BY_NAME",
        payload
    }
}

export function sortByPopulation(payload){
    return {
        type: "SORT_BY_POPULATION",
        payload
    }
}

export function getCountryDetail(id){
    return async function (dispatch) {
        try{
            const json = await axios.get("http://localhost:3001/countries/" + id)
            return dispatch({
                type: "GET_COUNTRY_DETAIL",
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }   
}
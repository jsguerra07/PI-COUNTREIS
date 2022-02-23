
const initialState = {
    countries: [],
    allCountries: [],
    detail: []
};



function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload

            }
        case "GET_NAME_COUNTRIES":
            if(action.payload === "sorry, can´t find that"){
                alert("sorry, can´t find that country")
                return{
                    ...state
                }
            }else{
                return {
                    ...state,
                    countries: action.payload
                }
            }
        case "GET_COUNTRY_DETAIL":
            return {
                ...state,
                detail: action.payload    
            }        
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter((el) => el.continent === action.payload )
            return {
                ...state,
                countries: continentFiltered
            }
        case "FILTER_BY_ACTIVITY":

        const allCountriesAct = state.allCountries
        let filteredWithAct = allCountriesAct.filter(country => country.activities.length !== 0)
        filteredWithAct = filteredWithAct.filter(country => {
            let target = false
            country.activities.map(el => {
                if(el.name.toLowerCase().includes(action.payload.toLowerCase())) return target = true
                return false
            })
            return target
        })
        console.log(filteredWithAct, "chau") 
         if (filteredWithAct.length > 0) {

             return {
                 ...state,
                 countries: filteredWithAct
             }     
         }else {
             return {
                 ...state
             }
         }
        case "POST_ACTIVITY":
            return {
                ...state
            }    
        case "SORT_BY_NAME":
            let sortedArr = action.payload === "Asc" ?
            state.countries.sort(function (a, b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function (a, b){
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortedArr
            }
        case "SORT_BY_POPULATION":
            let sortedArrp = action.payload === "Asc" ? 
            state.countries.sort(function (a,b){
                if (a.population > b.population) {
                    return 1;
                }
                if (b.population > a.population) {
                    return -1;
                }
                return 0;
            }):
            state.countries.sort(function (a, b){
                if (a.population > b.population) {
                    return -1;
                }
                if (b.population > a.population) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries: sortedArrp
            }
        default: 
            return state
    }
    
}

export default rootReducer;
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCountryDetail} from "../actions";
import {useEffect} from "react";
import styles from "./Detail.module.css";

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(props.match.params.id))
    },[dispatch])

    const country = useSelector((state) => state.detail)
    console.log(props.match.params.id, "hola")
    console.log(country)
    let id = 0;

    return(
        <div className = {styles.detailContainer}>
            {
               country.length > 0 ? 
               <div >
                    <h1>{country[0].name}</h1>
                    <img src = {country[0].flag} alt = "Country flag"/>
                    <div className= {styles.detailFormContainer}>
                        
                        <label>Continent: </label>
                        <h2 className={styles.fieldFormContainer}> {country[0].continent}</h2>
                        <label>Capital: </label>
                        <h2 className={styles.fieldFormContainer}> {country[0].capital}</h2>
                        <label>Subregion: </label>
                        <h2 className={styles.fieldFormContainer}> {country[0].subregion}</h2>
                        <label>Area: </label>
                        <h2 className={styles.fieldFormContainer}> {country[0].area} Km2</h2>
                        <label>Population:  </label>
                        <h2 className={styles.fieldFormContainer}> {country[0].population} Hab</h2>
                        <label>Activities: </label>
                        <div /* className={styles.fieldFormContainer} */> 
                            { 
                                country[0].activities.length === 0 ? country[0].activities[0] : country[0].activities.map((el) => {
                                    id++
                                    return(
                                        <div key={id}>
                                            <div>
                                                <h3>{el.name}</h3>
                                                <h4>difficulty: {el.difficulty}</h4>
                                                <h4>duration: {el.duration}</h4>
                                                <h4>season: {el.season}</h4>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                        
                    </div>
               </div> : <h1>Loading...</h1>
            }
            <hr/>
            <div>
                <Link to = "/home">
                    <button className={styles.singleButtonContainer}>Back</button>
                </Link>
            </div>
        </div>
    )
}
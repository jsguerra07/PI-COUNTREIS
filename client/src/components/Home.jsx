import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, filterByActivity, sortByName, sortByPopulation } from "../actions";
import {Link} from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css"

export default function Home (){
    const dispatch = useDispatch()
    const allCountries =  useSelector((state) => state.countries)// Traigo todos los paises del estado global
    
    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    
    const indexOfLastCountry = currentPage * countriesPerPage 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage 
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [order, setOrder] = useState("")

    const [activity, setActivity] = useState("")


    
    useEffect (()=>{
        dispatch(getCountries())
    },[dispatch])  //dependency dispatch 

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
    }
//--------------------------------------
    function handleInputChange (e){
        e.preventDefault()
        setActivity(e.target.value)
        console.log(activity)
        
    }

    function handleFilterActivity(e){
        e.preventDefault();
        dispatch(filterByActivity(activity))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
        console.log(activity)
        setActivity("")
    }

    function handleSortByPopulation(e){
        e.preventDefault();
        dispatch(sortByPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortByName(e){
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.homeContainer}>
            <Link to = "/activity" className={styles.singleButtonContainer}>Create Activity</Link>
            <h1>Welcome to COUNTRIES</h1>
            
            <div className = {styles.filters}>
            <button className={styles.singleButtonContainer} onClick = {(e) => {handleClick(e)}}>Reload all countries</button>
            <SearchBar/> 
                <select className ={styles.singleFilterContainer} onChange={(e) => handleSortByPopulation(e)}>
                    <option >Sort countries by: Population</option>
                    <option value = "Asc" >Ascending</option>
                    <option value = "Desc" >Descending</option>
                </select>
                <select className ={styles.singleFilterContainer} onChange = {(e) => handleSortByName(e)}>
                    <option>Sort countries by: Alphabet</option>
                    <option value = "Asc">Ascending</option>
                    <option value = "Desc">Descending</option>
                </select>
                <select className ={styles.singleFilterContainer} onChange = {e => handleFilterContinent(e) }>
                    <option>Filter by: Continent</option>
                    <option value = "All">All</option>
                    <option value = "Africa">Africa</option>
                    <option value = "Antarctica">Antarctica</option>
                    <option value = "Asia">Asia</option>
                    <option value = "Europe">Europe</option>
                    <option value = "North America">North America</option>
                    <option value = "Oceania">Oceania</option>
                    <option value = "South America">South America</option>
                </select>
                <input className ={styles.singleFilterContainer} type = "text" name = "Activity" placeholder = "Turistic activity.."  onChange = {(e) => handleInputChange(e)} />
                <button className={styles.singleButtonContainer} type = "submit" onClick = {(e) => handleFilterActivity(e)}>SearchByActivity</button>   
                
                <Paginado  countriesPerPage = {countriesPerPage} allCountries = {allCountries.length} paginado = {paginado}/>
           
           
            {
                currentCountries.length ? currentCountries.map((el) => {
                    
                        return(
                            <Link to = {"/countries/" + el.id}>
                                <Card name = {el.name} flag = {el.flag} continent = {el.continent} key = {el.id}/>
                            </Link>
                        )
                    
                })
                : <div><h1>Loading...</h1></div>
            }
                <Paginado countriesPerPage = {countriesPerPage} allCountries = {allCountries.length} paginado = {paginado}/>
            </div>
        </div>
    )
}
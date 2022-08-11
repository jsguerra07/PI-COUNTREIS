import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getNameCountries } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        setName("")
    }

    return (
        <div className={styles.searchBar}>
            <input className={styles.searchBarInput} type = "text" value = {name} placeholder = "Search Country..." onChange = {(e) => handleInputChange(e)}/>
            <button className={styles.singleButtonContainer} type = "submit" onClick = {(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}
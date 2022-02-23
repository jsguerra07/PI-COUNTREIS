import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import {getCountries, postActivities} from "../actions";
import styles from "./ActivityCreate.module.css"

function validate (input){
    let errors = {};
    let regExpName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regExpNum = /^\d+$/;

    if(!input.name){
        errors.name = "Field `Name` is required";
    } else if (!regExpName.test(input.name)){
        errors.name = "Field `Name` not accept special caracters or numbers only letters";
    } else {
        errors.name = ""
    }

    if(!input.difficulty){
        errors.difficulty = "Field `Difficulty` is required";
    }else {
        errors.difficulty = "";
    }

    if(!input.duration){
        errors.duration = "Field `Duration` is required";
    }else if(!regExpNum.test(input.duration)){
        errors.duration = "Field `Duration` accept only digits"
    }else if (input.duration < 1 || input.duration > 12){
        errors.duration = "Field `Duration` accept only numbers between 1 to 12"
    }else {
        errors.duration = "";
    }

    if(!input.season){
        errors.season = "Field `Season` is required";
    }else {
        errors.season = "";
    }

    if(input.country.length === 0){
        errors.country = "Field `Country` is required";
    }else {
        errors.country = "";
    }

    return errors;
}

export default function ActivityCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countriesSorted = useSelector((state) => state.allCountries)
    const countries = countriesSorted.sort(function (a, b){
        if(a.name > b.name){
            return 1
        }
        if(b.name > a.name) {
            return -1
        }
        return 0
    })
    
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: []
    })

    function handleInputChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleSelectDifficulty (e){
        e.preventDefault();
        setInput({
            ...input,
            difficulty: e.target.value
        })
        setErrors(validate({
            ...input,
            difficulty: e.target.value
        }))
    }

    function handleSelectSeason (e){
        e.preventDefault();
        setInput({
            ...input,
            season: e.target.value
        })
        setErrors(validate({
            ...input,
            season: e.target.value
        }))
    }

    function handleSelectCountry (e){
        const singleCountries = [...input.country, e.target.value]
        const unique = [...new Set(singleCountries)]
        setInput({
            ...input,
            country: unique
        })
        setErrors(validate({
            ...input,
            country: e.target.value
        }))
    }

    function handleSubmit (e){
        e.preventDefault();
        console.log(input)
        dispatch(postActivities(input))
        alert("Activity was created successfully")
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            country: []
        })
        history.push("/home")
    }

    function handleDeleteCountries(el){

        setInput({
            ...input,
            country: input.country.filter(c => c !== el)
        })
    }

    useEffect (() => {
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className = {styles.activityCreateContainer}>
            <Link to = "/home"><button className = {styles.singleButtonContainer}>Back</button></Link>
            <h1>Create your Activity</h1>
            <div className = {styles.activityCreateFormContainer}>
                <form onSubmit = {(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor = "name">Name:</label><br/>
                        <input className={styles.searchBarInput} id = "name" type = "text" value = {input.name} name = "name" onChange = {(e) => handleInputChange(e)} placeholder = "Activity name..." ></input>
                        {errors.name && (<p>{errors.name}</p>)} 
                    </div>
                    <div>
                        <label>Difficulty:</label><br/> 
                        <select className={styles.singleFilterContainer} onChange = {(e) => handleSelectDifficulty(e)}>
                            <option value="">Select one</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        {errors.difficulty && (<p>{errors.difficulty}</p>)} 
                    </div>
                    <div>
                        <label>Duration:</label><br/> 
                        <input className={styles.searchBarInput} type = "text"  name = "duration" onChange = {(e) => handleInputChange(e)} value = {input.duration}  placeholder = "Duration..."></input>
                        {errors.duration && (<p>{errors.duration}</p>)} 
                    </div>
                    <div>
                        <label>Season:</label><br></br>
                        <select className={styles.singleFilterContainer} onChange = {(e) => handleSelectSeason(e)}>
                            <option value="">Select season:</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Spring">Spring</option>
                        </select>
                        {errors.season && (<p>{errors.season}</p>)} 
                    </div>
                    <div>
                        <label>Country:</label><br></br>
                        <select className={styles.singleFilterContainer} onChange = {(e) => handleSelectCountry(e)}>
                            {/* <option>Select Countries</option> */}
                            {countries.map((el) => (
                                
                                <option key = {el.id} value = {el.name} >{el.name}</option>
                            ))}
                            
                        </select>
                        <br/>
                        
                        {
                            input.country.map(el => {
                                return <div><p key={el}> {el} <button onClick={() => handleDeleteCountries(el)} >X</button></p></div>
                                }
                            )  
                        }

                        {errors.country && (<p>{errors.country}</p>)} 

                    </div>
                    <hr/>
                    {
                        !input.name || !input.duration || !input.season || !input.difficulty 
                        ? <h3>Complete form properly to be sent</h3>
                        : <div>
                            <button className = {styles.singleButtonContainer} type = "submit">Create Activity</button>
                         </div> 
                    }

                </form>
            </div>

        </div>
        
    )
}
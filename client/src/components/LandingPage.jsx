import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import {GiEarthAmerica} from "react-icons/gi"


export default function LandingPage() {
    return (
        <div>
            <div className={styles.landingPageHeader}>
                <GiEarthAmerica size={50}/>
                <span>Countries App</span>
            </div>
            
            <div className={styles.landingPageContainer}>
                <h1>COUNTRIES APP</h1>
                <div className={styles.landingPageFormContainer}>
                    <h1>In <span className="hola">Countries APP</span>, Discover and learn about any country in the world and find activities in which you can have fun</h1>
                    <p>
                        This is a single page App where you can find all countries and even create your own tourist activity.
                    </p>
                    
                <Link to="/home">
                    <button className={styles.singleButtonContainer} >Let´s Start</button>
                </Link>
                </div>
            </div>
            <br /><br /><br />
            <br /><br /><br />
        </div>)
}

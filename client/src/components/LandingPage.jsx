import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";


export default function LandingPage() {
    return (
        <div className = {styles.landingPageContainer}>
            <h1>Henry Country APP</h1>
            <div className = {styles.landingPageFormContainer}>
                <div>
                    <img className ={styles.imgLanding} src = "https://www.codinter.com/es/wp-content/uploads/sites/3/2017/11/mapamundi-codinter-1280x640.jpg"   width = "500px"  alt="Mapamundi image"/>
                </div>
                <h2 className = {styles.h2Landing}> Discover and learn about any country in the world and find activities in which you can have fun</h2>
                <p>
                    This is a single page App where you can find all countries and even create your own tourist activity.
                </p>
                <h2 className = {styles.h2Landing}>Click Home to start</h2>
            
            <Link to="/home">
                <button className = {styles.singleButtonContainer} >Home</button>
            </Link>
            </div>
        </div>)
}
import React from "react";
import style from "./Card.module.css";

export default function Card ({name, continent, flag, population, id}) {
    return (
        <div className={style.cardContainer}>
            <img src = {flag} alt = "img not found" height = "200px" width = "300px"/>
            <div className={style.cardContent}>
                <h3>{name}</h3>
                <h5>Continent: {continent}</h5>
                <h5>Population: {population} Habs</h5>
                <button className={style.singleButtonContainer}>learn more</button>
            </div>
        </div>
    );
}

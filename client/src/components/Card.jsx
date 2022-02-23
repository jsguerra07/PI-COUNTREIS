import React from "react";
import style from "./Card.module.css";

export default function Card ({name, continent, flag, population, id}) {
    return (
        <div className={style.cardContainer}>
            <img src = {flag} alt = "img not found" height = "213px" />
            <div>
                <h3>{name}</h3>
                <h5>Continent: {continent}</h5>
            </div>
        </div>
    );
}

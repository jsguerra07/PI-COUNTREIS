import React from "react";
import styles from "./Paginado.module.css";

export default function paginado({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = []


    for(let i = 0; i < Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav >
            <ul className={styles.prueba}>
                    { pageNumbers && 
                      pageNumbers.map(number => (
                          <li key ={number}>
                            <a className= {styles.singleButtonPagination} onClick={() => paginado(number)}>{number}</a>
                          </li>  
                        ))      
                    }
            </ul>
        </nav>
    )

}
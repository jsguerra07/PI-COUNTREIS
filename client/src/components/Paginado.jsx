import React from "react";
import { useState } from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado, currentPage }) {
    const pageNumbers = []

    const [pageNumberLimit, setPageNumberLimit] = useState(7)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    const handlePrevious = () => {
        paginado(currentPage - 1)

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNext = () => {
        paginado(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    /* const handleNext = () => {
      if(currentPage >= 1) {
          paginado(currentPage+1)
      }
    } */

    for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <div >
            <ul className={styles.prueba}>
                <li><button className={styles.singleButtonPagination} onClick={handlePrevious} disabled={currentPage === pageNumbers[0]}>Previous</button></li>
                {pageNumbers &&
                    pageNumbers.map(number => {
                        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                            return (
                                (number === currentPage ?
                                    <li key={number}>
                                        <a href="" className={styles.singleButtonPaginationActive}>{number}</a>
                                    </li>
                                    :
                                    <li key={number}>
                                        <a href = "" className={styles.singleButtonPagination}
                                            onClick={() => paginado(number)}>{number}
                                        </a>
                                    </li>
                                )
                            )
                        } else {
                            return null;
                        }
                    }
                    )
                }
                <li><button className={styles.singleButtonPagination} onClick={handleNext} disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}>Next</button></li>
            </ul>
        </div>
    )

}
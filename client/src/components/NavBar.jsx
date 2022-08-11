import SearchBar from "./SearchBar"
import styles from "./NavBar.module.css"
import { Link } from "react-router-dom";
import { GiEarthAmerica } from "react-icons/gi"

export default function NavBar() {
    return (
        <div className={styles.container}>
            <GiEarthAmerica size={50} />
            <span className={styles.navLogo}>Countries App</span>
            <SearchBar></SearchBar>
            <Link to="/activity" className={styles.singleButtonContainer}>Create Activity</Link>
        </div>
    )
}


import React from "react"
import { Link } from "react-router-dom"

function NavBar( {setUser} ) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
            setUser(null);
        }
        });
    }
      

    return (
        <nav> 
            <Link to="/trips">My Trip List</Link> &nbsp;
            <Link to="/">Countries</Link> &nbsp;
            <Link to="/addCountry">Add Country</Link>
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar;
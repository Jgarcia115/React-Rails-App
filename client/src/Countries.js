import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddTrip from "./AddTrip";
import { UserContext } from "./user";

function Countries() {

  const user = useContext(UserContext)

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("/countries")
      .then((r) => r.json())
      .then(setCountries);
  }, []);

  return (
    <div>
      {countries.length > 0 ? (
        countries.map(country => {
          return <AddTrip key={country.id} country={country} user={user}/>
          })
      ) : (
        <>
          <h2>No Country Found</h2>
          <button as={Link} to="/new">
            Add a Country to Visit!
          </button>
        </>
      )}
    </div>
  );
}

export default Countries
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTrip from "./AddTrip";

function Countries({user}) {
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
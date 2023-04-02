import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("/trips")
      .then((r) => r.json())
      .then(setTrips);
  }, []);


  return (
    <div>
      {trips.length > 0 ? (
        trips.map(trip => (
          <div>
              <h2>{trip.budget}</h2>
              <h1>{trip.country}</h1>
          </div>
        ))
      ) : (
        <>
          <h2>No Trips Found</h2>
          <Link to='/'>
            Start planning your trip!
          </Link>
        </>
      )}
    </div>
  )
}

export default Trips
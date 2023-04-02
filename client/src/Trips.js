import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Trips() {
  const [trips, setTrips] = useState([]);
  console.log(trips)

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
            <h2>Where to? {trip.country.name}</h2>
            <h5>Budget: {trip.budget}</h5>
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
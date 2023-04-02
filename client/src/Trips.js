import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function Trips() {
  const [trips, setTrips] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/trips")
      .then((r) => r.json())
      .then(setTrips);
  }, []);

  function handleDelete(trip) {
    fetch(`/trips/${trip.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
      })
        .then(r=> {
            if(r.ok) {
                onDeleteTrip(trip)
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        })
}

function onDeleteTrip(trip) {
    const updatedTrips = trips.filter((t) => t.id !== trip.id)
    setTrips(updatedTrips)
}

function onChangeTrip(data) {
    const updatedTrips = trips.map((t)=> t.id === data.id ? data : t)
    setTrips(updatedTrips)
}

const [formData, setFormData] = useState({
    budget: "",
})

const navigate = useNavigate();

function handleChange(e) {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
}

function handleSubmit(e, id) {
    e.preventDefault();
    const tripObj = {
      "budget": formData.budget,
    }
    fetch(`/trips/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(tripObj)
    })
      .then(r=> r.json())
      .then(data=> {
          onChangeTrip(data)
          navigate('/trips')
      })
    }


  return (
    <div>
      {trips.length > 0 ? (
        trips.map(trip => (
          <div key={trip.id}>
            <h2>Where to? {trip.country.name}</h2>
            <h5>Budget: {trip.budget}</h5>
                <div className="edit-container"> {
                    isEditing ?
                    <form onSubmit={e=> handleSubmit(e, trip.id)}>
                        <input type='text' name="budget" defaultValue={trip.budget} onChange={handleChange} value={formData.budget}/>
                        <button type="submit">Submit Update</button>
                    </form>
                    : <button onClick={()=> setIsEditing(true)}>Update Budget</button>
                }
                </div>
            <button onClick={()=>handleDelete(trip)}>Delete Trip</button>
            <label>
                    {errors.map((err) => (
                    <p>{err}</p>
                ))}
                </label>
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
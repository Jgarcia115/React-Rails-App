import React, { useState} from "react"
import { useNavigate } from "react-router-dom"

function AddTrip ({ country, user }) {
    const [budget, setBudget] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id, name } = country

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/trips", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            budget,
            country_id: id,
            user_id: user.id
          }),
        }).then((r)=> {
            setIsLoading(false);
            if (r.ok) {
                navigate('/trips');
            } else { 
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <section className='Add'>
            <div>
                <h1>{name}</h1>
            </div>
            <p>Add Trip</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="budget"
                        placeholder="Budget for Trip"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </label>
                <button type="submit">
                {isLoading ? "Loading..." : "Submit Trip"}
                </button>
                <label>
                    {errors.map((err) => (
                    <p>{err}</p>
                ))}
                </label>
            </form>
        </section>
    )
}

export default AddTrip;
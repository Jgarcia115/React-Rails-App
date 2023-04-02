import React, { useState} from "react"
import { useNavigate } from "react-router-dom"

function AddCountry () {


    const [formData, setFormData] = useState({
        name: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const tripObj = {
          "name": formData.name
        }
        fetch("/countries", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(tripObj)
        }).then((r)=> {
            setIsLoading(false);
            if (r.ok) {
                navigate('/');
            } else { 
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <section className='Add'>
            <h1>Add Trip</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name of Country to Visit"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">
                {isLoading ? "Loading..." : "Submit Country"}
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

export default AddCountry;
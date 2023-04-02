import './App.css';
import React, { useEffect, useState, createContext } from "react";
import { Switch, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import Login from './Login'
import Countries from './Countries';
import AddCountry from './AddCountry';
import Trips from './Trips';

function App() {

  const [user, setUser] = useState(null) 

  useEffect(()=> {
    fetch("/me").then((r)=> {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return (<Login onLogin={setUser}/>)
   
  return (
    <div className="App">
        <NavBar setUser={setUser}/>
        <Routes>
          <Route path="/trips" element={<Trips/>}/>
          <Route path="/" element={<Countries key={user}/>}/>
          <Route path="/addCountry" element={<AddCountry/>}/>
        </Routes>
    </div>
  );
}

export default App;

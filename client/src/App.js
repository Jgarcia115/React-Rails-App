import './App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import Login from './Login'
import Countries from './Countries';
import AddCountry from './AddCountry';
import Trips from './Trips';
import { UserProvider } from './user';



function App() {

  const [user, setUser] = useState(null) 

  useEffect(()=> {
    fetch("/me").then((r)=> {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return (
  <UserProvider>
    <Login onLogin={setUser}/>
  </UserProvider>)
   
  return (
    <div className="App">
      <UserProvider>
        <NavBar setUser={setUser}/>
        <Routes>
            <Route path="/trips" element={<Trips/>}/>
            <Route path="/" element={<Countries/>}/>
            <Route path="/addCountry" element={<AddCountry/>}/>
        </Routes>
        </UserProvider>
    </div>
  );
}

export default App;

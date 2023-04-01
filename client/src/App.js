import './App.css';
import PlayerList from './PlayerList';
import Purpose from './Purpose';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import NavBar from './NavBar';
import AddPlayer from './AddPlayer';


function App() {

  const [players, setPlayers] = useState([]) 

  function addPlayer(newPlayer) {
    const updatedPlayers = [...players, newPlayer]
    setPlayers(updatedPlayers)
  }

  useEffect(()=> {
    fetch("http://localhost:9292/players")
    .then(r=> r.json())
    .then(data => {
      setPlayers(data)
    })
  }, [])

  function removePlayer(id) {
    const updatedPlayers = players.filter((player) => player.id !== id )
    setPlayers(updatedPlayers)
  }

  function onDeleteAgent(agent) {
    const player = players.find((player) => player.id === agent.player_id)
    const updatedAgents = player.agents.filter((a)=> a.id !== agent.id)
    const updatedPlayer = {...player, agents: updatedAgents}
    const updatedPlayers = players.map((p) => p.id === player.id ? updatedPlayer : p)
    setPlayers(updatedPlayers)
  }

  function onChangeAgent(data) {
    const player = players.find((player) => player.id === data.player_id)
    const updatedAgents = player.agents.map((a)=> a.id === data.id ? data : a)
    const updatedPlayer = {...player, agents: updatedAgents}
    const updatedPlayers = players.map((p) => p.id === player.id ? updatedPlayer : p)
    setPlayers(updatedPlayers)
  }

  function onAddAgent(data) {
    const player = players.find((player) => player.id === data.player_id)
    player.agents.push(data)
  }
   

  return (
    <div className="App">
      <Header/>
      <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/trips" element={<TripList />}/>
            <Route path="/add" element={<AddTrip onAddTrip={addTrip}/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;

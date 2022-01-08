import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  console.log(filters)
  console.log(pets)

  function findPets () {
    let query = ""
    if (filters.type !== "all") {
      query = `?type=${filters.type}`
    }
    fetch(`http://localhost:3001/pets${query}`)
    .then(r=>r.json())
    .then(d=>setPets(d))
  }

  function adoptPet(id) {
    //here is where the bug is...
    let newPets = pets.map( element => ( element.id === id ? {...element, isAdopted: true } : element )) 
    console.log(newPets)
    setPets(newPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={x => setFilters({type: x})} onFindPetsClick={findPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={adoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
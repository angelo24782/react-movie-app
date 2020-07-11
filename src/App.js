import React, { useState } from 'react';
import { Search } from './Components/Search';
import axios from "axios";
import { Results } from './Components/Results';
import { Popup } from './Components/Popup';

function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiUrl = "https://www.omdbapi.com/?apikey=648c0e26";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiUrl + "&s=" + state.s).then(({ data }) => {

        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        });

      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });

  }

  const openPopup = id => {
    axios(apiUrl + "&i=" + id).then(({ data }) => {

      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      });

    });
  }

  const closePopup = () => {

    setState(prevState => {
      return { ...prevState, selected: {} }
    });

  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}

      </main>
    </div>
  );
}

export default App;

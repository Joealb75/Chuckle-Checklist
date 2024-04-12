import { useEffect, useState } from "react";
import "./App.css";
import {
  saveNewJoke,
  getAllJokes,
  changeJokeStatus,
  deleteJoke,
} from "./services/jokeService.js";

export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [unToldJokes, setUnToldJokes] = useState([]);

  const updatePage = async () => {
    const jokes = await getAllJokes();
    setAllJokes(jokes);
  };

  // useEffect(() => {
  //   getAllJokes().then(setAllJokes);
  // }, []);

  useEffect(() => {
    updatePage()
    // all jokes has to be run before this can run
    if (allJokes.length != 0) {
      // check to see if all jokes = T/F
      setToldJokes(allJokes.filter((joke) => joke.told === true));
      setUnToldJokes(allJokes.filter((joke) => joke.told === false));
    }
  }, [allJokes]);

  const handleToldToggle = async (joke) =>{
    await changeJokeStatus(joke) 
    updatePage() // says dont update the page until you have changed the joke
  }

  const handleDeleteJoke = async (joke) =>{
    await deleteJoke(joke)
    updatePage()
  }

  return (
    <>
      <div>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={userInput}
            placeholder="New One Liner"
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          />

          <button
            className="joke-input-submit"
            onClick={() => [
              saveNewJoke(userInput),
              setUserInput(""),
              updatePage(),
            ]}
          >
            Add Joke
          </button>
        </div>

        {/* Display filtered Jokes  */}

        <div className="joke-lists-container">
          {/* UnTold Jokes */}
          <div className="joke-list-container">
            <h2 className="untold-count">
              {" "}
              ☺︎ Un-Told Jokes: {unToldJokes.length}
            </h2>

            {unToldJokes.map((joke) => {
              return (
                <div key={joke.id}>
                  <p className="joke-list-item">{joke.text}</p>
                  <div>
                    
                    <button className="joke-list-action-toggle" onClick={()=>{handleToldToggle(joke)}}>
                      {joke.told ? 'Mark Untold' : 'Mark Told'} ☺︎
                    </button>

                    <button className="joke-list-action-delete" onClick={()=>{handleDeleteJoke(joke)}}>
                      Delete Joke
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Told Jokes */}
          <div className="joke-list-container">
            <h2 className="told-count"> ☹︎ Told Jokes: {toldJokes.length}</h2>
            {toldJokes.map((joke) => {
              return (
                <div key={joke.id}>
                  <p className="joke-list-item" >
                    {joke.text}
                  </p>

                  <button className="joke-list-action-toggle" onClick={()=>{handleToldToggle(joke)}}>
                    {joke.told ? 'Mark Untold' : 'Mark Told'} ☹︎
                  </button>

                  <button className="joke-list-action-delete" onClick={()=>{handleDeleteJoke(joke)}}>
                    Delete Joke
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

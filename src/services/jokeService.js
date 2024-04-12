
export const saveNewJoke = async (inputJoke) => {

    const jokeObj = {
        "text": inputJoke,
        "told": false
    }

    const postOptions = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jokeObj)
    }
    const response = await fetch ("http://localhost:8088/jokes", postOptions)
}

export const getAllJokes =  () =>{
    return fetch("http://localhost:8088/jokes").then((res)=> res.json())
}

export const changeJokeStatus = async (joke) =>{
    // gets a copy of the joke and changes it to the opposite of its first value - if init is true it will be switched to false
    let updateJoke = {...joke, told: !joke.told}

    // allows you to get directly to the joke you are passing in 
    const response = await fetch(`http://localhost:8088/jokes/${joke.id}`,
    {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateJoke)
        // takes the updated joke and replaces the joke in the database
    })

}

export const deleteJoke = async (joke) => {
    const response = await fetch(`http://localhost:8088/jokes/${joke.id}`,
    {
        method: "DELETE"
    })
    

    //const updateData = response.filter(joke => joke.id !== jokeId)
}

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
    const responce = await fetch ("http://localhost:8088/jokes", postOptions)

    if(responce != []){

    }
}

export const getAllJokes = () =>{
    return fetch("http://localhost:8088/jokes").then((res)=> res.json())
}

export const changeJokeStatus = (editJoke) =>{
    let updateJoke = {...editJoke, told: !editJoke.told}

    // allows you to get directly to the joke you are passing in 
    const responce = await fetch(`http://localhost:8088/jokes/${editJoke.id}`,
    {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateJoke)
    })

}

export const deleteJoke = (joke_id) => {
    return
}
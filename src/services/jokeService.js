
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
}

export const getAllJokes = () =>{
    return fetch("http://localhost:8088/jokes").then((res)=> res.json())
}

export const deleteJoke = (joke_id) => {
    return
}
// Pokemon API URL
let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
// Document elements
const user_input = document.getElementById("search-input")
const search_button = document.getElementById("search-button")



const fetch_pokemon_api = async(pokemon) => {
    try{
        const res = await fetch(url + "/" + pokemon)
        const data = await res.json()
        return data
    }
    catch(err){
        console.error(err)
        throw err
    }
}
fetch_pokemon_api(user_input).then((pokemon_data) => {
    console.log(pokemon_data)
})

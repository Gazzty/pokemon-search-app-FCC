// Pokemon API URL
let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
// Document elements
const user_input = document.getElementById("search-input")
const search_button = document.getElementById("search-button")
const pokemon_name = document.getElementById("pokemon-name")
const pokemon_id = document.getElementById("pokemon-id")
const pokemon_img = document.getElementById("pokemon-img")

const fetch_pokemon_api = async (pokemon) => {
    try {
        const res = await fetch(url + "/" + pokemon)
        const data = await res.json()
        console.log(url + "/" + pokemon)
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}
fetch_pokemon_api(25).then((pokemon_data) => {
    console.log(pokemon_data)
})

search_button.addEventListener("click", (e) => {
    e.preventDefault()
    const user_pokemon = user_input.value

    fetch_pokemon_api(user_pokemon).then((pokemon_data) => {
        // Fill data
        pokemon_name.innerText = pokemon_data.name[0].toUpperCase() + pokemon_data.name.slice(1,)
        pokemon_id.innerText = `#${pokemon_data.id}`
        pokemon_img.src = pokemon_data.sprites.front_default
    })

})
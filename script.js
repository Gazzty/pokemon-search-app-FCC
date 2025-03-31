// Pokemon API URL
let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
// Document elements
const user_input = document.getElementById("search-input")
const search_button = document.getElementById("search-button")
const pokemon_name = document.getElementById("pokemon-name")
const pokemon_id = document.getElementById("pokemon-id")
const pokemon_img = document.getElementById("pokemon-img")
const pokemon_weight = document.getElementById("weight")
const pokemon_height = document.getElementById("height")
const pokemon_types = document.getElementById("types")

const fetch_pokemon_api = async (pokemon) => {
    try {
        const res = await fetch(url + "/" + pokemon)
        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

// Function to get pokemon types
const fetch_types = async () => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}
function get_types(data){
    let types = new Set()

    data.results.forEach((pokemon) => {
        fetch_pokemon_api(pokemon.id).then((data) => {
            data.types.forEach((type) => {
                types.add(type.type.name)
            })
        })
    })
    return types
}
/* fetch_types().then( async (pokemon_data) => {
    console.log(get_types(pokemon_data))
}) */

search_button.addEventListener("click", (e) => {
    e.preventDefault()

    if(user_input.value == ""){
        alert("Please enter data")
        return
    }

    const user_pokemon = user_input.value
    pokemon_types.innerHTML = ""

    fetch_pokemon_api(user_pokemon).then((pokemon_data) => {
        // Fill data
        pokemon_name.innerText = pokemon_data.name[0].toUpperCase() + pokemon_data.name.slice(1,)
        pokemon_id.innerText = `#${pokemon_data.id}`
        pokemon_img.src = pokemon_data.sprites.front_default
        pokemon_weight.innerText = `Weight: ${pokemon_data.weight}`
        pokemon_height.innerText = `Height: ${pokemon_data.height}`

        pokemon_data.types.forEach((type) => {
            pokemon_types.innerHTML += `<p>${type.type.name}</p>`
        })
    })
})


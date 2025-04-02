// Pokemon API URL
let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
// Document elements
const user_input = document.getElementById("search-input")
const search_button = document.getElementById("search-button")
const pokemon_name = document.getElementById("pokemon-name")
const pokemon_id = document.getElementById("pokemon-id")
const pokemon_img = document.getElementById("sprite")
const pokemon_weight = document.getElementById("weight")
const pokemon_height = document.getElementById("height")
const pokemon_types = document.getElementById("types")
const pokemon_hp = document.getElementById("hp")
const pokemon_attack = document.getElementById("attack")
const pokemon_defense = document.getElementById("defense")
const pokemon_special_attack = document.getElementById("special-attack")
const pokemon_special_defense = document.getElementById("special-defense")
const pokemon_speed = document.getElementById("speed")

const type_color = {
    fire: "#F08030",
    bug: "#A8B820",
    water: "#6890F0",
    poison: "#A040A0",
    flying: "#A890F0",
    grass: "#78C850",
    normal: "#A8A878",
    ground: "#E0C068",
    electric: "#F8D030",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    steel: "#B8B8D0",
    dragon: "#7038F8",
    dark: "#705848"
}

const fetch_pokemon_api = async (pokemon) => {
    try {
        const res = await fetch(url + "/" + pokemon)
        if (!res.ok) {
            if (res.status === 404) {
                alert("Pokémon not found")
            }
            throw new Error(`HTTP error! status: ${res.status}`)
        }
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

    const user_pokemon = user_input.value.toLowerCase()
    pokemon_types.innerHTML = ""

    fetch_pokemon_api(user_pokemon).then((pokemon_data) => {
        // Fill data
        pokemon_name.innerText = pokemon_data.name[0].toUpperCase() + pokemon_data.name.slice(1,)
        pokemon_id.innerText = `#${pokemon_data.id}`
        pokemon_img.src = pokemon_data.sprites.front_default
        pokemon_weight.innerText = `Weight: ${pokemon_data.weight}`
        pokemon_height.innerText = `Height: ${pokemon_data.height}`

        pokemon_data.types.forEach((type) => {
            pokemon_types.innerHTML += `<p style="background-color:${type_color[type.type.name]};">${type.type.name}</p>`
        })
        pokemon_hp.innerText = pokemon_data.stats[0].base_stat
        pokemon_attack.innerText = pokemon_data.stats[1].base_stat
        pokemon_defense.innerText = pokemon_data.stats[2].base_stat
        pokemon_special_attack.innerText = pokemon_data.stats[3].base_stat
        pokemon_special_defense.innerText = pokemon_data.stats[4].base_stat
        pokemon_speed.innerText = pokemon_data.stats[5].base_stat


    })
})
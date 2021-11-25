
let screen = document.querySelector(".pokedex-screen");

let addPokemonCard = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let image = document.createElement("img");
    card.setAttribute("class", "pokemon-card");
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    image.setAttribute("class", "pokemon-image");
    image.setAttribute("src", pokemon.sprites.front_default);
    image.setAttribute("alt", `image of ${pokemon.name}`);
    card.append(name);
    card.append(image);
    screen.append(card);
}

let loadPage = (id, limit) => {
    for (; id <= limit; id+=1) {
        let pokeapi = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let fetchData = async (pokeapi) => {
            try {
                let response = await fetch(pokeapi);
                let pokemon = await response.json();
                addPokemonCard(pokemon);
                console.log(pokemon);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData(pokeapi);
    }
}


loadPage(1, 10);

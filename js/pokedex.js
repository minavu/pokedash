
let screen = document.querySelector(".pokedex-screen");
let back = document.getElementById("back");
let next = document.getElementById("next");
let start = 0;
let limit = 10;
let end = start + limit;

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

let loadPage = (start, end) => {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    for (let id = start + 1; id <= end; id++) {
        console.log(id, end);
        let pokeapi = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let fetchData = async (pokeapi) => {
            try {
                let response = await fetch(pokeapi);
                let pokemon = await response.json();
                addPokemonCard(pokemon);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData(pokeapi);
    }
}


loadPage(start, end);

// back.onclick = () => {
    //     loadPage(start-=10, limit);
    // }
    
next.onclick = () => {
    limit = (start + limit >= 898) ? 898 : limit + start;
    loadPage(start+=10, limit);
}

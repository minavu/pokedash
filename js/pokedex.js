const types_list = [
	'normal',
	'fighting',
	'flying',
	'poison',
	'ground',
	'rock',
	'bug',
    'ghost',
    'steel',
	'fire',
	'water',
	'grass',
	'electric',
	'psychic',
    'ice',
	'dragon',
    'dark',
	'fairy',
    'unknown',
    'shadow'
];

const colors_list = [
	'#F5F5F5',
	'#E6E0D4',
	'#F5F5F5',
	'#D9D2E9',
	'#f4e7da',
	'#d5d5d4',
	'#f8d5a3',
    '#d5a6bd',
    '#e7e7e7',
	'#faafaf',
	'#DEF3FD',
	'#DEFDE0',
	'#FCF7DE',
	'#eaeda1',
    '#e0eefb',
	'#97b3e6',
    '#76a5af',
	'#fceaff',
    '#5b5b5b',
    '#ea9999'
];

let screen = document.querySelector(".pokedex-screen");
let modal = document.getElementById("modal-window");
let modal_screen = document.querySelector(".modal-screen");
let close = document.getElementsByClassName("close")[0];
let back = document.getElementById("back");
let next = document.getElementById("next");
let start = 0;
let limit = 12;
let end = start + limit;

close.onclick = () => {
    modal.style.display = "none";
}

let displayInfoModal = (pokemon) => {
    document.querySelectorAll(".pokemon-modal").forEach(card => card.remove());
    modal.style.display = "block";
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let image = document.createElement("img");

    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    image.setAttribute("class", "pokemon-modal-image");
    image.setAttribute("src", pokemon.sprites.front_default);
    image.setAttribute("alt", `image of ${pokemon.name}`);
    card.append(name);
    card.append(image);
    card.setAttribute("class", "pokemon-modal");
    modal_screen.append(card);
}

let addPokemonCard = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let image = document.createElement("img");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let index1 = types_list.indexOf(`${type1_name}`);
    if (type2) {
        let {type: {name: type2_name}} = type2;
        let index2 = types_list.indexOf(`${type2_name}`);
        card.style.background = `linear-gradient(${colors_list[index1]}, ${colors_list[index2]})`;
    } else {
        card.style.backgroundColor = colors_list[index1];
    }
    
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    image.setAttribute("class", "pokemon-image");
    image.setAttribute("src", pokemon.sprites.front_default);
    image.setAttribute("alt", `image of ${pokemon.name}`);
    card.append(name);
    card.append(image);
    screen.append(card);
    
    card.setAttribute("class", "pokemon-card");
    card.onclick = () => {
        displayInfoModal(pokemon);
    }
}

let loadPage = (start, end) => {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    for (let id = start + 1; id <= end; id++) {
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

back.onclick = () => {
    if (start === 0) return;
    start = start - limit;
    end = start + limit;
    loadPage(start, end);
}
    
next.onclick = () => {
    if (end === 898) return;
    start = start + limit;
    end = (start + limit >= 898) ? 898 : start + limit;
    loadPage(start, end);
}


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
let modal_screen = document.querySelector(".modal-screen");
let close = document.querySelector(".close");
let back = document.getElementById("back");
let next = document.getElementById("next");
let start = 0;
let limit = 12;
let end = start + limit;

close.onclick = () => {
    modal_screen.style.display = "none";
    screen.style.overflow = "auto";
}

let modalName = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let types_heading = document.createElement("h5");
    let pokemon_type1 = document.createElement("h5");
    let pokemon_type2 = document.createElement("h5");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let type2_name;
    if (type2) {
        let {type: {name: type2_name_}} = type2;
        if (type2_name_) type2_name = type2_name_;
    }
    
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    types_heading.textContent = "TYPES";
    types_heading.style.textDecoration = "underline";
    pokemon_type1.textContent = type1_name;
    pokemon_type2.textContent = type2_name;
    card.append(name);
    card.append(types_heading);
    card.append(pokemon_type1);
    card.append(pokemon_type2);
    card.setAttribute("class", "pokemon-modal");
    modal_screen.append(card);
}

let modalImages = (pokemon) => {
    let card1 = document.createElement("div");
    let card2 = document.createElement("div");
    let image1 = document.createElement("img");
    let image2 = document.createElement("img");
    let image3 = document.createElement("img");
    let image4 = document.createElement("img");

    image1.setAttribute("class", "pokemon-modal-image");
    image1.setAttribute("src", pokemon.sprites.front_default);
    image1.setAttribute("alt", `image of ${pokemon.name}`);
    image2.setAttribute("class", "pokemon-modal-image");
    image2.setAttribute("src", pokemon.sprites.back_default);
    image2.setAttribute("alt", `image of ${pokemon.name}`);
    image3.setAttribute("class", "pokemon-modal-image");
    image3.setAttribute("src", pokemon.sprites.front_shiny);
    image3.setAttribute("alt", `image of ${pokemon.name}`);
    image4.setAttribute("class", "pokemon-modal-image");
    image4.setAttribute("src", pokemon.sprites.back_shiny);
    image4.setAttribute("alt", `image of ${pokemon.name}`);
    card1.append(image1);
    card1.append(image2);
    card2.append(image3);
    card2.append(image4);
    card1.setAttribute("class", "pokemon-modal");
    card2.setAttribute("class", "pokemon-modal");
    modal_screen.append(card1);
    modal_screen.append(card2);
}

let modalStats = (pokemon) => {
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let {stats} = pokemon;
    let [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

    let test = () => {
        console.log(hp.stat.name, hp.base_stat);
        console.log(attack.stat.name, attack.base_stat);
        console.log(defense.stat.name, defense.base_stat);
        console.log(specialAttack.stat.name, specialAttack.base_stat);
        console.log(specialDefense.stat.name, specialDefense.base_stat);
        console.log(speed.stat.name, speed.base_stat);
    }
    // test();
    let card = document.createElement("div");
    let canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    canvas.style.padding = "20px";
    
    new Chart(canvas, {
        type: 'radar',
        options: {
            scale: {
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            },
        },
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{
                label: `Base Stats for ${name}`,
                data: [hp.base_stat, attack.base_stat, defense.base_stat, specialAttack.base_stat, specialDefense.base_stat, speed.base_stat],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
    })
    
    card.append(canvas);
    card.setAttribute("class", "pokemon-modal");
    modal_screen.append(card);
}

let displayInfoModal = (pokemon) => {
    document.querySelectorAll(".pokemon-modal").forEach(card => card.remove());
    modal_screen.style.removeProperty("background");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let index1 = types_list.indexOf(`${type1_name}`);
    if (type2) {
        let {type: {name: type2_name}} = type2;
        let index2 = types_list.indexOf(`${type2_name}`);
        modal_screen.style.background = `linear-gradient(${colors_list[index1]}, ${colors_list[index2]})`;
    } else {
        modal_screen.style.backgroundColor = colors_list[index1];
    }
    
    modalName(pokemon);
    modalImages(pokemon);
    modalStats(pokemon);

    modal_screen.style.display = "block";
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


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

let screen = document.querySelector(".bar-Chart");
let modal_screen = document.querySelector(".bar-Chart1");


let addPokemonCard = (pokemon) => {
    let card = document.createElement("div");
    let name = document.createElement("h3");
    let image = document.createElement("img");
    
    let {types: [type1, type2]} = pokemon;
    let {type: {name: type1_name}} = type1;
    let index1 = types_list.indexOf(`${type1_name}`);
	
	//console.log(":"+type1.type.name+":");
	  
	
   /* if (type2) {
        let {type: {name: type2_name}} = type2;
        let index2 = types_list.indexOf(`${type2_name}`);
        card.style.background = `linear-gradient(${colors_list[index1]}, ${colors_list[index2]})`;
    } else {
        card.style.backgroundColor = colors_list[index1];
    }
    */
	

}



let loadPage = () => {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    for (let id = 1; id <= 898; id++) {
        let pokeapi = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let fetchData = async (pokeapi) => {
            try {
                let response = await fetch(pokeapi);
                let pokemon = await response.json();
			//	console.log(id+ " : " +pokemon.types_list);
               addPokemonCard(pokemon);
            } catch(error) {
               // console.error(error);
            }
        }
        fetchData(pokeapi);
    }
}

loadPage();
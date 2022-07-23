const pokeName = document.querySelector('.poke-name');
const pokeNumber = document.querySelector('.poke-number');
const pokeImg = document.querySelector('.poke-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const bPrev = document.querySelector('.btn-prev');
const bNext = document.querySelector('.btn-next');

let pokeSearch = 1;

const pokeFetch = async function(pokemon){
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderizar = async function(pokemon){
    pokeName.innerHTML = 'loading...';
    pokeNumber.innerHTML = '';

    const data = await pokeFetch(pokemon);

    if(data){
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pokeSearch = data.id;
    }
    else{
        pokeImg.style.display = 'none';
        pokeName.innerHTML = 'not found';
        pokeNumber.innerHTML = '';
        input.value = '';
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    renderizar(input.value.toLowerCase());
});

bPrev.addEventListener('click', () => {
    if (pokeSearch > 1) {
      pokeSearch -= 1;
      renderizar(pokeSearch);
    }
  });
  
bNext.addEventListener('click', () => {
    pokeSearch += 1;
    renderizar(pokeSearch);
  });
  
  renderizar(pokeSearch);
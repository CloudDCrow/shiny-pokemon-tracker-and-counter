(async function() {
  const submitBtn = document.getElementById("submit-btn");
  let pokemonNameInput = document.getElementById("pokemon-name");
  let pokemonImage = document.getElementById("pokemon-image");
  let pokemonList = [];

  submitBtn.addEventListener("click", handleSubmitBtnClick);
  pokemonNameInput.addEventListener("keyup", handlePokemonNameInputKeyUp);

  // Load the Pokemon list from the JSON file
  if (pokemonList.length == 0) {
    pokemonList = await (await fetch('pokemon_list.json')).json();
  }

  function handleSubmitBtnClick() {
    let pokemonName = pokemonNameInput.value.toLowerCase().replace(/\s+|-|'|^0+/g, '');
    let pokemonIndex = pokemonList.indexOf(pokemonName);

    // If the Pokemon name is found in the list, set the image source
    if (pokemonIndex !== -1) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex + 1}.png`;
    } else if (pokemonName > 0 && pokemonName <= 1008) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
      console.log(pokemonName);
    } else {
      pokemonImage.src = 'images/missi.png';
    }
  }

  function handlePokemonNameInputKeyUp(event) {
    if (event.keyCode === 13) {
      submitBtn.click();
    }
  }
})();
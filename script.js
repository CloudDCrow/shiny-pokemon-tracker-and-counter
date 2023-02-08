(function() {
  const submitBtn = document.getElementById("submit-btn");
  let pokemonNameInput = document.getElementById("pokemon-name");
  let pokemonImage = document.getElementById("pokemon-image");

  submitBtn.addEventListener("click", handleSubmitBtnClick);
  pokemonNameInput.addEventListener("keyup", handlePokemonNameInputKeyUp);

  function handleSubmitBtnClick() {
    const pokemonName = pokemonNameInput.value;

    if(pokemonName > 0 & pokemonName < 1008) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
    }

    else if(pokemonName == -69) {
      pokemonImage.src = '69.png';
    }

    else {
      pokemonImage.src = 'missi.png';
    }
  }

  function handlePokemonNameInputKeyUp(event) {
    if (event.keyCode === 13) {
      submitBtn.click();
    }
  }
})();

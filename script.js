(async function main() {
  const submitBtn = document.getElementById("submit-btn");
  const plusOneBtn = document.getElementById("one-counter-btn");
  const plusFiveBtn = document.getElementById("five-counters-btn");
  const minusOneBtn = document.getElementById("remove-counter-btn");
  let pokemonNameInput = document.getElementById("pokemon-name");
  let pokemonImage = document.getElementById("pokemon-image");
  let pokemonList = [];
  let counter = document.getElementById("counter");
  let count = 0;

  submitBtn.addEventListener("click", handleSubmitBtnClick);
  plusOneBtn.addEventListener("click", handlePlusOneBtnClick);
  plusFiveBtn.addEventListener("click", handlePlusFiveBtnBtnClick);
  minusOneBtn.addEventListener("click", handleMinusOneBtnClick);
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
      swapButtons();
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex + 1}.png`;
    } else if (pokemonName > 0 && pokemonName <= 1008) {
      swapButtons();
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
      console.log(pokemonName);
    } else {
      pokemonImage.src = 'images/missi.png';
    }
  }

  function handlePlusOneBtnClick() {
    count += 1;
    counter.innerHTML = count;
  }

  function handlePlusFiveBtnBtnClick() {
    count += 5;
    counter.innerHTML = count;
  }

  function handleMinusOneBtnClick() {
    if (count > 0) {
      count -= 1;
    }
    counter.innerHTML = count;
  }

  function handlePokemonNameInputKeyUp(event) {
    if (event.keyCode === 13) {
      submitBtn.click();
    }
  }

  function swapButtons() {
    plusOneBtn.style.display = "flex";
    plusFiveBtn.style.display = "flex";
    minusOneBtn.style.display = "flex";
  }
  
})();
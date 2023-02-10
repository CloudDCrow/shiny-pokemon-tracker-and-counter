(async function main() {
  const submitBtn = document.getElementById("submit-btn");
  const plusOneBtn = document.getElementById("one-counter-btn");
  const plusFiveBtn = document.getElementById("five-counters-btn");
  const minusOneBtn = document.getElementById("remove-counter-btn");
  const doneBtn = document.getElementById("done-btn");
  const buttons = document.querySelectorAll('button');
  const pokemonBox = document.querySelector("#pokemon-box-div");

  const pokemonNameInput = document.getElementById("name-input");
  const pokemonImage = document.getElementById("pokemon-image");
  const counter = document.getElementById("counter");

  let pokemonName = "";
  let pokemonIndex = 0;
  let count = 0;
  let pokemonList = [];

  submitBtn.addEventListener("click", handleSubmitBtnClick);
  plusOneBtn.addEventListener("click", handlePlusOneBtnClick);
  plusFiveBtn.addEventListener("click", handlePlusFiveBtnBtnClick);
  minusOneBtn.addEventListener("click", handleMinusOneBtnClick);
  doneBtn.addEventListener("click", handleDoneBtnClick);
  pokemonNameInput.addEventListener("keyup", handlePokemonNameInputKeyUp);

  // Load the Pokemon list from the JSON file
  if (pokemonList.length == 0) {
    pokemonList = await (await fetch('pokemon_list.json')).json();
  }

  function handleSubmitBtnClick() {

    pokemonName = pokemonNameInput.value.toLowerCase().replace(/\s+|-|'|^0+/g, '');
    pokemonIndex = pokemonList.indexOf(pokemonName);

    // If the Pokemon name is found in the list, set the image source
    if (pokemonIndex !== -1) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex + 1}.png`;
      console.log(pokemonName);
      swapButtons();
    } else if (pokemonName > 0 && pokemonName <= 1008) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
      console.log(pokemonName);
      swapButtons();
    } else {
      pokemonImage.src = 'images/missi.png';
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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

  function handleDoneBtnClick() {
    count = 0;
    counter.innerHTML = count;

    for (let button of buttons) {
      if(button.style.display === "flex") {
        button.style.display = "none";
      } else {
        button.style.display = "flex";
      }
    }

    if (pokemonNameInput.style.display === "flex") {
      pokemonNameInput.style.display = "none";
    } else {
      pokemonNameInput.style.display = "flex";
    }
    
    const newPokemonImg = new Image();
    newPokemonImg.src = pokemonImage.src;
    newPokemonImg.style.height = "15vh";
    pokemonImage.src = "images/placeholder_pokemon.png";

    pokemonNameInput.value = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    pokemonBox.appendChild(newPokemonImg);
  }

  function handlePokemonNameInputKeyUp(event) {
    if (event.keyCode === 13) {
      submitBtn.click();
      pokemonNameInput.blur();
    }
  }

  function swapButtons() {
    plusOneBtn.style.display = "flex";
    plusFiveBtn.style.display = "flex";
    minusOneBtn.style.display = "flex";
    doneBtn.style.display = "flex";
    submitBtn.style.display = "none";
    pokemonNameInput.style.display = "none";
  }
})();
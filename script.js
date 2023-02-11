(async function main() {
  const submitBtn = document.getElementById("submit-btn");
  const plusOneBtn = document.getElementById("one-counter-btn");
  const plusFiveBtn = document.getElementById("five-counters-btn");
  const minusOneBtn = document.getElementById("remove-counter-btn");
  const doneBtn = document.getElementById("done-btn");
  const pokemonBox = document.querySelector("#pokemon-box-div");

  const pokemonNameInput = document.getElementById("name-input");
  const pokemonImage = document.getElementById("pokemon-image");
  const counter = document.getElementById("counter");

  let pokemonName = "";
  let pokemonIndex = 0;
  let count = 0;
  let pokemonList = [];
  let storedPokemonList = [];

  if (pokemonList.length == 0) {
    pokemonList = await (await fetch('pokemon_list.json')).json();
  }

  if (localStorage.getItem("mode") == "count-mode") {
    swapToCountMode();
    count = parseInt(localStorage.getItem("count"));
    pokemonImage.src = localStorage.getItem("current-hunt");
    counter.innerHTML = count;
  } else{
    swapToSearchMode();
  }

  getStoredPokemon();
  addAllEventListeners();
  
  // Handle Functions
  function handleSubmitBtnClick() {
    pokemonName = pokemonNameInput.value.toLowerCase().replace(/\s+|-|'|^0+/g, '');
    pokemonIndex = pokemonList.indexOf(pokemonName);

    if (pokemonIndex !== -1) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex + 1}.png`;
      swapToCountMode();
      localStorage.setItem("current-hunt", pokemonImage.src);
      localStorage.setItem("count", 0);
    } else if (pokemonName > 0 && pokemonName <= 1008) {
      pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
      swapToCountMode();
      localStorage.setItem("current-hunt", pokemonImage.src);
      localStorage.setItem("count", 0);
    } else {
      pokemonImage.src = 'images/missi.png';
    }
  }

  function handlePlusOneBtnClick() {
    count += 1;
    counter.innerHTML = count;
    localStorage.setItem("count", count);
  }

  function handlePlusFiveBtnBtnClick() {
    count += 5;
    counter.innerHTML = count;
    localStorage.setItem("count", count);
  }

  function handleMinusOneBtnClick() {
    if (count > 0) {
      count -= 1;
    }
    counter.innerHTML = count;
    localStorage.setItem("count", count);
  }

  function handleDoneBtnClick() {    
    addPokemonToBox(pokemonImage.src);
    swapToSearchMode();
    localStorage.setItem("count", 0);
  }

  function handlePokemonNameInputKeyUp(event) {
    if (event.keyCode === 13) {
      submitBtn.click();
      pokemonNameInput.blur();
    }
  }

  // Swap The Website Layout
  function swapToCountMode() {
    plusOneBtn.style.display = "flex";
    plusFiveBtn.style.display = "flex";
    minusOneBtn.style.display = "flex";
    doneBtn.style.display = "flex";
    submitBtn.style.display = "none";
    pokemonNameInput.style.display = "none";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    localStorage.setItem("mode", "count-mode");
  }

  function swapToSearchMode() {
    count = 0;
    counter.innerHTML = count;
    pokemonNameInput.value = "";

    plusOneBtn.style.display = "none";
    plusFiveBtn.style.display = "none";
    minusOneBtn.style.display = "none";
    doneBtn.style.display = "none";
    submitBtn.style.display = "flex";
    pokemonNameInput.style.display = "flex";

    pokemonImage.src = "images/placeholder_pokemon.png";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    localStorage.setItem("mode", "search-mode");
  }
  
  //Pokemon Box Functions
  function addPokemonToBox(imageSrc) {
    const newPokemonImg = new Image();
    const recordedCounter = document.createElement("div");
    const newGridItem = document.createElement("div");

    newPokemonImg.src = imageSrc;
    recordedCounter.innerText = count;

    newPokemonImg.classList.add("pokemon-box-image");
    recordedCounter.classList.add("pokemon-box-counter");
    newGridItem.classList.add("grid-item");

    newGridItem.appendChild(newPokemonImg);
    newGridItem.appendChild(recordedCounter);
    pokemonBox.appendChild(newGridItem);

    storedPokemonList.push({
      src: newPokemonImg.src,
      count: recordedCounter.innerText
     });    

    localStorage.setItem("storedPokemonList", JSON.stringify(storedPokemonList));
  }

  function getStoredPokemon() {
    if(storedPokemonList < localStorage.getItem("storedPokemonList")) {
      var storedPokemon = JSON.parse(localStorage.getItem("storedPokemonList"));
    
      for(let pokemonKey in storedPokemon) {
        const newPokemonImg = new Image();
        const recordedCounter = document.createElement("div");
        const newGridItem = document.createElement("div");
    
        newPokemonImg.src = storedPokemon[pokemonKey].src;
        recordedCounter.innerText = storedPokemon[pokemonKey].count;
    
        newPokemonImg.classList.add("pokemon-box-image");
        recordedCounter.classList.add("pokemon-box-counter");
        newGridItem.classList.add("grid-item");
    
        newGridItem.appendChild(newPokemonImg);
        newGridItem.appendChild(recordedCounter);
        pokemonBox.appendChild(newGridItem);
  
        storedPokemonList.push({
          src: newPokemonImg.src,
          count: recordedCounter.innerText
         });    
    
        localStorage.setItem("storedPokemonList", JSON.stringify(storedPokemonList));
      }
    }
  }

  function addAllEventListeners() {
    submitBtn.addEventListener("click", handleSubmitBtnClick);
    plusOneBtn.addEventListener("click", handlePlusOneBtnClick);
    plusFiveBtn.addEventListener("click", handlePlusFiveBtnBtnClick);
    minusOneBtn.addEventListener("click", handleMinusOneBtnClick);
    doneBtn.addEventListener("click", handleDoneBtnClick);
    pokemonNameInput.addEventListener("keyup", handlePokemonNameInputKeyUp);
  }
})();
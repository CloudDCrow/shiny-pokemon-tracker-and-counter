(async function main() {
  const submitBtn = document.querySelector("#submit-btn");
  const plusOneBtn = document.querySelector("#one-counter-btn");
  const plusFiveBtn = document.querySelector("#five-counters-btn");
  const minusOneBtn = document.querySelector("#remove-counter-btn");
  const doneBtn = document.querySelector("#done-btn");
  const trashBtn = document.querySelector("#trash-btn");
  const changeWallpaperBtn = document.querySelector("#change-wallpaper-btn");
  const pokemonBox = document.querySelector("#pokemon-box-div");
  const boxEncounters = document.getElementsByClassName("pokemon-box-counter");

  const pokemonNameInput = document.querySelector("#name-input");
  const pokemonImage = document.querySelector("#pokemon-image");
  const counter = document.querySelector("#counter");

  let pokemonName = "";
  let pokemonIndex = 0;
  let count = 0;
  let trash = false;
  let currentWallpaper = 0;
  var pokemonList = [];
  var storedPokemonList = [];
  var wallpaperList = ["linear-gradient(rgba(230, 230, 230, 0.9), rgba(228, 228, 228, 0.9)), url('images/wallpapers/wall.jpg')",
                        "url('images/wallpapers/clouds.jpg')",
                        "url('images/wallpapers/leaves.jpg')",
                        "linear-gradient(rgba(230, 230, 230, 0.6), rgba(228, 228, 228, 0.6)), url('images/wallpapers/desert.jpg')",
                        "url('images/wallpapers/cosmos.jpg')",
                      ];

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
  changeWallpaper();
  addAllEventListeners();
  
  // Handle Functions
  function handleSubmitBtnClick() {
    pokemonName = pokemonNameInput.value.toLowerCase().replace(/\s+|-|'|^0+/g, '');
    pokemonIndex = pokemonList.indexOf(pokemonName);
    checkForForms();

    if (pokemonIndex !== -1) {
      pokemonImage.src = `https://raw.githubusercontent.com/CloudDCrow/sprites/pokeapi-sprite-contribution/sprites/pokemon/other/official-artwork/shiny/${pokemonIndex + 1}.png`;
      swapToCountMode();
      localStorage.setItem("current-hunt", pokemonImage.src);
      localStorage.setItem("count", 0);
    } else if (pokemonName > 0 && pokemonName <= 1008) {
      pokemonImage.src = `https://raw.githubusercontent.com/CloudDCrow/sprites/pokeapi-sprite-contribution/sprites/pokemon/other/official-artwork/shiny/${pokemonName}.png`;
      swapToCountMode();
      localStorage.setItem("current-hunt", pokemonImage.src);
      localStorage.setItem("count", 0);
    } else {
      pokemonImage.src = 'images/missi.png';
      
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
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
    searchPopupWindow() 
  }

  function handleTrashBtnClick() {
    if(trash == false) {
      trashBtn.style.backgroundColor = "green";
      pokemonBox.style.cursor = 'url("images/delete_cursor.png"), auto';
      trash = true;
    } else {
      trashBtn.style.backgroundColor = "red";
      pokemonBox.style.cursor = 'url("images/pokeball_cursor.png"), auto';
      trash = false;
    }
  }

  function handleChangeWallpaperBtnClick() {
    currentWallpaper += 1;
    if(currentWallpaper > 4) {
      currentWallpaper = 0;
    }
    localStorage.setItem("wallpaper", currentWallpaper);

    changeWallpaper();
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


    newPokemonImg.addEventListener("click", function() {
      boxPopupWindow(newPokemonImg, recordedCounter,newGridItem);
    });

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

        newPokemonImg.addEventListener("click", function() {
          boxPopupWindow(newPokemonImg, recordedCounter, newGridItem);
          console.log("ok");
        });
    
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

  function changeWallpaper() {
    if (localStorage.getItem("wallpaper") !== null) {
      currentWallpaper = parseInt(localStorage.getItem("wallpaper"));
    }
         
    if(currentWallpaper == 2 || currentWallpaper == 4){
      for (let i = 0; i < boxEncounters.length; i++) {
        boxEncounters[i].style.color = "white";
     } 
    } else {
      for (let i = 0; i < boxEncounters.length; i++) {
        boxEncounters[i].style.color = "black";
     }
    }
    pokemonBox.style.backgroundImage = wallpaperList[currentWallpaper];
  }

  function boxPopupWindow(imageInGrid, countInGrid, gridItem) {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    const closeButton = document.createElement("button");
    const removeGridButton = document.createElement("button");
    const changeCountButton = document.createElement("button");
    const body = document.querySelector("body");
    const popupContent = document.createElement("div");

    if(trash) {
      popupContent.innerHTML = "Do you really wish to delete this hunt?";
    } else {
      popupContent.innerHTML = "Congratulations! You got it in <b>" + countInGrid.innerHTML + "</b> encounters."
    }
    removeGridButton.innerHTML = "Delete";
    changeCountButton.innerHTML = "Change Count";

    overlay.classList.add("overlay");
    popup.classList.add("popup");
    popupContent.classList.add("popup-content");
    closeButton.classList.add("button","close-popup-btn");
    changeCountButton.classList.add("button", "change-count-btn");
    removeGridButton.classList.add("button", "remove-grid-btn");

    closeButton.addEventListener("click", function() {
      popup.remove();
      overlay.remove();
    });

    removeGridButton.addEventListener("click", function() {
      gridItem.remove();
      console.log(storedPokemonList.length);
    
      let indexToRemove = storedPokemonList.findIndex(item => {
        return item.src === imageInGrid.src && item.count === countInGrid.innerText;
      });
    
      storedPokemonList.splice(indexToRemove, 1);
      localStorage.setItem("storedPokemonList", JSON.stringify(storedPokemonList));
    
      popup.remove();
      overlay.remove();
    });

    body.appendChild(overlay);
    popup.appendChild(closeButton);
    popup.appendChild(popupContent);
    if(trash) {
      popup.appendChild(removeGridButton);
    }
    body.appendChild(popup);
  }

  function searchPopupWindow() {
    const overlay = document.createElement("div");
    const popup = document.createElement("div");
    const closeButton = document.createElement("button");
    const yesButton = document.createElement("button");
    const noButton = document.createElement("button");
    const body = document.querySelector("body");
    const popupContent = document.createElement("div");

    popupContent.innerHTML = "Did you get the shiny?";
    yesButton.innerHTML = "Yes!";
    noButton.innerHTML = "Not yet...";

    overlay.classList.add("overlay");
    popup.classList.add("popup");
    popupContent.classList.add("popup-content");
    closeButton.classList.add("button","close-popup-btn");
    yesButton.classList.add("button", "yes-btn");
    noButton.classList.add("button", "no-btn");

    closeButton.addEventListener("click", function() {
      popup.remove();
      overlay.remove();
    });

    yesButton.addEventListener("click", function() {
      addPokemonToBox(pokemonImage.src);
      swapToSearchMode();
      changeWallpaper();
      localStorage.setItem("count", 0);
      popup.remove();
      overlay.remove();
    });

    noButton.addEventListener("click", function() {
      popup.remove();
      overlay.remove();
    });

    body.appendChild(overlay);
    popup.appendChild(closeButton);
    popup.appendChild(popupContent);
    popup.appendChild(yesButton);
    popup.appendChild(noButton);
    body.appendChild(popup);
  }

  function addAllEventListeners() {
    submitBtn.addEventListener("click", handleSubmitBtnClick);
    plusOneBtn.addEventListener("click", handlePlusOneBtnClick);
    plusFiveBtn.addEventListener("click", handlePlusFiveBtnBtnClick);
    minusOneBtn.addEventListener("click", handleMinusOneBtnClick);
    doneBtn.addEventListener("click", handleDoneBtnClick);
    trashBtn.addEventListener("click", handleTrashBtnClick);
    changeWallpaperBtn.addEventListener("click", handleChangeWallpaperBtnClick);
    pokemonNameInput.addEventListener("keyup", handlePokemonNameInputKeyUp);
  }

  function checkForForms() {
    //Checks for alolan forms
    if(pokemonName.includes("alolan")) {
      if(pokemonName == "alolanrattata") {
        pokemonIndex = 10090;
      }
      if(pokemonName == "alolanraticate") {
        pokemonIndex = 10091;
      }
      if(pokemonName == "alolanraichu") {
        pokemonIndex = 10099;
      }
      if(pokemonName == "alolansandshrew") {
        pokemonIndex = 10100;
      }
      if(pokemonName == "alolansandslash") {
        pokemonIndex = 10101;
      }
      if(pokemonName == "alolanvulpix") {
        pokemonIndex = 10102;
      }
      if(pokemonName == "alolanninetales") {
        pokemonIndex = 10103;
      }
      if(pokemonName == "alolandiglett") {
        pokemonIndex = 10104;
      }
      if(pokemonName == "alolandugtrio") {
        pokemonIndex = 10105;
      }
      if(pokemonName == "alolanmeowth") {
        pokemonIndex = 10106;
      }
      if(pokemonName == "alolanpersian") {
        pokemonIndex = 10107;
      }
      if(pokemonName == "alolangeodude") {
        pokemonIndex = 10108;
      }
      if(pokemonName == "alolangraveler") {
        pokemonIndex = 10109;
      }
      if(pokemonName == "alolangolem") {
        pokemonIndex = 10110;
      }
      if(pokemonName == "alolangrimer") {
        pokemonIndex = 10111;
      }
      if(pokemonName == "alolanmuk") {
        pokemonIndex = 10112;
      }
      if(pokemonName == "alolanexeggutor") {
        pokemonIndex = 10113;
      }
      if(pokemonName == "alolanmarowak") {
        pokemonIndex = 10114;
      }
    }

    //Checks for galarian forms
    if(pokemonName.includes("galarian")) {
      if(pokemonName == "galarianmeowth") {
        pokemonIndex = 10160;
      }
      if(pokemonName == "galarianponyta") {
        pokemonIndex = 10161;
      }
      if(pokemonName == "galarianrapidash") {
        pokemonIndex = 10162;
      }
      if(pokemonName == "galarianslowpoke") {
        pokemonIndex = 10163;
      }
      if(pokemonName == "galarianslowbro") {
        pokemonIndex = 10164;
      }
      if(pokemonName == "galarianfarfetchd") {
        pokemonIndex = 10165;
      }
      if(pokemonName == "galarianweezing") {
        pokemonIndex = 10166;
      }
      if(pokemonName == "galarianmrmime") {
        pokemonIndex = 10167;
      }
      if(pokemonName == "galarianarticuno") {
        pokemonIndex = 10168;
      }
      if(pokemonName == "galarianzapdos") {
        pokemonIndex = 10169;
      }
      if(pokemonName == "galarianmoltres") {
        pokemonIndex = 10170;
      }
      if(pokemonName == "galarianslowking") {
        pokemonIndex = 10171;
      }
      if(pokemonName == "galariancorsola") {
        pokemonIndex = 10172;
      }
      if(pokemonName == "galarianzigzagoon") {
        pokemonIndex = 10173;
      }
      if(pokemonName == "galarianlinoone") {
        pokemonIndex = 10174;
      }
      if(pokemonName == "galariandarumaka") {
        pokemonIndex = 10175;
      }
      if(pokemonName == "galariandarmanitan") {
        pokemonIndex = 10176;
      }
      if(pokemonName == "galarianyamask") {
        pokemonIndex = 10178;
      }
      if(pokemonName == "galarianstunfisk") {
        pokemonIndex = 10179;
      }
    }

    //Checks for hisuian forms
    if(pokemonName.includes("hisuian")) {
      if(pokemonName == "hisuiangrowlithe") {
        pokemonIndex = 10228;
      }
      if(pokemonName == "hisuianarcanine") {
        pokemonIndex = 10229;
      }
      if(pokemonName == "hisuianvoltorb") {
        pokemonIndex = 10230;
      }
      if(pokemonName == "hisuianelectrode") {
        pokemonIndex = 10231;
      }
      if(pokemonName == "hisuiantyphlosion") {
        pokemonIndex = 10232;
      }
      if(pokemonName == "hisuianqwilfish") {
        pokemonIndex = 10233;
      }
      if(pokemonName == "hisuiansneasel") {
        pokemonIndex = 10234;
      }
      if(pokemonName == "hisuiansamurott") {
        pokemonIndex = 10235;
      }
      if(pokemonName == "hisuianlilligant") {
        pokemonIndex = 10236;
      }
      if(pokemonName == "hisuianzoroa") {
        pokemonIndex = 10237;
      }
      if(pokemonName == "hisuianzoroark") {
        pokemonIndex = 10238;
      }
      if(pokemonName == "hisuianbraviary") {
        pokemonIndex = 10239;
      }
      if(pokemonName == "hisuiansliggoo") {
        pokemonIndex = 10240;
      }
      if(pokemonName == "hisuiangoodra") {
        pokemonIndex = 10241;
      }
      if(pokemonName == "hisuianavalugg") {
        pokemonIndex = 10242;
      }
      if(pokemonName == "hisuiandecidueye") {
        pokemonIndex = 10243;
      }
    }

    //Checks for paldean forms
    if(pokemonName.includes("paldean")) {
      if(pokemonName == "paldeantauros") {
        pokemonIndex = 10249;
      }
      if(pokemonName.includes("aqua") & pokemonName.includes("tauros")) {
        pokemonIndex = 10250;
      }
      if(pokemonName.includes("blaze") & pokemonName.includes("tauros")) {
        pokemonIndex = 10251;
      }
      if(pokemonName == "paldeanwooper") {
        pokemonIndex = 10252;
      }
    }

    //Checks individual forms
    if(pokemonName.includes("deoxys")) {
      if(pokemonName.includes("attack")) {
        pokemonIndex = 10000;
      }
      if(pokemonName.includes("defense")) {
        pokemonIndex = 10001;
      }
      if(pokemonName.includes("speed")) {
        pokemonIndex = 10002;
      }
    }

    if(pokemonName.includes("toxtricity") & pokemonName.includes("low")) {
      pokemonIndex = 10183;
    }

    if(pokemonName.includes("basculegion") & pokemonName.includes("f")) {
      pokemonIndex = 10247;
    }
  }
})();
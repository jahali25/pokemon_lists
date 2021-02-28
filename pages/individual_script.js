const convertName = function (s) {
  if (typeof(s) !== "string") {
    return "";
  }
  let temp = s.charAt(0).toUpperCase() + s.slice(1);
  let slashIndex = temp.search("-");
  while (slashIndex !== -1) {
    //temp.replace("-", "0");
    temp = temp.slice(0, slashIndex) + " " + temp.charAt(slashIndex + 1).toUpperCase() + temp.slice(slashIndex + 2);
    slashIndex = temp.search("-");
  }
  return temp;
}

const capitalize = (s) => {
  if (typeof s !== "string") {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
document.getElementById("searchButton").addEventListener("click", function (event) {
  event.preventDefault();
  let searchValue = document.getElementById("pokemonSearch").value;
  searchValue = searchValue.toLowerCase();
  const url = API_URL + searchValue;
  fetch(url)
  .then(function (response) {
    return response.json();
  }).then (function (json) {
    console.log(json);
    let name = json.name;
    let result = "<h2>Pokemon name: <div class='pokemonName'>" + convertName(name)
    result += "</div></h2>";
    let sprite = json.sprites.front_default;
    if (sprite != null) {
      result += "<img class ='sprites' src='" + sprite + "'/>";
    }
    result += "<h2>Type: " + capitalize(json.types[0].type.name);
    if (json.types.length > 1) { //No Pokemon should have more than two types
      result += " and " + capitalize(json.types[1].type.name);
    }

    result += "</h2><p>Abilities: "
    for (let i = 0; i < json.abilities.length; i++) {
      let abilityAttribute = json.abilities[i];
      result += convertName(abilityAttribute.ability.name);
      if (abilityAttribute.is_hidden) {
        result += " (hidden ability)";
      }
      if (i !== json.abilities.length - 1) {
        result += ", ";
      }
    }

    result += "<div class='bioStats'>";
    let height = json.height / 10;
    let weight = json.weight / 10;
    result += "<p>Weight: " + weight + " kilograms</p>";
    result += "<p>Height: " + height + " meters </p></div>";

    stats = json.stats;
    result += "<p>Base stats:</p>";
    result += "<div class='statsContainer'>";
    let givesEffort = "";
    let baseStatTotal = 0;
    for (let i = 0; i < 6; ++i) { //There should be exactly 6 stats
      result += "<div class='statItem'>" + convertName(stats[i].stat.name);
      result += ": " + stats[i].base_stat + "</div>";
      baseStatTotal += stats[i].base_stat;
      if (stats[i].effort > 0) {
        if (givesEffort !== "") {
          givesEffort += " and gives ";
        } else {
          givesEffort = "Gives ";
        }
        givesEffort += stats[i].effort + " " + convertName(stats[i].stat.name);
        givesEffort += " effort values (base points)";
      }
    }
    result += "</div><p>Base Stat total: " + baseStatTotal + "<p>";
    if (givesEffort !== "") {
      result += "<p>" + givesEffort + "</p>";
    }

    document.getElementById("pokemonInfo").innerHTML = result;
  }).catch(function (error) {
    message = "<p id='errorMessage'>Error, invalid pokemon API name or API index number.";
    message += "See the <a href='/index.html'>homepage</a> and type '0' into the start ";
    message += "index text box and type '-1' into the end index text box";
    message += "to get a list of all available pokemon API names and IDs.</p>";
    document.getElementById("pokemonInfo").innerHTML = message;
    console.log(error.message);
  });
});

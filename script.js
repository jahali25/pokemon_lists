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
const API_URL = "https://pokeapi.co/api/v2/";
document.getElementById("indexButton").addEventListener("click", function(event) {
  event.preventDefault();
  let startIndex = document.getElementById("startIndex").value;
  let endIndex = document.getElementById("endIndex").value;
  startIndex = parseInt(startIndex);
  endIndex = parseInt(endIndex);
  console.log(startIndex, endIndex);

  console.log("type of " + typeof(startIndex));
  let results = "";
  if (isNaN(startIndex) || isNaN(endIndex)) {
    results = "<p>Sorry, those index numbers are invalid."
    results += " They are not actually numbers.</p>";
    document.getElementById("pokemonList").innerHTML = results;
    return;
  } else if ( startIndex < 1 || endIndex < -1) {
    results = "<p>Sorry, those index numbers are invalid."
    results += "These numbers are too small.</p>";
    document.getElementById("pokemonList").innerHTML = results;
    return;
  } else if (startIndex > endIndex && endIndex != -1) {
    results = "<p>Sorry, those index numbers are invalid."
    results += "The start index is bigger than the end index.</p>";
    document.getElementById("pokemonList").innerHTML = results;
    return;
  }
  let limit = 0;
  if (endIndex === -1) {
    limit = 1500;
  } else {
    limit = endIndex - startIndex + 1;
  }
  const url = API_URL + "pokemon?limit=" + limit + "&offset=" + (startIndex - 1);
  fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      results += "<h2>Pokémon List</h2>";
      results += '<div id="pokemonGrid">';
      for (let i = 0; i < json.results.length; i++) {
        results += '<div class="pokemonListElem">';
        let tempName = json.results[i].name;
        results += "<p>Pokémon name: <div class = 'pokemonName'>" + convertName(tempName);
        results += "</div></p><p>API name: '" + tempName + "' API index number: ";
        results += String(i + startIndex) + "<p>";
        results += "</div>";
      }

      results += "</div>"
      document.getElementById("pokemonList").innerHTML = results;
    }).catch(function (error) {
      console.log("Error: " + error.message);
    });

});

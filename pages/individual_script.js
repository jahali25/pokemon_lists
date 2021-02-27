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
    let result = "<h2>Pokemon name: " + convertName(name) + "<h2>";

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

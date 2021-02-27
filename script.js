const API_URL = "https://pokeapi.co/api/v2/";
document.getElementById("indexButton").addEventListener("click", function(event) {
  event.preventDefault();
  let startIndex = document.getElementById("startIndex").value;
  let endIndex = document.getElementById("endIndex").value;
  startIndex = parseInt(startIndex);
  endIndex = parseInt(endIndex);
  console.log(startIndex, endIndex);

  console.log("type of " + typeof(startIndex));
  results = "";
  if (isNaN(startIndex) || isNaN(endIndex)) {
    results = "<p>Sorry, those index numbers are invalid."
    results += " They are not actually numbers.</p>";
    document.getElementById("pokemonList").innerHTML = results;
    return;
  } else if ( startIndex < 0 || endIndex < -1) {
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
  const url = API_URL + "pokemon?limit=" + limit + "&offset=" + startIndex;
  fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      
    }).catch(function (error) {
      console.log("Error: " + error.message);
    });

});

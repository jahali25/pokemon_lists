const capitalize = (s) => {
  if (typeof s !== "string") {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const JOKE_URL = "https://official-joke-api.appspot.com/random_joke";
document.getElementById("jokeButton").addEventListener("click", function (event) {
    event.preventDefault();
    fetch(JOKE_URL)
    .then(function (response) {
        return response.json();
    }).then(function(json) {
        //console.log(json);
        let result = "<p>Joke ID: " + json.id;
        result += "\tJoke type: " + capitalize(json.type) + "</p>";
        result += '<p class="jokeSetup">' + json.setup + "</p>";
        result += '<p class = "punchline">' + json.punchline + "</p>";
        document.getElementById("joke").innerHTML = result;
    }).catch(function(error) {
      console.log("Error: " + error.message);
    });
});
const MULTI_JOKE_URL = "https://official-joke-api.appspot.com/random_ten";
document.getElementById("multipleJokesButton").addEventListener("click", function (event) {
    event.preventDefault();
    fetch(MULTI_JOKE_URL)
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        let result = "<h2>Here is a list of jokes</h2>";
        result += "<div class='jokesList'>";
        for (let i = 0; i < json.length; ++i) {
            result += "<div class='jokeElem'>" + "<p>Joke ID: " + json[i].id;
            result += "\tJoke type: " + capitalize(json[i].type) + "</p>";
            result += '<p class="jokeSetup">' + json[i].setup + "</p>";
            result += '<p class = "punchline">' + json[i].punchline + "</p>";
            result += "</div>";
        }
        result += "</div>";
        document.getElementById("joke").innerHTML = result;
    }).catch(function(error) {
      console.log("Error: " + error.message);
    });
});

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var breweriesContainerEl = document.querySelector("#breweries-container");
var breweriesButtonEl = document.querySelector("#breweryButton");
M.AutoInit();
var el = document.querySelector('.collapsible');
var instance = M.Collapsible.init(el, {});



var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();
    if (city) {
        getBreweries(city);

    } else {
        //alert("Please enter a city");
    }
}

var getBreweries = function(city) {
    var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=25";

    // make request to url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
         if (response.ok) {
             response.json().then(function(data) {
                 displayBreweries(data);
            });
         } else {
             alert("Error: " + response.statusText)
         }
     })

     .catch(function(error) {
         alert("Unable to connect to Brewery list")
     })
};

var displayBreweries = function(city) {
    // check if api returned any breweries
    if (city.length === 0) {
        breweriesContainerEl.textContent = "No breweries in selected city";
        return;
    }
    
    // clear old content
    breweriesContainerEl.textContent = "";

    // loop over breweries
    for (var i = 0; i < city.length; i++) {
        var breweryName = city[i].name + " - " + city[i].street;
        var breweryUrl = city[i].website_url;

        // create unordered list
        var breweryUlEl =document.createElement("ul");
        breweryUlEl.classList = "collapsible collapsible-accordion active";

            // create list item 
            var breweryLiEl = document.createElement("ul");
            breweryLiEl.classList = "";
        
        
                //create div for each collapsible header for each brewery
                var breweryNameEl = document.createElement("button");
                breweryNameEl.textContent = breweryName;
                breweryNameEl.classList = "btn modal-trigger col s12";
                breweryNameEl.setAttribute("id", "breweryButton");
                breweryNameEl.setAttribute("data-target", "breweryFormModal")

                    //create collapsible div to hold brewery url
                    var breweryUrlEl = document.createElement("div");
                    breweryUrlEl.classList = "collapsible-body active";

                        // create span item for each URL
                        var breweryUrlText = document.createElement("span");
                        breweryUrlText.textContent = breweryUrl;

        //append span to div
        breweryUrlEl.appendChild(breweryUrlText);

        // append to div to list item
        breweryNameEl.appendChild(breweryUrlEl);

        //append  to the DOM
        breweryLiEl.appendChild(breweryNameEl);

        breweryUlEl.appendChild(breweryLiEl);

        breweriesContainerEl.appendChild(breweryUlEl);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });



// // modal was triggered
// $("breweryFormModal").on("show.bs.modal", function() {
//     // clear values
//     $("#modalBreweryUrl").val("");
// });

// // modal is displayed
// $("breweryFormModal").on("shown.bs.modal", function() {
//     $("modalBreweryUrl").trigger("focus");
// });


cityFormEl.addEventListener("submit", formSubmitHandler);
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var breweriesContainerEl = document.querySelector("#breweries-container");
var breweryFormModalEl = document.querySelector("#brewery-form-modal");
var breweriesButtonEl = document.querySelector("#breweryButton");
var modalTitleEl = document.querySelector("#modal-title");
var breweryInfoContainerEl = document.querySelector("#brewery-info-container");
M.AutoInit();

// set city variable from form submit
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
    var apiUrl = "https://api.openbrewerydb.org/breweries?by_state=oregon&by_city=" + city + "&per_page=15";

    // make request to url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
         if (response.ok) {
             response.json().then(function(data) {
                 displayBreweries(data);
                 console.log(data);
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
        var breweryName = city[i].name
        ;
        

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
                breweryNameEl.setAttribute("data-target", "brewery-form-modal")
                $(breweryNameEl).addClass("breweryModal");
                breweryNameEl.setAttribute("id", city[i].id);

        //append  to the DOM
        breweryLiEl.appendChild(breweryNameEl);

        breweryUlEl.appendChild(breweryLiEl);

        breweriesContainerEl.appendChild(breweryUlEl);
    }
    
    $(".breweryModal").click(breweryClick);
}

// initialize modal using materializ.js
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

// fetch api to get individual brewery data and input into modal
function breweryClick(brewery) {
    var breweryId = $(this).attr("id")
    console.log(breweryId)
    var apiUrl = "https://api.openbrewerydb.org/breweries/" + breweryId
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
         if (response.ok) {
            response.json().then(function(data) {
                displayBreweryInfo(data, brewery)
            });
         } else {
             alert("Error: " + response.statusText)
         }
     })
     .catch(function(error) {
         alert(error.text)
    })
}

var displayBreweryInfo = function(id) {

    // clear old content
    modalTitleEl.textContent = "";
    breweryInfoContainerEl.textContent = "";

    // set variables for brewery information from api
    var breweryNameModal = document.createElement("span")
    breweryNameModal.textContent = id.name;
    breweryNameModal.setAttribute("id", "breweryNameModal");
    console.log(breweryNameModal);

    var breweryType = document.createElement("li")
    breweryType.textContent = "Brewery Type: " + id.brewery_type;
    console.log(breweryType);

    var breweryStreet = document.createElement("li")
    breweryStreet = "Street: " + id.street;
    console.log(breweryStreet);

    var breweryPhone = document.createElement("li")
    breweryPhone.textContent = "Phone Number: " + id.phone;
    console.log(breweryPhone);

    var breweryUrl = document.createElement("li")
    breweryUrl.textContent = "Website: " + id.website_url;
    console.log(breweryUrl);

    // append brewery information to modal
    modalTitleEl.appendChild(breweryNameModal);
    breweryInfoContainerEl.appendChild(breweryType);
    breweryInfoContainerEl.appendChild(breweryPhone);
    breweryInfoContainerEl.appendChild(breweryUrl);
    //breweryInfoContainerEl.appendChild(breweryStreet);
}



// save button in modal was clicked
$("#brewery-form-modal .btn-primary").click(function() {
    // get values from modal
        var breweryNameSaved = document.getElementById("breweryNameModal").innerHTML;
        localStorage.setItem("savedBrewery", breweryNameSaved);
        console.log(breweryNameSaved);

    // if (breweryNameModal) {
    // saveBrewery(breweryNameSaved, "SavedBreweries")

    // // // close modal
    // // $("#brewery-form-modal").modal("hide");

    // saveBrewery(breweryNameSaved);
    // }
})
    
cityFormEl.addEventListener("submit", formSubmitHandler);

// var saveBrewery = function() {
//     localStorage.setItem("savedBreweries", JSON.stringify(saveBrewery));
//     console.log(saveBrewery)
// }

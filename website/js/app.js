/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=',
      // Personal API Key for OpenWeatherMap API
      apiKey = '&appid=071574112a1ba5218f3aa2e62c974d69',
      ZipCode = document.getElementById('zip'),
      Feelings = document.getElementById('feelings'),
      Generate = document.getElementById('generate'),
      myDate = document.getElementById('date'),
      myTemp = document.getElementById('temp'),
      myContent = document.getElementById('content');

// Create a new date instance dynamically with JS
let theDate = new Date();
let newDate = theDate.getMonth()+'.'+ theDate.getDate()+'.'+ theDate.getFullYear();

// Event Listeners
Generate.addEventListener('click', performAction);

function performAction() {
    if (ZipCode.value === "") {
        alert("Please Enter a ZipCode.");
    } else {
        retrieveData().then(function (data) {
            // Add data to Post request
            postData("/addData", { Date: newDate, Temerature: data.main.temp, Feeling: Feelings.value })
        }).then(() => updateUI())
    }
}

// Async GET
// Return Endpoint Data
const retrieveData = async () => {
    
    // Fatch route url and write request method
    const request = await fetch(baseURL + ZipCode.value + apiKey + "&units=metric");

    try {
        const Data = await request.json();
        return Data;
    }  catch(error) {
        // code to log error
        console.log("error", error); // appropriately handle the error
    }

}

// Async POST
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });

    try {
        const Data = await response.json();
        return Data;
    } catch(error) {
        console.log("error", error);
    }
}

// Return Endpoint Data
const updateUI = async () => {

    // Fetch data server.js Use url from GET route
    const request = await fetch('/sendData');
    
    try {
        const Data = await request.json();

        myDate.innerHTML = `<i class="far fa-calendar-alt fa-lg fa-fw"></i> Today's Date: ${Data.Date}`;
        myTemp.innerHTML = `<i class="fas fa-thermometer-half fa-lg fa-fw"></i> Temerature: ${Data.Temerature} <sup>o</sup>C`; ;
        myContent.innerHTML = `<i class="fas fa-comment fa-lg fa-fw"></i> Your Feeling: ${Data.Feeling}`;

    } catch(error) {
        // code to log error
        console.log("error", error);
    }
}
/* Global Variables */

// Create a new date instance dynamically with JS
const apiKey = 'f3daa6e08a75843cedf84e35532028eb&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
//async function to fetch weather data 
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}zip=${zip}&appid=${apiKey}`);
    try {
        const data = await res.json();
        console.log('data.main.temp is :' + data.main.temp);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}
// Async function to post data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
    .then(function(data){
        // Add data to POST request
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: feelings} )
        // Update UI
        updateUI()
    })
}
//async function to update UI 
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML = 'temperature :'+allData.temperature + ' °F';
      document.getElementById('content').innerHTML = 'feeling : '+allData.userResponse;
      document.getElementById('date').innerHTML = 'Date : ' + allData.date;
    }catch(error){
      console.log("error", error);
    }
}




var CLIENT_ID = 'ddbfcded-96dd-4b44-b6c6-1eb14c7ecec2';
var CLIENT_SECRET = 'NAjIu143fUmeMJ8arjIWselC4x5Lzy+rpA0vQfMO2pA=';
var payload = {
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'client_credentials',
  'scope': 'transportapi:all'
};

var request = new XMLHttpRequest();
request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);

request.addEventListener('load', function () {

  var response = JSON.parse(this.responseText);
  var token = response.access_token;
  window.token = token;
//   console.log('Response', response)
},);



request.setRequestHeader('Accept', 'application/json');
var formData = new FormData();

for (var key in payload) {
  formData.append(key, payload[key]);
}

request.send(formData);

 
setTimeout(function(){ 
    var token = window.token;

    var request = new XMLHttpRequest();
    request.addEventListener('load', function () {
    var response = JSON.parse(this.responseText);
    console.log('Response', response);
    });
    
    request.open('GET', 'https://platform.whereismytransport.com/api/lines?point=-33.92543,18.43644&limit=3', true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();
 }, 3000);

 setTimeout(function(){ 
    var token = window.token; // retrieved in previous request;

    var body = {
    geometry: {
        type: 'Multipoint',
        coordinates: [[18.395448, -33.909531], [18.416798, -33.912683]]
    }
    };
    
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
    var response = JSON.parse(this.responseText);
    console.log('Response', response.itineraries[0].legs[1].fare.cost);
    });


    request.open('POST', 'https://platform.whereismytransport.com/api/journeys', true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send(JSON.stringify(body));

 }, 3000);
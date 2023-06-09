// 为获取节假日、获取酒店和获取天气按钮添加事件监听器
document.getElementById("getHoliday").addEventListener("click", getHoliday);
document.getElementById("getHotels").addEventListener("click", getHotels);
document.getElementById("getWeather").addEventListener("click", getWeather);
// 获取节假日的函数
function getHoliday() {
  const year = document.getElementById("year").value;
  const countryCode = document.getElementById("country").value;
  const url = `https://public-holiday.p.rapidapi.com/${year}/${countryCode}`;
  const settings = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '84b4e004d4msh6eabc7a0120cf44p1d9ce3jsn5502a62f81e9',
      'x-rapidapi-host': 'public-holiday.p.rapidapi.com',
    },
    
  };
  // 发起API请求
  fetch(url, settings)
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
})
    .then(data => {
      console.log('API response:', data);
      const holidayList = document.getElementById("holidayList");
      holidayList.innerHTML = "Holiday List:<br>";
      data.forEach(holiday => {
        holidayList.innerHTML += `${holiday.date} - ${holiday.name}<br>`;
      });
    })
    .catch(error => console.error(error));
    fetch(url, settings)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => populateHolidays(data))
    .catch(error => console.error(error));
}
function populateHolidays(holidays) {
  var html = '';
  for (var i = 0; i < holidays.length; i++) {
      html += `<option value="${holidays[i].date}">${holidays[i].date} - ${holidays[i].name}</option>`;
  }
  document.getElementById('selectedHoliday').innerHTML = html;
}

function getHotelsAndWeather() {
  var selectedHoliday = document.getElementById('selectedHoliday').value;
  var city = document.getElementById('city').value;

  // Fetch weather
  getWeather(city);

  // Fetch hotels
  
  getHotels(city, selectedHoliday);

  getWeatherdata(city, selectedHoliday)
}
// 获取酒店的函数
function getHotels(city, selectedHoliday) {
    const url = `https://hotels4.p.rapidapi.com/locations/search?query=${city}&checkin_date=${selectedHoliday}&checkout_date=${selectedHoliday}&locale=en_US`;
    const settings = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bf20b74b90mshb7b0688b1eb9222p1e6e7bjsnc43014e44aaa',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        },
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            const hotelList = document.getElementById("hotelList");
            hotelList.innerHTML = "Hotel List:<br>";
            data.suggestions[1].entities.forEach(hotel => {
              hotelList.innerHTML += `${hotel.name}<br>`;
            });
          })
          .catch(error => console.error(error));
    }
    //获取天气
    function getWeather() {
      const city = document.getElementById("city").value;
      const apiKey = 'e5eb20914f993f76ee41d0eabe52ab75'; 
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              const weatherList = document.getElementById("weatherList");
              const description = data.weather[0].description;
              const temp = Math.round(data.main.temp * 100) / 100;
  
              weatherList.innerHTML = `Current Weather: ${description}<br>`;
              weatherList.innerHTML += `Current Temperature: ${temp} °C`;
          })
          .catch(error => console.error(error));
  }
  function getWeatherdata(city, selectedHoliday) {
    const lat = 35.6895; // Latitude of the city
    const lon = 139.6917; // Longitude of the city
    const dt = new Date(selectedHoliday).getTime() / 1000; // Convert the selected holiday to UNIX timestamp
    const apiKey = 'e5eb20914f993f76ee41d0eabe52ab75'; // Replace with your API key
  
    const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${apiKey}`;
  
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherList = document.getElementById("weatherList");
            const description = data.current.weather[0].description;
            const temp = Math.round(data.current.temp * 100) / 100;
  
            weatherList.innerHTML = `Weather on ${selectedHoliday}: ${description}<br>`;
            weatherList.innerHTML += `Temperature: ${temp} °C`;
        })
        .catch(error => console.error(error));
}

const loader = document.querySelector(".loader");
const message = document.querySelector(".message");
const weather = document.querySelector(".weather");

const form = document.querySelector('.form');
const login = form.querySelector('.login');
const password = form.querySelector('.password');
const formBtn = form.querySelector('.btn');

const PATH = "./src/data/";
const TYPE = ".json";

const API_KEY = "0afc75fa4ac846a202fbb86c66cc3f99";

document.addEventListener("DOMContentLoaded", (event) => {
  uploadWeather();
  loader.classList.add("loader_none");
  form.classList.remove("form_none");
});

const uploadWeather = () => {
  navigator.geolocation.getCurrentPosition(function (data) {
    const lat = data.coords.latitude;
    const lon = data.coords.longitude;

    let WEATHER_API =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY +
      "&units=metric";

    console.log(WEATHER_API);

    weatherRequest(WEATHER_API);
  });

}

const weatherRequest = (WEATHER_API) => {
  const request = new XMLHttpRequest();
  request.open("GET", WEATHER_API);
  request.send();
  request.onload = function () {
    const data = JSON.parse(request.response);
    weather.textContent = ‘Now in ${data.name} is ${data.weather[0].description}, ${Math.ceil(data.main.temp)} °C’;
  };
};

const uploadContent = () => {
  const request = new XMLHttpRequest();
  request.open("GET", PATH + "api" + TYPE);
  request.send();
  request.onload = function () {
    
    if (request.status === 404) {
      message.textContent = "Проблемы на сервере";
    } else {
      const data = JSON.parse(request.response);
      showMessage(data.status);
    }

    loader.classList.add("loader_none");
  };;
}

const showMessage = (status) => {
  if (status === "ok") {
    message.textContent = "Вы авторизованы";
    form.classList.add("form_none");
    return;
  };

  if (status === "error") {
    message.textContent = "Вы ввели неправильный пароль ";
    return;
  }
  
  
}

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  message.innerHTML = "";
  formBtn.setAttribute("disable", "disable");
  loader.classList.remove("loader_none");
  uploadContent();
})

password.addEventListener("change", () => {
  message.innerHTML = "";
})


const apiKey ="0166702c7fdc3da99584bb2404a6ece5"

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = " Please enter a city name.";
    return;
  }

  resultDiv.innerHTML = "Loading... ⏳";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data);
    
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"></p>
      <p><strong>${description}</strong></p>
      <p>🌡️ Temp: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬️ Wind Speed: ${speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = ` Error: ${error.message}`;
  }
}

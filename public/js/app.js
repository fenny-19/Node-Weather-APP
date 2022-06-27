console.log("Client side javascript is loaded!");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#msgOne");
const messageTwo = document.querySelector("#msgTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInput.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) messageOne.textContent = data.error;
        else {
          console.log(data);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    }
  );
});

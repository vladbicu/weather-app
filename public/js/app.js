const weatherForm = document.querySelector("form");
const search = document.querySelector("#address");
const messageOne = document.querySelector("#error");
const messageTwo = document.querySelector("#forecast");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
    .catch(err => console.log(err));
});

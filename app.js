const BASE_URl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateExchangeRate = async () => {
  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;
  let amount = document.querySelector(".amount input")
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1"
  }
  let response = await fetch(
    `${BASE_URl}/${fromCurr.toLowerCase()}/${toCurr.toLowerCase()}.json`
  );
  let data = await response.json();
  let rate = data[toCurr.toLowerCase()];
  msg.innerText = `${amountValue} ${fromCurr} = ${
    amountValue * rate
  } ${toCurr}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


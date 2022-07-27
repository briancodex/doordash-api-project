window.menuItems = 0;

const street = document.getElementById("street");
const city = document.getElementById("city");
const zipcode = document.getElementById("zipcode");
const fname = document.getElementById("name");
const lastname = document.getElementById("lastname");
const phonenumber = document.getElementById("phonenumber");

const clothingItems = document.getElementsByClassName("clothing");

const clothingTotal = document.getElementById("price");
const orderTotal = document.getElementById("total");

async function callFeeAPI({ target }) {
  if (target.className === "clothing" && target.checked) {
    window.menuItems += parseInt(target.value);
  } else if (target.className === "clothing" && !target.checked) {
    window.menuItems -= parseInt(target.value);
  }

  let response = await getFee();
  if (response) {
    window.responseFee = response.data.fee;

    orderTotal.textContent = `$${(
      (Number(window.menuItems) + response.data.fee) /
      100
    ).toFixed(2)}`;
    console.log("RESP TRUE", window.menuItems);
  } else {
    orderTotal.textContent = `$${(Number(window.menuItems) / 100).toFixed(2)}`;
    console.log("RESP FALSE", window.menuItems);
  }

  clothingTotal.textContent = `$${(window.menuItems / 100).toFixed(2)}`;
}

for (const clothing of clothingItems) {
  clothing.addEventListener("click", callFeeAPI);
}

street.addEventListener("focusout", callFeeAPI);
city.addEventListener("focusout", callFeeAPI);
zipcode.addEventListener("focusout", callFeeAPI);
fname.addEventListener("focusout", callFeeAPI);
lastname.addEventListener("focusout", callFeeAPI);
phonenumber.addEventListener("focusout", callFeeAPI);

// Button Animation
const orderBtn = document.getElementById("orderBtn");

orderBtn.addEventListener(
  "click",
  function () {
    orderBtn.innerHTML = "Placing your order";
    orderBtn.classList.add("spinning");

    setTimeout(function () {
      orderBtn.classList.remove("spinning");
      orderBtn.innerHTML = "Place Order";
    }, 1000);
  },
  false
);

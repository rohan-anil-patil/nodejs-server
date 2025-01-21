let servicesContainer = document.querySelector(".services-container");
let infostart = document.querySelector(".infostart");
let tableset = document.querySelector(".tableset");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let totalprice = document.querySelector("#totalprice");
let tableBody = document.querySelector("#tableBody");
let input1 = document.querySelector(".input1");
let alertparared = document.querySelector(".alertparared");
let alertparagreen = document.querySelector(".alertparagreen");

let sum = 0;
let i = 0;

async function getData() {
  let response = await fetch("./data.json");
  let data = await response.json();
  displayData(data);
}
document
  .getElementById("bookServiceButton")
  .addEventListener("click", function () {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
  });

btn4.addEventListener("click", () => {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };
  emailjs
    .send("service_o2vgyb5", "template_tg06tpb", parms)
    .then(alert("Email sent!!"));
});

function displayData(data) {
  data.forEach(({ emoji, service, price }) => {
    let numericPrice = parseFloat(price);

    if (isNaN(numericPrice)) {
      console.error(`Invalid price for service: ${service}`);
      return;
    }

    let priceDetail = document.createElement("div");
    priceDetail.classList.add("price-detail");
    priceDetail.innerHTML = `
      <p class="price-listing">
        <span class="emoji">${emoji}</span>
        <span class="service-name">${service} <i class="fa-solid fa-circle"></i></span>
        <span class="price">${price}</span>
      </p>`;

    let btn = document.createElement("div");
    btn.classList.add("price-btn");

    let addBtn = document.createElement("button");
    addBtn.classList.add("add-btn");
    addBtn.innerHTML = `Add item <i class="fa-solid fa-circle-plus"></i>`;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = `Remove item <i class="fa-solid fa-circle-minus"></i>`;
    removeBtn.style.display = "none";

    btn.appendChild(addBtn);
    btn.appendChild(removeBtn);
    priceDetail.appendChild(btn);
    servicesContainer.appendChild(priceDetail);

    addBtn.addEventListener("click", () => {
      addBtn.style.display = "none";
      removeBtn.style.display = "block";
      infostart.style.display = "none";
      tableset.style.height = "70%";

      let row = document.createElement("tr");
      row.dataset.serviceName = service;
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${service}</td>
        <td>${price}</td>`;
      i++;
      tableBody.appendChild(row);

      sum += numericPrice;
      totalprice.innerHTML = "₹" + sum.toFixed(2);

      if (sum > 0) {
        btn3.style.backgroundColor = "#683aff";
      }
    });

    btn3.addEventListener("click", () => {
      if (sum > 0 && input1.value != 0) {
        alertparagreen.innerHTML = `<p class="green">
              <i class="fa-solid fa-circle-info"></i> Thank you for contacting, we will get back to you soon
            </p>`;
      }
      if (sum <= 0) {
        alertparared.innerHTML = `
            <i class="fa-solid fa-circle-info"></i> Add the item to the cart to book
          `;
      }
    });

    removeBtn.addEventListener("click", () => {
      addBtn.style.display = "block";
      removeBtn.style.display = "none";

      let rowToRemove = tableBody.querySelector(
        `tr[data-service-name="${service}"]`
      );
      if (rowToRemove) {
        tableBody.removeChild(rowToRemove);
        sum -= numericPrice;
        totalprice.innerHTML = sum > 0 ? "₹" + sum.toFixed(2) : "₹0.00";
      }

      const rows = tableBody.querySelectorAll("tr");
      rows.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
      });

      if (rows.length === 0) {
        infostart.style.display = "flex";
        tableset.style.height = "10%";
      }
    });
  });
}

btn3.addEventListener("click", () => {
  let parms = {
    namebook: document.getElementById("namebook").value,
    emailbook: document.getElementById("emailbook").value,
    totalprice: sum,
  };
  emailjs.send("service_o2vgyb5", "template_vtb24yw", parms);
});

getData();

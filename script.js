// Get the modal
const modal = document.getElementById("myModal");
const updateModal = document.getElementById("myUpdateModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let closeUpdate = document.getElementsByClassName("close")[1];

// Get inputs from DOM
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");

const updateDateInput = document.getElementById("update-date");
const updateTypeInput = document.getElementById("update-type");
const updateAmountInput = document.getElementById("update-amount");
const updateSenderInput = document.getElementById("update-sender");
const updateReceiverInput = document.getElementById("update-receiver");

const form = document.querySelector("form");

const table = document.querySelector("table");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
closeUpdate.onclick = function () {
  updateModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == updateModal) {
    modal.style.display = "none";
    updateModal.style.display = "none";
  }
};

// initializing values
let date, type, amount, sender, receiver;
let selectedIndex;

// Adding onChange listener to inputs
dateInput.addEventListener("change", (e) => {
  date = e.target.value;
});

typeInput.addEventListener("change", (e) => {
  type = e.target.value;
});

amountInput.addEventListener("change", (e) => {
  amount = e.target.value;
});

senderInput.addEventListener("change", (e) => {
  sender = e.target.value;
});

receiverInput.addEventListener("change", (e) => {
  receiver = e.target.value;
});

updateDateInput.addEventListener("change", (e) => {
  date = e.target.value;
});

updateTypeInput.addEventListener("change", (e) => {
  type = e.target.value;
});

updateAmountInput.addEventListener("change", (e) => {
  amount = e.target.value;
});

updateSenderInput.addEventListener("change", (e) => {
  sender = e.target.value;
});

updateReceiverInput.addEventListener("change", (e) => {
  receiver = e.target.value;
});

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const transaction = { date, type, amount, sender, receiver };
  transactions.push(transaction);
  form.reset();
  addTable();
});

const addTable = () => {
  table.innerHTML = `
    <tr><th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>
        `;
  let balance = 0;
  transactions.forEach((tr, index) => {
    const tableRow = document.createElement("tr");
    balance += Number(tr.amount);
    tr.balance = balance;
    const data = Object.values(tr);
    data.forEach((e) => {
      const tableData = document.createElement("td");
      const textNode = document.createTextNode(e);
      tableData.appendChild(textNode);

      tableRow.appendChild(tableData);
    });
    const actions = `<td>
        <i id="edit-${index}" class="fa-solid fa-pen-to-square"></i>
        <i id="delete-${index}" class="fa-sharp fa-solid fa-trash"></i>
      </td>`;
    tableRow.insertAdjacentHTML("beforeend", actions);
    table.appendChild(tableRow);
    let updateBtn = document.querySelector(`#edit-${index}`);
    let deleteBtn = document.querySelector(`#delete-${index}`);
    deleteBtn.addEventListener("click", () => handleDelete(index));
    updateBtn.addEventListener("click", () => handleUpdate(index));
  });
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const handleDelete = (index) => {
  transactions = transactions.filter((e, i) => i !== index);
  addTable();
};

const handleUpdate = (index) => {
  console.log({ index });
  selectedIndex = index;
  updateModal.style.display = "block";
  let transaction = transactions[index];
  const updateHeading = document.getElementById("updateHeading");

  //Presetting the value of selected transaction
  updateHeading.innerText = `Update ${transaction.date} Transaction`;
  updateDateInput.value = transaction.date;
  updateTypeInput.value = transaction.type;
  updateAmountInput.value = transaction.amount;
  updateSenderInput.value = transaction.sender;
  updateReceiverInput.value = transaction.receiver;

  // Submitting the form
  const updateForm = document.getElementById("update-form");
  updateForm.addEventListener("submit", submitUpdateForm);
};

const submitUpdateForm = (e) => {
  e.preventDefault();
  transaction = {
    date: updateDateInput.value,
    type: updateTypeInput.value,
    amount: updateAmountInput.value,
    sender: updateSenderInput.value,
    receiver: updateReceiverInput.value,
  };
  transactions[selectedIndex] = transaction;

  addTable();
  updateModal.style.display = "none";
};

addTable();

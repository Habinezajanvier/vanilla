// Get inputs from DOM
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");

const form = document.querySelector("form");

const table = document.querySelector("table");

let transactions = [];

// initializing values
let date, type, amount, sender, receiver;

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const transaction = { date, type, amount, sender, receiver };
  transactions.push(transaction);
  form.reset();
  console.log({ transactions });
  addTable();
});

const addTable = () => {
  table.innerHTML = `
    <tr><th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Action</th>
        </tr>
        `;
  transactions.forEach((tr) => {
    const tableRow = document.createElement("tr");
    const data = Object.values(tr);
    data.forEach((e) => {
      const tableData = document.createElement("td");
      const textNode = document.createTextNode(e);
      tableData.appendChild(textNode);
      tableRow.appendChild(tableData);
    });
    table.appendChild(tableRow);
  });
};

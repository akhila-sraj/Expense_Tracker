const income = document.getElementById("income");
const food = document.getElementById("food");
const rent = document.getElementById("rent");
const others = document.getElementById("others");

const totalIncome = document.getElementById("total-income");
const totalExpenses = document.getElementById("total-expenses");
const savings = document.getElementById("savings");

const save = document.getElementById("save");
const reset = document.getElementById("reset");
const dark = document.getElementById("dark");
const addExpense = document.getElementById("add-expense");
const extraBox = document.getElementById("extra-expenses");
const list = document.getElementById("expense-list");

let chart;

// add custom expense
addExpense.onclick = () => {
  const row = document.createElement("div");
  row.className = "extra";
  row.innerHTML = `
    <input type="text" placeholder="Expense name">
    <input type="number" placeholder="Amount">
  `;
  extraBox.appendChild(row);
};

// calculate
save.onclick = () => {
  let labels = [];
  let values = [];

  const base = [
    ["Food", +food.value],
    ["Rent", +rent.value],
    ["Others", +others.value]
  ];

  base.forEach(e => {
    if (e[1] > 0) {
      labels.push(e[0]);
      values.push(e[1]);
    }
  });

  document.querySelectorAll(".extra").forEach(row => {
    const name = row.children[0].value.trim();
    const val = +row.children[1].value || 0;

    if (name && val > 0) {
      labels.push(name);
      values.push(val);
    }
  });

  const expenseTotal = values.reduce((a, b) => a + b, 0);
  const saveAmt = (+income.value || 0) - expenseTotal;

  totalIncome.textContent = income.value || 0;
  totalExpenses.textContent = expenseTotal;
  savings.textContent = saveAmt;
  savings.className = saveAmt < 0 ? "negative" : "positive";


  list.innerHTML = "";

  if (chart) chart.destroy();

  chart = new Chart(expenseChart, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values
      }]
    }
  });
};


// reset
reset.onclick = () => {
  document.querySelectorAll("input").forEach(i => i.value = "");
  extraBox.innerHTML = "";
  list.innerHTML = "";
  totalIncome.textContent = 0;
  totalExpenses.textContent = 0;
  savings.textContent = 0;
  savings.className = "";
  if (chart){ chart.destroy();
    chart=null;}
};

// dark mode
dark.onclick = () => {
  document.body.classList.toggle("dark");
  dark.textContent =
    document.body.classList.contains("dark")
      ? "Light Mode"
      : "Dark Mode";
};

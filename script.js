
let totalBudget = 20000;

let expenses = [
    {
        name: "Food",
        amount: 5000
    }
];

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");

function updateDashboard() {
    let totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    let remainingBalance = totalBudget - totalExpenses;

    document.getElementById("totalBudget").textContent =
        "KSh " + totalBudget.toFixed(2);

    document.getElementById("totalExpenses").textContent =
        "KSh " + totalExpenses.toFixed(2);

    document.getElementById("remainingBalance").textContent =
        "KSh " + remainingBalance.toFixed(2);

    const message = document.getElementById("budgetMessage");

    if (remainingBalance < 0) {
        message.textContent = "Warning! You have exceeded your budget.";
        message.style.color = "red";
    } else if (remainingBalance === 0) {
        message.textContent = "You have used your entire budget.";
        message.style.color = "orange";
    } else {
        message.textContent = "Great! You are within your budget.";
        message.style.color = "green";
    }

    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
        const listItem = document.createElement("li");

        listItem.textContent =
            expense.name + " - KSh " + expense.amount.toFixed(2);

        expenseList.appendChild(listItem);
    });
}

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    expenseForm.reset();

    updateDashboard();
});

updateDashboard();

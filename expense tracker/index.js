// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    let obj = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        catagory: event.target.catagory.value,
    };

    let objString = JSON.stringify(obj);

    localStorage.setItem(obj.description, objString);

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('catagory').value = '';

    addExpenseToList(obj);
}

// Function to add an expense to the list
function addExpenseToList(obj) {
    const li = document.createElement('li');
    li.textContent = `${obj.amount} - ${obj.description} - ${obj.catagory}`;

    const userList = document.querySelector('ul');
    userList.appendChild(li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Expense";
    deleteButton.onclick = function () {
        localStorage.removeItem(obj.description);
        userList.removeChild(li);
    };
    li.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = "Edit Expense";
    editButton.onclick = function () {
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.description;
        document.getElementById('catagory').value = obj.catagory;
        localStorage.removeItem(obj.description);
        userList.removeChild(li);
    };
    li.appendChild(editButton);
}

// Function to load all expenses from localStorage on page load
function loadExpenses() {
    const userList = document.querySelector('ul');
    userList.innerHTML = ''; // Clear the list in case it has any pre-existing data

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const objString = localStorage.getItem(key);
        const obj = JSON.parse(objString);

        addExpenseToList(obj);
    }
}

// Call loadExpenses when the page loads
document.addEventListener('DOMContentLoaded', loadExpenses);

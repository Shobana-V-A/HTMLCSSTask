let entries = JSON.parse(localStorage.getItem("entries")) || [];
let editId = null;


const form = document.getElementById("entryForm");
const entryList = document.getElementById("entryList");


form.addEventListener("submit", addOrUpdateEntry);
document.getElementById("resetBtn").addEventListener("click", resetForm);
document.querySelectorAll("input[name='filter']").forEach(radio => {
    radio.addEventListener("change", renderEntries);
});
function addOrUpdateEntry(e) {
    e.preventDefault();


    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.querySelector("input[name='type']:checked").value;


    if (editId) {
        const entry = entries.find(e => e.id === editId);
        entry.description = description;
        entry.amount = amount;
        entry.type = type;
        editId = null;
    } else {
        entries.push({
            id: Date.now(),
            description,
            amount,
            type
        });
    }


    saveAndRender();
    resetForm();
}


function renderEntries() {
    const filter = document.querySelector("input[name='filter']:checked").value;
    entryList.innerHTML = "";
    let filtered = entries;
    if (filter !== "all") {
        filtered = entries.filter(e => e.type === filter);
    }


    filtered.forEach(entry => {
        const li = document.createElement("li");
        li.className = `entry ${entry.type}`;
        li.innerHTML = `
<span>${entry.description} - ₹${entry.amount}</span>
<div>
<button onclick="editEntry(${entry.id})">Edit</button>
<button onclick="deleteEntry(${entry.id})">Delete</button>
</div>
`;
        entryList.appendChild(li);
    });
    updateSummary();
}


function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    document.querySelector(`input[name='type'][value='${entry.type}']`).checked = true;
    editId = id;
}


function deleteEntry(id) {
    entries = entries.filter(e => e.id !== id);
    saveAndRender();
}
function updateSummary() {
    const income = entries.filter(e => e.type === "income").reduce((a, b) => a + b.amount, 0);
    const expense = entries.filter(e => e.type === "expense").reduce((a, b) => a + b.amount, 0);


    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalExpense").textContent = expense;
    document.getElementById("balance").textContent = income - expense;
}


function resetForm() {
    form.reset();
    editId = null;
}


function saveAndRender() {
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
}


renderEntries();
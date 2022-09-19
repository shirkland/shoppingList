let itemInput = document.getElementById("item");
let quantityInput = document.getElementById("quantity");
let logButton = document.getElementById("logButton");

class listItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
}

let submitItem = () => {
    let newItem = new listItem(itemInput.value, quantityInput.value);
    itemInput.value = "";
    quantityInput.value = "";
    fetch("http://localhost:3000/add-need", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
        },
    }).then(setTimeout(populateTable, 2000));
};

logButton.addEventListener("click", submitItem);
window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitItem();
    }
});
let populateTable = async () => {
    table.innerHTML = "";
    const response = await fetch("http://localhost:3000/get-needs");
    const readableResponse = await response.json();
    readableResponse.forEach((rowData, index) => {
        if (index === 0) {
            table.appendChild(headerMaker(rowData));
        }
        table.appendChild(rowMaker(rowData));
    });
};

window.addEventListener("load", populateTable);

const rowMaker = (rowData) => {
    let newRow = document.createElement("tr");
    let values = Object.entries(rowData);

    values.forEach((value) => {
        let newCell = document.createElement("td");
        newCell.innerText = value[1];
        newRow.appendChild(newCell);
    });
    return newRow;
};

const headerMaker = (headerData) => {
    let newHeaderRow = document.createElement("tr");
    let titles = Object.entries(headerData);
    titles.forEach((title) => {
        let newHeader = document.createElement("th");
        newHeader.innerText = title[0];
        newHeaderRow.appendChild(newHeader);
    });
    return newHeaderRow;
};

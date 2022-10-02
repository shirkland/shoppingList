let itemInput = document.getElementById("item");
let logButton = document.getElementById("logButton");

class listItem {
    constructor(item) {
        this.item = item;
    }
}

let submitItem = () => {
    let newItem = new listItem(itemInput.value);
    if (newItem.item == "") {
        alert("you need to add an item");
        return;
    }
    itemInput.value = "";
    fetch("/add-need", {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json",
        },
    }).then(setTimeout(populateTable, 200));
};

logButton.addEventListener("click", submitItem);
window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitItem();
    }
});
let populateTable = async () => {
    table.innerHTML = "";
    const response = await fetch("/get-needs");
    const readableResponse = await response.json();
    readableResponse.forEach((rowData, index) => {
        if (index === 0) {
            table.appendChild(headerMaker(rowData));
        }
        table.appendChild(rowMaker(rowData));
    });
};

window.addEventListener("load", populateTable);

const deleteHandler = (event) => {
    fetch(`/delete-row/${event.target.parentNode.id}`, {
        method: "DELETE",
    }).then(setTimeout(populateTable, 200));
};

const rowMaker = (rowData) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", rowData.id);
    newRow.addEventListener("dblclick", deleteHandler);
    let values = Object.entries(rowData);
    console.log(values);
    values.forEach((value) => {
        if (value[0] != "id") {
            let newCell = document.createElement("td");
            newCell.innerText = value[1];
            newRow.appendChild(newCell);
        }
    });
    return newRow;
};

const headerMaker = (headerData) => {
    let newHeaderRow = document.createElement("tr");
    let titles = Object.entries(headerData);
    titles.forEach((title) => {
        if (title[0] != "id") {
            let newHeader = document.createElement("th");
            newHeader.innerText = title[0];
            newHeaderRow.appendChild(newHeader);
        }
    });
    return newHeaderRow;
};

const myorder = document.getElementById("myorder");
const content = document.querySelector(".content");
const master = document.querySelector(".master");

myorder.addEventListener("click", function () {
  master.style.display = "flex";
  content.style.display = "none";
  getOrders();
});

document.querySelector(".trashButn").addEventListener("click", function () {
  master.style.display = "none";
  content.style.display = "flex";
});

const grpord = document.getElementById("groupord");
const grpform = document.querySelector(".grp-order");
grpord.addEventListener("click", function () {
  grpform.style.display = "flex";
  content.style.display = "none";
});
document.querySelector(".grp-cancel").addEventListener("click", function () {
  grpform.style.display = "none";
  content.style.display = "flex";
});

function showOrders(data) {
  const table = document.querySelector(".text > table");

  table.innerHTML = " ";

  const heading = document.createElement("tr");
  ["Phone","Order Name","Material Image", "Dress Type", "Color","Dress Count","Requested Time"].forEach(
    (title) => {
      const th = document.createElement("th");
      th.append(title);
      heading.append(th);
    }
  );
  table.append(heading);

  for (let i = 0; i < data[0].length; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.append(data[i][0]);
    const atag = document.createElement("a");
    atag.append("view/image");
    atag.setAttribute("href", data[i][4]);
    atag.setAttribute("target", "_blank");
    atag.style.backgroundColor = "orange";
    atag.style.padding = "5px";
    atag.style.borderRadius = ".3rem";
    td2.append(atag);
    td3.append(data[i][1]);
    td4.append(data[i][2]);
    td5.append(data[i][3]);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    table.append(tr);
  }
}

async function getOrders() {
  try {
    const req = await fetch(`/getorders`);
    const data = await req.json();
    showOrders(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const tbok_btn = document.querySelector(".tableok-btn");
const formtable = document.querySelector(".grpformtable");
document.getElementById("count").addEventListener("input", function () {
  formtable.style.display = "block";
  const count = parseInt(document.getElementById("count").value);
  const table = document.querySelector(".grpformtable > table");
  table.innerHTML = " ";

  const opt = ["s", "m", "l", "xs", "xl", "xxl", "xxxl"];
  for (let i = 0; i < count; i++) {
    const row = document.createElement("tr");
    if (i === 0) {
      const heading = document.createElement("tr");
      ["Customer Name", "Size"].forEach((title) => {
        const th = document.createElement("th");
        th.append(title);
        heading.append(th);
      });
      table.append(heading);
    }
    const nameCell = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.setAttribute("name", "userList");
    nameInput.type = "text";
    nameCell.appendChild(nameInput);

    const sizeCell = document.createElement("td");
    const sizeSelect = document.createElement("select");
    sizeSelect.setAttribute("name", "userSize");
    for (let j = 0; j < 7; j++) {
      const option = document.createElement("option");
      option.value = opt[j];
      option.text = opt[j];
      sizeSelect.appendChild(option);
    }
    sizeCell.appendChild(sizeSelect);

    row.appendChild(nameCell);
    row.appendChild(sizeCell);

    table.appendChild(row);
  }
});

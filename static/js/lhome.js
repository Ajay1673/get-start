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
  ["Phone","Order Name","Material Image", "Dress Type", "Model Image", "Description", "Color","Dress Count","Requested Time","users","Order Status"].forEach(
    (title) => {
      const th = document.createElement("th");
      th.append(title);
      heading.append(th);
    }
  );
  table.append(heading);
  console.log("HI")
  data.forEach(item=>{
    console.log(item)
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");
    const td8 = document.createElement("td");
    const td9 = document.createElement("td");
    const td10 = document.createElement("td");
    const td11 = document.createElement("td");
    



    td1.append(item.phone);
    const atag = document.createElement("a");
    atag.append("view/image");
    atag.setAttribute("href", "/static/public/"+item.image);
    atag.setAttribute("target", "_blank");
    atag.style.backgroundColor = "orange";
    atag.style.padding = "5px";
    atag.style.borderRadius = ".3rem";
    td2.append(atag);
    td3.append(item.orderName);
    td4.append(item.dressType);
    const btag = document.createElement("a");
    btag.append("view/image");
    btag.setAttribute("href", "/static/public/"+item.modimage);
    btag.setAttribute("target", "_blank");
    btag.style.backgroundColor = "orange";
    btag.style.padding = "5px";
    btag.style.borderRadius = ".3rem";
    td5.append(btag);
    td6.append(item.description);
    td7.append(item.color);
    td8.append(item.count);
    td9.append(item.date);
    td10.insertAdjacentHTML("afterbegin",item.users.map(data=>{
        return `<div style="margin: .2rem .3rem; width: 7rem; font-size: 0.8rem;">${data[1]} ${data[2]}</div>`
    }).join(""));
    td11.append(item.order_status);


    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    tr.append(td8);
    tr.append(td9);
    tr.append(td10);    
    tr.append(td11);

    table.append(tr);
  })


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

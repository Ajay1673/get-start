const profile = document.querySelector(".profile");
const order = document.querySelector(".order");
const customer = document.querySelector(".customer");
const material = document.querySelector(".material");
const order_page = document.querySelector(".order-page");
const prof_page = document.querySelector(".profile-page");
const cus_page = document.querySelector(".customer-page");
const material_page = document.querySelector(".material-page");
const prof_view = document.querySelector(".prof-view");
const prof_create = document.querySelector(".prof-create");
const prof_edit = document.getElementById("edit-prof");
const change_pass = document.querySelector(".change-pass-page");

function edit_page() {
  prof_view.style.display = "none";
  prof_edit.style.display = "flex";
}

function pass_page() {
  prof_view.style.display = "none";
  prof_edit.style.display = "none";
  change_pass.style.display = "flex";
}

function edit_cancel() {
  prof_edit.style.display = "none";
  prof_view.style.display = "block";
}

function pass_cancel() {
  change_pass.style.display = "none";
  prof_view.style.display = "block";
}

profile.addEventListener("click", function () {
  prof_page.style.display = "flex";
  prof_view.style.display = "block";
  prof_edit.style.display = "none";
  change_pass.style.display = "none";
  order_page.style.display = "none";
  cus_page.style.display = "none";
  material_page.style.display = "none";
});

order.addEventListener("click", function () {
  prof_page.style.display = "none";
  order_page.style.display = "flex";
  getallOrders();
  cus_page.style.display = "none";
  material_page.style.display = "none";
});

customer.addEventListener("click", function () {
  prof_page.style.display = "none";
  order_page.style.display = "none";
  cus_page.style.display = "flex";
  getCustomers();
  material_page.style.display = "none";
});

material.addEventListener("click", function () {
  prof_page.style.display = "none";
  order_page.style.display = "none";
  cus_page.style.display = "none";
  material_page.style.display = "flex";
});

function showCustomers(data) {
  console.log("hello");
  const table = document.querySelector(".customer-table > table");

  table.innerHTML = " ";

  const heading = document.createElement("tr");
  ["Name", "Phone", "Email", "Address"].forEach((title) => {
    const th = document.createElement("th");
    th.append(title);
    heading.append(th);
  });
  table.append(heading);
  console.log("HI");
  data.forEach((item) => {
    console.log(item);
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td1.append(item.name);
    td2.append(item.phone);
    td3.append(item.email);
    td4.append(item.address);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    table.append(tr);
  });
}

async function getCustomers() {
  const req = await fetch(`/getcustomers`);
  const data = await req.json();
  showCustomers(data);
  console.log(data);
}

async function updateStatus(uid,msg){
  try
  {
    await fetch("/updatestatus",{
      method:"post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({uid,msg})
    })
    console.log("success")
  }
  catch (error){
    console.log("error",error)
  }

}

function showOrders(data) {
  const table = document.querySelector(".order-table > table");

  table.innerHTML = " ";

  const heading = document.createElement("tr");
  [
    "Phone",
    "Order Name",
    "Material Image",
    "Dress Type",
    "Model Image",
    "Description",
    "Color",
    "Dress Count",
    "Requested Time",
    "users",
    "order status",
  ].forEach((title) => {
    const th = document.createElement("th");
    th.append(title);
    heading.append(th);
  });
  table.append(heading);
  console.log("HI");
  let index  = 1
  data.forEach((item) => {
    console.log(item);
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
    const t11 = document.createElement("td");

    t11.classList.add("status-field");

    const butn1 = document.createElement("input");
    butn1.addEventListener("click",()=>{
      updateStatus(item.uid,"Completed")
    })
    const butn2 = document.createElement("input");
    butn2.addEventListener("click",()=>{
      updateStatus(item.uid,"Delayed")
    })
    const label1 = document.createElement("label");
    const label2 = document.createElement("label");
    label1.append("Completed");
    label2.append("Delayed");
    butn1.setAttribute("type", "radio");
    butn2.setAttribute("type", "radio");
    butn1.classList.add("status-butn");
    butn2.classList.add("status-butn");
    const indexId = index++;
    butn1.setAttribute(`name`, `butn-status-name${indexId}`);
    butn2.setAttribute(`name`, `butn-status-name${indexId}`);

    butn1.setAttribute("value", "Completed");
    butn1.setAttribute("value", "Delayed");

    t11.append(butn1);
    t11.append(label1);

    t11.append(butn2);
    t11.append(label2);

    td1.append(item.phone);
    const atag = document.createElement("a");
    atag.append("view/image");
    atag.setAttribute("href", "/static/public/" + item.image);
    atag.setAttribute("target", "_blank");
    atag.style.backgroundColor = "orange";
    atag.style.padding = "5px";
    atag.style.borderRadius = ".3rem";
    td2.append(atag);
    td3.append(item.orderName);
    td4.append(item.dressType);
    const btag = document.createElement("a");
    btag.append("view/image");
    btag.setAttribute("href", "/static/public/" + item.modimage);
    btag.setAttribute("target", "_blank");
    btag.style.backgroundColor = "orange";
    btag.style.padding = "5px";
    btag.style.borderRadius = ".3rem";
    td5.append(btag);
    td6.append(item.description);
    td7.append(item.color);
    td8.append(item.count);
    td9.append(item.date);
    td10.insertAdjacentHTML(
      "afterbegin",
      item.users
        .map((data) => {
          return `<div style="margin: .2rem .3rem; width: 7rem; font-size: 0.8rem;">${data[1]} ${data[2]}</div>`;
        })
        .join("")
    );

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
    tr.append(t11);
    table.append(tr);
  });
}

async function getallOrders() {
  try {
    const req = await fetch(`/getallorders`);
    const data = await req.json();
    showOrders(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

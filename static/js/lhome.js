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

const bookord = document.getElementById("bookord");
const book = document.querySelector(".book");
bookord.addEventListener("click", function () {
  book.style.display = "flex";
  content.style.display = "none";
});

document.querySelector(".cancel-btn").addEventListener("click", function () {
  book.style.display = "none";
  content.style.display = "flex";
});

const uuid = () => document.getElementsByName("uid")[0].value;

/*
<table>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><a href="#">FeedbackForm</a></td>
              <td><button type="submit" id="edit-btn">Edit</button>
              <button type="submit" id="del-btn">Delete</button>
            </td>
            </tr>
          </table>

*/

function showOrders(data) {
  const table = document.querySelector(".text > table");

  // table.innerHTML = " "

  const heading = document.createElement("tr");
    [
      "Material",
      "Model Image",
      "Color",
      "Size",
      "Requested Time"
    ].forEach((title) => {
      const th = document.createElement("th");
      th.append(title);
      heading.append(th);
    });
  table.append(heading);

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.append(data[i][0]);
    const atag = document.createElement("a")
    atag.append("view/image")
    atag.setAttribute("href",data[i][4])
    atag.setAttribute("target","_blank")
    atag.style.backgroundColor = "orange"
    atag.style.padding = "5px"
    atag.style.borderRadius = ".3rem"
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
  // try {
  const req = await fetch(`/getorders?uid=${uuid()}`);
  const data = await req.json();
  showOrders(data);
  console.log(data);
  // } catch (error) {
  // console.log(error);
  // }
}

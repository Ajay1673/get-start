const profile = document.querySelector(".profile");
const order = document.querySelector(".order")
const customer = document.querySelector(".customer")
const material = document.querySelector(".material")
const order_page = document.querySelector(".order-page");
const prof_page = document.querySelector(".profile-page");
const cus_page = document.querySelector(".customer-page");
const material_page = document.querySelector(".material-page");
const prof_view = document.querySelector(".prof-view");
const prof_create = document.querySelector(".prof-create");
const prof_edit = document.getElementById("edit-prof");
const change_pass = document.querySelector(".change-pass-page");


function edit_page(){
    prof_view.style.display = "none";
    prof_edit.style.display = "flex";
}

function pass_page(){
    prof_view.style.display = "none";
    prof_edit.style.display = "none";
    change_pass.style.display = "flex"; 
}

function edit_cancel(){
    prof_edit.style.display = "none";
    prof_view.style.display = "block";
}

function pass_cancel(){
    change_pass.style.display = "none";
    prof_view.style.display = "block";
}

profile.addEventListener("click",function(){
    prof_page.style.display = "flex";
    prof_view.style.display = "block";
    prof_edit.style.display = "none"
    change_pass.style.display = "none";
    order_page.style.display = "none";
    cus_page.style.display = "none";
    material_page.style.display = "none";
   
})

order.addEventListener("click",function(){
    prof_page.style.display = "none";
    order_page.style.display = "flex";
    cus_page.style.display = "none";
    material_page.style.display = "none";
})

customer.addEventListener("click",function(){
    prof_page.style.display = "none";
    order_page.style.display = "none";
    cus_page.style.display = "flex";
    material_page.style.display = "none";
})

material.addEventListener("click",function(){
    prof_page.style.display = "none";
    order_page.style.display = "none";
    cus_page.style.display = "none";
    material_page.style.display = "flex";
})


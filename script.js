// Language toggle
let currentLang = "ar";

function toggleLang(){
let elements = document.querySelectorAll("[data-ar]");
let html = document.documentElement;
let btn = document.querySelector(".lang-btn");

if(currentLang === "ar"){
elements.forEach(el => el.textContent = el.getAttribute("data-en"));
html.setAttribute("dir","ltr");
btn.textContent = "AR";
currentLang = "en";
}else{
elements.forEach(el => el.textContent = el.getAttribute("data-ar"));
html.setAttribute("dir","rtl");
btn.textContent = "EN";
currentLang = "ar";
}
}

// WhatsApp Form
document.getElementById("whatsappForm")?.addEventListener("submit", function(e){
e.preventDefault();

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let country = document.getElementById("country").value;

let message = `طلب استقدام جديد:
الاسم: ${name}
الجوال: ${phone}
الدولة: ${country}`;

let url = "https://wa.me/966543281015?text=" + encodeURIComponent(message);
window.open(url,"_blank");
});

document.getElementById("whatsappForm").addEventListener("submit", function(e){
e.preventDefault();

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let workerType = document.getElementById("workerType").value;
let country = document.getElementById("country").value;

let message = `طلب استقدام جديد:
الاسم: ${name}
الجوال: ${phone}
نوع العمالة: ${workerType}
الدولة: ${country}`;

let url = "https://wa.me/966543281015?text=" + encodeURIComponent(message);
window.open(url, "_blank");
});

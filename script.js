// Example interactivity for search 
document.querySelector(".search-bar").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Searching properties...");
});
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name,e || !email || !message) {
        alert("Please fill out all required fields before sending.");
        return false;
    }
    alert("Message sent succesfully");
    return true;
}
fetch("http://localhost:5000/api/properties")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // You can display these on your Properties page
    });
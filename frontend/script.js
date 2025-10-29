// === CONFIGURATION ===
const backendURL = "https://nagodhomes-backend-5.onrender.com"; // 🔁 Replace with your actual Render backend link

// === DISPLAY PROPERTIES ===
async function fetchProperties() {
  try {
    const response = await fetch(`${backendURL}/api/properties`);
    const data = await response.json();

    const propertyList = document.getElementById("property-list");
    if (!propertyList) return;

    propertyList.innerHTML = "";

    if (data.length === 0) {
      propertyList.innerHTML = "<p>No properties available at the moment.</p>";
      return;
    }

    data.forEach((property) => {
      const card = document.createElement("div");
      card.className = "property-card";
      card.innerHTML = `
        <img src="${property.image || 'default.jpg'}" alt="Property Image">
        <h3>${property.title}</h3>
        <p>${property.description}</p>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Location:</strong> ${property.location}</p>
      `;
      propertyList.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    document.getElementById("property-list").innerHTML =
      "<p>Failed to load properties. Please try again later.</p>";
  }
}

// === CONTACT FORM SUBMISSION ===
async function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${backendURL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    } else {
      alert(result.message || "Failed to send message.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Network error. Please try again later.");
  }
}

// === ADD PROPERTY FORM ===
async function handleAddProperty(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value.trim();
  const location = document.getElementById("location").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !description || !price || !location) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const response = await fetch(`${backendURL}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, price, location, image }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Property added successfully!");
      document.getElementById("add-property-form").reset();
      fetchProperties(); // Refresh property list
    } else {
      alert(result.message || "Failed to add property.");
    }
  } catch (error) {
    console.error("Error adding property:", error);
    alert("Network error. Please try again later.");
  }
}

// === EVENT LISTENERS ===
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("property-list")) fetchProperties();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) contactForm.addEventListener("submit", handleContactForm);

  const addPropertyForm = document.getElementById("add-property-form");
  if (addPropertyForm)
    addPropertyForm.addEventListener("submit", handleAddProperty);
});

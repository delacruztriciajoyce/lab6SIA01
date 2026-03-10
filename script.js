const tableBody = document.getElementById('tableBody');
const modal = document.getElementById('productModal');
const modalDetails = document.getElementById('modalDetails');
const closeBtn = document.querySelector('.close-button');

// Fetch data from FakeStoreAPI
async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        renderTable(products);
    } catch (error) {
        console.error("Error fetching data:", error);
        tableBody.innerHTML = "<tr><td colspan='5'>Failed to load data.</td></tr>";
    }
}

// Generate the HTML table rows
function renderTable(products) {
    tableBody.innerHTML = ""; // Clear loader
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" width="40"></td>
            <td><strong>${product.title}</strong></td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
        `;
        
        // Event listener for clicking a row
        row.addEventListener('click', () => showPopup(product));
        tableBody.appendChild(row);
    });
}

// Show the detailed popup
function showPopup(product) {
    modalDetails.innerHTML = `
        <h2>${product.title}</h2>
        <p><em>Category: ${product.category}</em></p>
        <img src="${product.image}" alt="${product.title}">
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
    `;
    modal.style.display = "block";
}

// Close Modal logic
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

// Initialize
getProducts();
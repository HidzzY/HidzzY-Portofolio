const productListContainer = document.getElementById('product-list-container');
const searchBar = document.getElementById('search-bar');
const categoryFilter = document.getElementById('category-filter');
const orderModal = document.getElementById('order-modal');
const closeModalButton = document.querySelector('.close-button');
const modalProductName = document.getElementById('modal-product-name');
const modalProductPrice = document.getElementById('modal-product-price');
const orderForm = document.getElementById('order-form');
const clientNameInput = document.getElementById('client-name');
const paymentMethodSelect = document.getElementById('payment-method');

let selectedProduct = null; 

// --- Fungsi untuk render produk ---
function renderProducts(productsToRender) {
    productListContainer.innerHTML = ''; 
    if (productsToRender.length === 0) {
        productListContainer.innerHTML = '<p style="text-align: center; padding: 50px;">Tidak ada produk yang ditemukan.</p>';
        return;
    }

    const productGrid = document.createElement('div');
    productGrid.id = 'product-list';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>${product.price}</strong></p>
        `;
        productCard.addEventListener('click', () => openOrderModal(product));
        productGrid.appendChild(productCard);
    });
    productListContainer.appendChild(productGrid);
}

// --- Fungsi untuk memuat kategori unik ---
function loadCategories() {
    const categories = new Set(products.map(p => p.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// --- Fungsi untuk memfilter dan mencari produk ---
function filterAndSearchProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    renderProducts(filteredProducts);
}

// --- Fungsi Modal ---
function openOrderModal(product) {
    selectedProduct = product;
    modalProductName.textContent = product.name;
    modalProductPrice.textContent = product.price;
    orderModal.classList.add('active');
    clientNameInput.value = '';
    paymentMethodSelect.value = '';
}

function closeOrderModal() {
    orderModal.classList.remove('active');
    selectedProduct = null;
}

// --- Event Listeners ---
searchBar.addEventListener('keyup', filterAndSearchProducts);
categoryFilter.addEventListener('change', filterAndSearchProducts);
closeModalButton.addEventListener('click', closeOrderModal);
orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeOrderModal();
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = clientNameInput.value.trim();
    const paymentMethod = paymentMethodSelect.value;

    if (!clientName || !paymentMethod) {
        alert('Harap lengkapi semua kolom pemesanan.');
        return;
    }

    if (selectedProduct) {
        // Menggunakan Username Telegram Anda: hidzex3c
        const tgUsername = "hidzex3c"; 
        const message = `Halo Wahid, saya ingin memesan!%0A%0A*Nama:* ${clientName}%0A*Produk:* ${selectedProduct.name}%0A*Harga:* ${selectedProduct.price}%0A*Metode:* ${paymentMethod}`;
        const tgUrl = `https://t.me/${tgUsername}?text=${message}`;

        window.open(tgUrl, '_blank');
        alert('Pesanan Anda sedang diproses! Harap kirimkan pesan yang terbuka di Telegram.');
        closeOrderModal();
    }
});

// --- Inisialisasi ---
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    renderProducts(products); 
});

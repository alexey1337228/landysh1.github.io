const products = [
{
    name: "Ніжність",
    price: 1299,
    img: "https://img.freepik.com/free-photo/beautiful-flower-bouquet_23-2151940194.jpg"
},
{
    name: "Пудровий ранок",
    price: 1499,
    img: "https://images.unsplash.com/photo-1615050461998-b2e2c93d98f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Кремова хмара",
    price: 1399,
    img: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Рожева симфонія",
    price: 1599,
    img: "https://images.unsplash.com/photo-1644248422980-8e0eb75a1557?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Легкість",
    price: 1199,
    img: "https://images.unsplash.com/photo-1652346064068-1ae0d97502c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 📦 КАТАЛОГ
if (document.getElementById("products")) {
    const container = document.getElementById("products");

    products.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.img}">
            <div class="card-content">
                <h3>${p.name}</h3>
                <p>${p.price} грн</p>
                <button onclick="addToCart(${index})">Купити</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// ➕ ДОДАТИ
function addToCart(index) {
    const product = products[index];
    const existing = cart.find(i => i.name === product.name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({...product, qty: 1});
    }

    saveAndRender();
}

// 🔄 ЗБЕРЕГТИ + ОНОВИТИ UI
function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// 🛒 ВІДОБРАЖЕННЯ КОШИКА
function renderCart() {
    const container = document.getElementById("cartItems");
    if (!container) return;

    container.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        sum += itemTotal;

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.price} грн</p>

                <div>
                    <button onclick="decrease(${index})">−</button>
                    <span> ${item.qty} </span>
                    <button onclick="increase(${index})">+</button>
                </div>

                <p>Сума: ${itemTotal} грн</p>
                <button onclick="removeItem(${index})">Видалити</button>
            </div>
        `;

        container.appendChild(div);
    });

    document.getElementById("total").innerText = "Загальна сума: " + sum + " грн";
}

// ➕ ➖ КІЛЬКІСТЬ
function increase(index) {
    cart[index].qty++;
    saveAndRender();
}

function decrease(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveAndRender();
}

// ❌ ВИДАЛЕННЯ
function removeItem(index) {
    cart.splice(index, 1);
    saveAndRender();
}

// 🔥 запуск
renderCart();

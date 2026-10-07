document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartCounter = document.getElementById("cart-count");
    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            if (cartCounter) cartCounter.textContent = cartCount;
            const message = document.getElementById("catalog-message");
            if (message) message.textContent = "✓ Producto agregado al carrito (demostración).";
        });
    });

    const terms = document.getElementById("terminos");
    const registerButton = document.getElementById("registro-btn");
    const registerForm = document.getElementById("registro-form");
    const registerMessage = document.getElementById("registro-mensaje");
    if (terms && registerButton) {
        terms.addEventListener("change", () => { registerButton.disabled = !terms.checked; });
    }
    if (registerForm) {
        registerForm.addEventListener("submit", event => {
            event.preventDefault();
            const fields = [
                document.getElementById("nombre"), document.getElementById("email"),
                document.getElementById("password"), document.getElementById("fecha"),
                document.getElementById("telefono")
            ];
            if (fields.some(field => field.value.trim() === "")) {
                registerMessage.textContent = "Completa todos los campos antes de enviar."; return;
            }
            const email = document.getElementById("email");
            if (!email.checkValidity()) {
                registerMessage.textContent = "Ingresa un correo electrónico válido."; return;
            }
            if (!terms.checked) {
                registerMessage.textContent = "Debes aceptar los términos."; return;
            }
            registerMessage.textContent = "✓ Registro enviado correctamente (demostración).";
        });
    }

    const quantities = document.querySelectorAll(".quantity");
    const totalElement = document.getElementById("cart-total");
    const prices = [299, 55, 59];
    function updateTotal() {
        if (!totalElement) return;
        let total = 0;
        quantities.forEach((input, index) => {
            let quantity = Number(input.value);
            if (quantity < 0 || Number.isNaN(quantity)) { quantity = 0; input.value = 0; }
            total += quantity * prices[index];
        });
        totalElement.textContent = "$" + total.toFixed(2);
    }
    quantities.forEach(input => input.addEventListener("input", updateTotal));
    if (totalElement) updateTotal();

    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    const results = document.getElementById("search-results");
    if (searchForm) {
        searchForm.addEventListener("submit", event => {
            event.preventDefault();
            const term = searchInput.value.trim();
            if (term === "") {
                results.innerHTML = "<p>Escribe algo en el campo de búsqueda.</p>";
                return;
            }
            results.innerHTML = `<h2>Resultados para la búsqueda de ${escapeHTML(term)}</h2><ul><li>ESP32 DevKit — $189.00</li><li>Sensor Ultrasónico — $59.00</li><li>Protoboard 830 puntos — $85.00</li></ul>`;
        });
    }

    const verMasButton = document.getElementById("ver-mas-btn");
    const infoNosotros = document.getElementById("info-nosotros");

    if (verMasButton && infoNosotros) {
        verMasButton.addEventListener("click", () => {
            const isHidden = infoNosotros.classList.contains("hidden-info");

            if (isHidden) {
                infoNosotros.classList.remove("hidden-info");
                verMasButton.textContent = "Ver menos";
            } else {
                infoNosotros.classList.add("hidden-info");
                verMasButton.textContent = "Ver más";
            }
        });
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});
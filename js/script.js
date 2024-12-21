// Función para cards y modales.
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.getElementsByClassName("close")[0];
    const cartModal = document.getElementById("cart-modal");
    const closeCartModal = document.getElementsByClassName("close-cart")[0];
    const cartCountElement = document.getElementById("cart-count");
    const cartItemsElement = document.getElementById("cart-items").querySelector('tbody');
    const totalPriceElement = document.getElementById("total-price");

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Actualizar contador y lista del carrito
    function updateCartUI() {
        cartCountElement.innerText = cart.length;
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="update-quantity" data-index="${index}" style="width: 50px; text-align: center; border-radius: 5px; padding: 5px;">
                </td>
                <td>$${item.price}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-item" data-index="${index}" style="background-color: #FF5733; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Eliminar</button>
                </td>
            `;
            cartItemsElement.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = totalPrice.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Mostrar modal del carrito
    cartCountElement.addEventListener('click', function () {
        cartModal.style.display = "block";
        updateCartUI();
    });

    // Cerrar modal del carrito
    closeCartModal.onclick = function () {
        cartModal.style.display = "none";
    };

    // Actualizar cantidad
    cartItemsElement.addEventListener('input', function (e) {
        if (e.target.classList.contains('update-quantity')) {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                updateCartUI();
            }
        }
    });

    // Eliminar producto
    cartItemsElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartUI();
        }
    });

    // Añadir producto al carrito
    document.querySelectorAll('.cart-link').forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const products = [
                { name: 'Rutina superávit calorico + dieta', price: 34000 },
                { name: 'Recomposición corporal', price: 29000 },
                { name: 'Recetario déficit', price: 18000 }
            ];
            const product = products[index];
            const existingProduct = cart.find(item => item.name === product.name);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
        });
    });

    // Cerrar modal click afuera
    window.onclick = function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        } else if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Mostrar detalles en modal
    document.querySelectorAll('.ver-detalles').forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            switch (index) {
                case 0:
                    modalTitle.innerText = 'Rutina superávit calorico + dieta';
                    modalDescription.innerText = 'Esta rutina te ayudará a ganar masa muscular y reducir adiposidad general. Generalmente suele ser de 4 semanas, y se va renovando dependiendo del objetivo específico. La rutina y la dieta van en dos documentos PDF, separados y se envían una semana luego de su compra. Objetivos: Aumento de masa muscular, mejora de la fuerza general. Combinación de pesas y ejercicios de calistenia.';
                    break;
                case 1:
                    modalTitle.innerText = 'Recomposición corporal';
                    modalDescription.innerText = 'Este tipo de rutina se centra en la ganancia de masa muscular mientras se pierde grasa. Es esencial para aquella persona que no ha realizado ejercicio previamente y se quiere adentrar en el mundo del ejercicio. La rutina se envía por correo electrónico, en formato PDF, a la semana de realizar la compra. Perfil ideal: Principiantes/Personas con vida relativamente sedentaria. Objetivos: Mejora del estado físico y mayor energía durante el día.';
                    break;
                case 2:
                    modalTitle.innerText = 'Recetario déficit';
                    modalDescription.innerText = 'Plan de alimentación orientado a la pérdida de grasa manteniendo un déficit calórico. La rutina se envía por correo electrónico, en formato PDF, una semana después de haber realizado la compra. Duración: Varía según la persona y sus objetivos. Se recomienda seguirlo minimamente en un período de dos meses.';
                    break;
            }
            modal.style.display = "block";
        });
    });

    // Cerrar modal de detalles
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Inicializar la UI del carrito
    updateCartUI();
});


// Estilos para sección FAQS
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const heading = item.querySelector('h3');
        
        heading.addEventListener('click', () => {
            // Cerrar los items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle para el item que este seleccionado
            item.classList.toggle('active');
        });
    });
});


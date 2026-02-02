<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const router = useRouter();
const { cart, getCartTotal, clearCart } = useCart();

// Form data
const formData = ref({
  email: '',
  firstName: '',
  lastName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  country: 'CO'
});

const isProcessing = ref(false);

onMounted(() => {
  // Redirect si el carrito está vacío
  if (cart.value.length === 0) {
    router.push('/cart');
    return;
  }

  // Track begin_checkout
  clearEcommerce();
  trackEvent({
    event: EVENTS.BEGIN_CHECKOUT,
    ecommerce: {
      currency: 'USD',
      value: getCartTotal(),
      items: cart.value.map((course, index) => formatCourseItem(course, index))
    }
  });
});

const handleSubmit = async () => {
  // Validación básica
  if (!formData.value.email || !formData.value.firstName || !formData.value.lastName) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  isProcessing.value = true;

  // Track add_payment_info
  clearEcommerce();
  trackEvent({
    event: EVENTS.ADD_PAYMENT_INFO,
    ecommerce: {
      currency: 'USD',
      value: getCartTotal(),
      payment_type: 'Credit Card',
      items: cart.value.map((course, index) => formatCourseItem(course, index))
    }
  });

  // Simular procesamiento de pago
  setTimeout(() => {
    // Generar transaction ID único
    const transactionId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    // Track purchase
    clearEcommerce();
    trackEvent({
      event: EVENTS.PURCHASE,
      ecommerce: {
        transaction_id: transactionId,
        currency: 'USD',
        value: getCartTotal(),
        tax: 0,
        shipping: 0,
        items: cart.value.map((course, index) => formatCourseItem(course, index))
      }
    });

    // Guardar en localStorage para la página de éxito
    localStorage.setItem('lastPurchase', JSON.stringify({
      transactionId,
      items: cart.value,
      total: getCartTotal(),
      date: new Date().toISOString()
    }));

    // Limpiar carrito y redirigir
    clearCart();
    router.push('/checkout/success');
  }, 2000);
};
</script>

<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Finalizar Compra</h1>

      <div class="checkout-grid">
        <!-- Checkout Form -->
        <div class="checkout-form">
          <form @submit.prevent="handleSubmit">
            <!-- Contact Information -->
            <section class="form-section">
              <h2 class="section-title">📧 Información de Contacto</h2>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  class="form-input"
                />
              </div>
            </section>

            <!-- Billing Information -->
            <section class="form-section">
              <h2 class="section-title">💳 Información de Pago</h2>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Nombre *</label>
                  <input
                    id="firstName"
                    v-model="formData.firstName"
                    type="text"
                    required
                    placeholder="Juan"
                    class="form-input"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName">Apellido *</label>
                  <input
                    id="lastName"
                    v-model="formData.lastName"
                    type="text"
                    required
                    placeholder="Pérez"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="cardNumber">Número de Tarjeta</label>
                <input
                  id="cardNumber"
                  v-model="formData.cardNumber"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  maxlength="19"
                  class="form-input"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="expiryDate">Fecha de Expiración</label>
                  <input
                    id="expiryDate"
                    v-model="formData.expiryDate"
                    type="text"
                    placeholder="MM/AA"
                    maxlength="5"
                    class="form-input"
                  />
                </div>
                
                <div class="form-group">
                  <label for="cvv">CVV</label>
                  <input
                    id="cvv"
                    v-model="formData.cvv"
                    type="text"
                    placeholder="123"
                    maxlength="4"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="country">País</label>
                <select id="country" v-model="formData.country" class="form-input">
                  <option value="CO">Colombia</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="ES">España</option>
                  <option value="US">Estados Unidos</option>
                </select>
              </div>
            </section>

            <button
              type="submit"
              :disabled="isProcessing"
              class="btn btn-primary btn-block btn-lg"
            >
              <span v-if="!isProcessing">Completar Compra - ${{ getCartTotal().toFixed(2) }}</span>
              <span v-else>Procesando...</span>
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h2 class="summary-title">Resumen del Pedido</h2>
            
            <div class="summary-items">
              <div v-for="course in cart" :key="course.id" class="summary-item">
                <img :src="course.image" :alt="course.name" class="summary-item-image" />
                <div class="summary-item-details">
                  <h4>{{ course.name }}</h4>
                  <p>${{ course.price }}</p>
                </div>
              </div>
            </div>

            <div class="summary-totals">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>${{ getCartTotal().toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Impuestos:</span>
                <span>$0.00</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>${{ getCartTotal().toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="security-badges">
            <p class="security-text">🔒 Pago 100% seguro y encriptado</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  padding: 3rem 0;
  background: var(--gray-50);
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 2rem;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.checkout-form {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.order-summary {
  position: sticky;
  top: 1rem;
}

.summary-card {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.summary-items {
  margin-bottom: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.summary-item-details h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.summary-item-details p {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-600);
}

.summary-totals {
  padding-top: 1rem;
  border-top: 2px solid var(--gray-200);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: var(--gray-700);
}

.summary-row.total {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gray-900);
  padding-top: 1rem;
  border-top: 2px solid var(--gray-300);
}

.security-badges {
  text-align: center;
  padding: 1rem;
}

.security-text {
  color: var(--gray-600);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 968px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

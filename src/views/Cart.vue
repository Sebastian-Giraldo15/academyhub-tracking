<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const router = useRouter();
const { cart, removeFromCart, getCartTotal } = useCart();

onMounted(() => {
  // Track view_cart
  if (cart.value.length > 0) {
    clearEcommerce();
    trackEvent({
      event: EVENTS.VIEW_CART,
      ecommerce: {
        currency: 'USD',
        value: getCartTotal(),
        items: cart.value.map((course, index) => formatCourseItem(course, index))
      }
    });
  }
});

const handleRemove = (courseId) => {
  removeFromCart(courseId);
};

const handleCheckout = () => {
  router.push('/checkout');
};

const continueShopping = () => {
  router.push('/courses');
};
</script>

<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Carrito de Compras</h1>

      <!-- Cart con items -->
      <div v-if="cart && cart.length > 0" class="cart-content">
        <div class="cart-items">
          <div v-for="course in cart" :key="course.id" class="cart-item">
            <img :src="course.image" :alt="course.name" class="item-image" />
            
            <div class="item-details">
              <h3 class="item-title">{{ course.name }}</h3>
              <p class="item-instructor">Por {{ course.instructor }}</p>
              <div class="item-meta">
                <span class="rating">⭐ {{ course.rating }}</span>
                <span class="duration">⏱️ {{ course.duration }}</span>
                <span class="level">📚 {{ course.level }}</span>
              </div>
            </div>
            
            <div class="item-actions">
              <div class="item-price">${{ course.price }}</div>
              <button @click="handleRemove(course.id)" class="btn-remove">
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h2 class="summary-title">Resumen del Pedido</h2>
            
            <div class="summary-details">
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
            
            <button @click="handleCheckout" class="btn btn-primary btn-block btn-lg">
              Proceder al Pago
            </button>
            
            <button @click="continueShopping" class="btn btn-outline btn-block">
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>

      <!-- Empty cart -->
      <div v-else class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2 class="empty-title">Tu carrito está vacío</h2>
        <p class="empty-description">
          Parece que aún no has agregado ningún curso al carrito
        </p>
        <button @click="continueShopping" class="btn btn-primary btn-lg">
          Explorar Cursos
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 3rem 0;
  min-height: 60vh;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
}

.item-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item-details {
  flex: 1;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.item-instructor {
  color: var(--gray-600);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.item-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
}

.btn-remove {
  background: none;
  border: none;
  color: var(--gray-600);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
  transition: color 0.2s;
}

.btn-remove:hover {
  color: var(--primary-600);
}

.cart-summary {
  position: sticky;
  top: 1rem;
}

.summary-card {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.summary-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.summary-details {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-700);
}

.summary-row.total {
  border-bottom: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--gray-900);
  padding-top: 1rem;
  border-top: 2px solid var(--gray-300);
}

.summary-card .btn {
  margin-bottom: 0.75rem;
}

.summary-card .btn:last-child {
  margin-bottom: 0;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.empty-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-rows: auto auto;
  }
  
  .item-image {
    width: 100px;
    height: 70px;
  }
  
  .item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  
  .cart-summary {
    position: static;
  }
}
</style>

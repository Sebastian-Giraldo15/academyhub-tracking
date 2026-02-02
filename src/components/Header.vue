<script setup>
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

const router = useRouter();
const { getItemCount } = useCart();

const goToCart = () => {
  router.push('/cart');
};
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          🎓 AcademyHub
        </RouterLink>
        
        <nav>
          <ul>
            <li><RouterLink to="/">Inicio</RouterLink></li>
            <li><RouterLink to="/courses">Cursos</RouterLink></li>
            <li><RouterLink to="/login">Ingresar</RouterLink></li>
            <li>
              <button @click="goToCart" class="cart-button">
                🛒 Carrito
                <span v-if="getItemCount > 0" class="cart-badge">{{ getItemCount }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-600);
  text-decoration: none;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover,
nav a.router-link-active {
  color: var(--primary-600);
}

.cart-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-700);
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.2s;
}

.cart-button:hover {
  color: var(--primary-600);
}

.cart-badge {
  background: var(--primary-600);
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  margin-left: 0.25rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  nav ul {
    gap: 1rem;
    font-size: 0.9rem;
  }
  
  .logo {
    font-size: 1.2rem;
  }
}
</style>

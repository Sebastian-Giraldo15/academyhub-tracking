<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const purchase = ref(null);

onMounted(() => {
  // Recuperar información de la compra
  const lastPurchase = localStorage.getItem('lastPurchase');
  
  if (!lastPurchase) {
    router.push('/');
    return;
  }

  purchase.value = JSON.parse(lastPurchase);
  
  // Limpiar después de mostrar
  setTimeout(() => {
    localStorage.removeItem('lastPurchase');
  }, 1000);
});

const goToHome = () => {
  router.push('/');
};

const goToCourses = () => {
  router.push('/courses');
};
</script>

<template>
  <div class="success-page">
    <div class="container">
      <div class="success-content">
        <!-- Success Icon -->
        <div class="success-icon">✅</div>
        
        <h1 class="success-title">¡Compra Exitosa!</h1>
        
        <p class="success-message">
          Gracias por tu compra. Hemos enviado un correo de confirmación a tu email.
        </p>

        <!-- Order Details -->
        <div v-if="purchase" class="order-details">
          <div class="detail-card">
            <h2 class="detail-title">Detalles del Pedido</h2>
            
            <div class="detail-row">
              <span class="detail-label">Número de Orden:</span>
              <span class="detail-value">{{ purchase.transactionId }}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Fecha:</span>
              <span class="detail-value">{{ new Date(purchase.date).toLocaleDateString('es-ES') }}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Total:</span>
              <span class="detail-value total">${{ purchase.total.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Purchased Courses -->
          <div class="purchased-courses">
            <h3 class="courses-title">Cursos Adquiridos</h3>
            
            <div class="courses-list">
              <div v-for="course in purchase.items" :key="course.id" class="course-item">
                <img :src="course.image" :alt="course.name" class="course-image" />
                <div class="course-info">
                  <h4>{{ course.name }}</h4>
                  <p>{{ course.instructor }}</p>
                </div>
                <div class="course-price">${{ course.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="next-steps">
          <h3 class="steps-title">📝 Próximos Pasos</h3>
          <ul class="steps-list">
            <li>Revisa tu email para la confirmación de compra</li>
            <li>Accede a tus cursos desde tu cuenta</li>
            <li>Comienza a aprender a tu propio ritmo</li>
            <li>Obtén tu certificado al completar cada curso</li>
          </ul>
        </div>

        <!-- CTA Buttons -->
        <div class="cta-buttons">
          <button @click="goToCourses" class="btn btn-primary btn-lg">
            Explorar Más Cursos
          </button>
          <button @click="goToHome" class="btn btn-outline btn-lg">
            Volver al Inicio
          </button>
        </div>

        <!-- Support Info -->
        <div class="support-info">
          <p>¿Necesitas ayuda? Contáctanos en <a href="mailto:support@academyhub.com">support@academyhub.com</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-page {
  padding: 3rem 0;
  min-height: 70vh;
}

.success-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.order-details {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: left;
}

.detail-card {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--gray-200);
}

.detail-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: var(--gray-600);
  font-weight: 500;
}

.detail-value {
  color: var(--gray-900);
  font-weight: 600;
}

.detail-value.total {
  color: var(--primary-600);
  font-size: 1.25rem;
}

.purchased-courses {
  margin-bottom: 2rem;
}

.courses-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 0.5rem;
}

.course-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.course-info {
  flex: 1;
  text-align: left;
}

.course-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.course-info p {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.course-price {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-600);
}

.next-steps {
  background: var(--primary-50);
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
}

.steps-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.steps-list {
  list-style: none;
  padding: 0;
}

.steps-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--gray-700);
}

.steps-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-600);
  font-weight: bold;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.support-info {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.support-info a {
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 600;
}

.support-info a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .success-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .course-item {
    flex-direction: column;
    text-align: center;
  }
  
  .course-info {
    text-align: center;
  }
}
</style>

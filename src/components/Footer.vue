<script setup>
import { ref } from 'vue';
import { trackEvent } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const email = ref('');
const showSuccess = ref(false);

const handleSubmit = () => {
  if (!email.value) return;
  
  // Track lead generation
  trackEvent({
    event: EVENTS.GENERATE_LEAD,
    currency: 'USD',
    value: 5,
    lead_type: 'newsletter'
  });
  
  showSuccess.value = true;
  email.value = '';
  
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🎓 AcademyHub</h3>
          <p>La mejor plataforma de cursos online para impulsar tu carrera profesional.</p>
        </div>
        
        <div class="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><RouterLink to="/courses">Cursos</RouterLink></li>
            <li><RouterLink to="/signup">Registrarse</RouterLink></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Newsletter</h4>
          <p style="margin-bottom: 1rem;">Recibe las mejores ofertas y cursos nuevos.</p>
          <form @submit.prevent="handleSubmit" class="newsletter-form">
            <input 
              v-model="email"
              type="email" 
              placeholder="Tu email" 
              required
            />
            <button type="submit" class="btn btn-primary">
              Suscribirse
            </button>
          </form>
          <div v-if="showSuccess" class="alert alert-success" style="margin-top: 1rem;">
            ¡Gracias por suscribirte!
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 AcademyHub. Todos los derechos reservados. | Proyecto de práctica - Tracking Avanzado</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--gray-900);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: var(--gray-300);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: white;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 0.75rem 1.5rem;
  white-space: nowrap;
}

.footer-bottom {
  border-top: 1px solid var(--gray-700);
  padding-top: 2rem;
  text-align: center;
  color: var(--gray-400);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
}
</style>

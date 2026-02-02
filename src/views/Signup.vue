<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { trackEvent } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const router = useRouter();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const handleSubmit = () => {
  // Validación básica
  if (!formData.value.firstName || !formData.value.lastName || !formData.value.email || !formData.value.password) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Track sign_up (sin información sensible)
  trackEvent({
    event: EVENTS.SIGN_UP,
    method: 'email'
  });

  // Simular registro exitoso
  alert('Registro exitoso! (Demo)');
  router.push('/');
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="signup-page">
    <div class="container">
      <div class="signup-card">
        <div class="signup-header">
          <h1 class="signup-title">Crear Cuenta</h1>
          <p class="signup-subtitle">Únete a nuestra comunidad de aprendizaje</p>
        </div>

        <form @submit.prevent="handleSubmit" class="signup-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Nombre</label>
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
              <label for="lastName">Apellido</label>
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
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="tu@email.com"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              placeholder="••••••••"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              class="form-input"
            />
          </div>

          <div class="terms-checkbox">
            <label class="checkbox-label">
              <input type="checkbox" required />
              <span>Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a></span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg">
            Crear Cuenta
          </button>
        </form>

        <div class="divider">
          <span>O regístrate con</span>
        </div>

        <div class="social-buttons">
          <button class="btn btn-outline btn-block social-btn">
            <span>🔵</span> Google
          </button>
          <button class="btn btn-outline btn-block social-btn">
            <span>📘</span> Facebook
          </button>
        </div>

        <div class="login-prompt">
          <p>¿Ya tienes una cuenta? <a @click="goToLogin" class="login-link">Inicia Sesión</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  padding: 3rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.signup-card {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}

.signup-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.signup-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.terms-checkbox {
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--gray-700);
  line-height: 1.5;
}

.checkbox-label input {
  margin-top: 0.25rem;
  cursor: pointer;
}

.checkbox-label a {
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 500;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: var(--gray-300);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-prompt {
  text-align: center;
  color: var(--gray-600);
  font-size: 0.875rem;
}

.login-link {
  color: var(--primary-600);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .signup-card {
    padding: 2rem;
  }
  
  .signup-title {
    font-size: 1.75rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

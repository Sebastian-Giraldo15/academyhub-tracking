<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { trackEvent } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const router = useRouter();

const formData = ref({
  email: '',
  password: ''
});

const handleSubmit = () => {
  // Validación básica
  if (!formData.value.email || !formData.value.password) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Track login (sin información sensible)
  trackEvent({
    event: EVENTS.LOGIN,
    method: 'email'
  });

  // Simular login exitoso
  alert('Login exitoso! (Demo)');
  router.push('/');
};

const goToSignup = () => {
  router.push('/signup');
};
</script>

<template>
  <div class="login-page">
    <div class="container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="login-title">Iniciar Sesión</h1>
          <p class="login-subtitle">Bienvenido de vuelta a AcademyHub</p>
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">
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

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg">
            Iniciar Sesión
          </button>
        </form>

        <div class="divider">
          <span>O continúa con</span>
        </div>

        <div class="social-buttons">
          <button class="btn btn-outline btn-block social-btn">
            <span>🔵</span> Google
          </button>
          <button class="btn btn-outline btn-block social-btn">
            <span>📘</span> Facebook
          </button>
        </div>

        <div class="signup-prompt">
          <p>¿No tienes una cuenta? <a @click="goToSignup" class="signup-link">Regístrate</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  padding: 3rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.login-card {
  max-width: 450px;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
}

.login-form {
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--gray-700);
}

.checkbox-label input {
  cursor: pointer;
}

.forgot-link {
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
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

.signup-prompt {
  text-align: center;
  color: var(--gray-600);
  font-size: 0.875rem;
}

.signup-link {
  color: var(--primary-600);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    padding: 2rem;
  }
  
  .login-title {
    font-size: 1.75rem;
  }
}
</style>

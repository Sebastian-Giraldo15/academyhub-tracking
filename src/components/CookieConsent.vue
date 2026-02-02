<script setup>
import { ref, onMounted } from 'vue';

const show = ref(false);

onMounted(() => {
  // Verificar si ya dio consentimiento
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    show.value = true;
  }
});

const handleAccept = () => {
  // Guardar consentimiento
  localStorage.setItem('cookie_consent', 'granted');
  
  // Actualizar Google Consent Mode
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }
  
  show.value = false;
  console.log('✅ Cookies aceptadas - Tracking habilitado');
};

const handleReject = () => {
  localStorage.setItem('cookie_consent', 'denied');
  show.value = false;
  console.log('❌ Cookies rechazadas - Solo tracking esencial');
};
</script>

<template>
  <div v-if="show" class="cookie-banner">
    <div class="cookie-content">
      <div class="cookie-text">
        <h3>🍪 Este sitio usa cookies</h3>
        <p>
          Usamos cookies para mejorar tu experiencia, analizar el tráfico y mostrarte anuncios relevantes. 
          Al aceptar, nos ayudas a entender cómo usas la plataforma.
        </p>
        <p class="cookie-note">
          <strong>Nota:</strong> Este es un proyecto de práctica para aprender tracking avanzado con GTM, GA4 y Meta Pixel.
        </p>
      </div>
      <div class="cookie-actions">
        <button @click="handleReject" class="btn btn-secondary">
          Rechazar
        </button>
        <button @click="handleAccept" class="btn btn-primary">
          Aceptar Cookies
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--gray-900);
  color: white;
  padding: 1.5rem;
  z-index: 100;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cookie-text {
  flex: 1;
}

.cookie-text h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.cookie-text p {
  margin-bottom: 0.5rem;
  color: var(--gray-300);
  line-height: 1.5;
}

.cookie-note {
  font-size: 0.875rem;
  color: var(--gray-400);
  margin-top: 0.75rem;
}

.cookie-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .cookie-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .cookie-actions {
    flex-direction: column;
  }
  
  .cookie-actions button {
    width: 100%;
  }
}
</style>

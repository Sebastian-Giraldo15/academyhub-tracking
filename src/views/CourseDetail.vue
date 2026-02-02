<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { courses } from '../data/coursesData';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const route = useRoute();
const router = useRouter();
const { addToCart, isInCart } = useCart();

// Encontrar el curso
const course = computed(() => {
  return courses.find(c => c.id === route.params.id);
});

const inCart = computed(() => {
  return course.value ? isInCart(course.value.id) : false;
});

onMounted(() => {
  if (!course.value) {
    router.push('/courses');
    return;
  }

  // Track view_item
  clearEcommerce();
  trackEvent({
    event: EVENTS.VIEW_ITEM,
    ecommerce: {
      currency: 'USD',
      value: course.value.price,
      items: [formatCourseItem(course.value, 0)]
    }
  });
});

const handleAddToCart = () => {
  if (course.value) {
    addToCart(course.value);
  }
};

const goToCheckout = () => {
  if (course.value && !inCart.value) {
    addToCart(course.value);
  }
  router.push('/cart');
};
</script>

<template>
  <div v-if="course" class="course-detail">
    <!-- Hero Section -->
    <div class="course-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="course-category">{{ course.category }}</div>
            <h1 class="course-title">{{ course.name }}</h1>
            <p class="course-description">{{ course.description }}</p>
            
            <div class="course-meta">
              <div class="meta-item">
                <span class="label">Instructor:</span>
                <span class="value">👨‍🏫 {{ course.instructor }}</span>
              </div>
              <div class="meta-item">
                <span class="label">Rating:</span>
                <span class="value">⭐ {{ course.rating }}</span>
              </div>
              <div class="meta-item">
                <span class="label">Estudiantes:</span>
                <span class="value">👥 {{ course.studentsCount.toLocaleString() }}</span>
              </div>
              <div class="meta-item">
                <span class="label">Duración:</span>
                <span class="value">⏱️ {{ course.duration }}</span>
              </div>
              <div class="meta-item">
                <span class="label">Nivel:</span>
                <span class="value">📚 {{ course.level }}</span>
              </div>
            </div>
          </div>
          
          <div class="hero-card">
            <img :src="course.image" :alt="course.name" class="course-image" />
            
            <div class="price-card">
              <div class="price-section">
                <span class="current-price">${{ course.price }}</span>
                <span v-if="course.originalPrice" class="original-price">${{ course.originalPrice }}</span>
              </div>
              
              <div class="cta-buttons">
                <button v-if="!inCart" @click="handleAddToCart" class="btn btn-primary btn-block">
                  Agregar al Carrito
                </button>
                <button v-else @click="goToCheckout" class="btn btn-primary btn-block">
                  Ir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Content -->
    <div class="course-content">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <!-- Lo que aprenderás -->
            <section class="content-section">
              <h2 class="section-title">🎯 Lo que aprenderás</h2>
              <ul class="learning-list">
                <li>Dominar los fundamentos y conceptos avanzados del tema</li>
                <li>Construir proyectos reales desde cero</li>
                <li>Aplicar las mejores prácticas de la industria</li>
                <li>Resolver problemas complejos de forma efectiva</li>
                <li>Prepararte para certificaciones profesionales</li>
                <li>Crear tu portafolio profesional</li>
              </ul>
            </section>

            <!-- Contenido del curso -->
            <section class="content-section">
              <h2 class="section-title">📚 Contenido del Curso</h2>
              <div class="curriculum">
                <div class="curriculum-item">
                  <h3>Módulo 1: Introducción</h3>
                  <p>5 lecciones • 2 horas</p>
                </div>
                <div class="curriculum-item">
                  <h3>Módulo 2: Fundamentos</h3>
                  <p>8 lecciones • 4 horas</p>
                </div>
                <div class="curriculum-item">
                  <h3>Módulo 3: Conceptos Avanzados</h3>
                  <p>10 lecciones • 6 horas</p>
                </div>
                <div class="curriculum-item">
                  <h3>Módulo 4: Proyecto Final</h3>
                  <p>3 lecciones • 3 horas</p>
                </div>
              </div>
            </section>

            <!-- Requisitos -->
            <section class="content-section">
              <h2 class="section-title">📋 Requisitos</h2>
              <ul class="requirements-list">
                <li>Computadora con acceso a internet</li>
                <li>Conocimientos básicos de programación (recomendado)</li>
                <li>Ganas de aprender y dedicación</li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">✨ Este curso incluye:</h3>
              <ul class="features-list">
                <li>📹 {{ course.duration }} de video</li>
                <li>📝 Material descargable</li>
                <li>♾️ Acceso de por vida</li>
                <li>📱 Acceso móvil y TV</li>
                <li>🏆 Certificado de finalización</li>
                <li>💬 Soporte del instructor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    Cargando curso...
  </div>
</template>

<style scoped>
.course-hero {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: 3rem 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: start;
}

.course-category {
  display: inline-block;
  background: var(--primary-600);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.course-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.course-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.course-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-item .label {
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  font-weight: 600;
}

.meta-item .value {
  font-size: 0.875rem;
  color: var(--gray-700);
}

.hero-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 1rem;
}

.course-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.price-card {
  padding: 1.5rem;
}

.price-section {
  margin-bottom: 1.5rem;
}

.current-price {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-right: 1rem;
}

.original-price {
  font-size: 1.25rem;
  color: var(--gray-500);
  text-decoration: line-through;
}

.course-content {
  padding: 3rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.content-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
}

.learning-list,
.requirements-list {
  list-style: none;
  padding: 0;
}

.learning-list li,
.requirements-list li {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: var(--gray-50);
  border-radius: 0.5rem;
  padding-left: 2rem;
  position: relative;
}

.learning-list li::before {
  content: '✓';
  position: absolute;
  left: 0.75rem;
  color: var(--primary-600);
  font-weight: bold;
}

.requirements-list li::before {
  content: '•';
  position: absolute;
  left: 0.75rem;
  color: var(--primary-600);
  font-weight: bold;
}

.curriculum {
  background: var(--gray-50);
  border-radius: 0.75rem;
  overflow: hidden;
}

.curriculum-item {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.curriculum-item:last-child {
  border-bottom: none;
}

.curriculum-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.curriculum-item p {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.sidebar-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 1rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.75rem 0;
  color: var(--gray-700);
  border-bottom: 1px solid var(--gray-200);
}

.features-list li:last-child {
  border-bottom: none;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
  color: var(--gray-600);
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  
  .hero-card {
    position: static;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-card {
    position: static;
  }
  
  .course-title {
    font-size: 2rem;
  }
}
</style>

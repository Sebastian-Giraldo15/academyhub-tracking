<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CourseCard from '../components/CourseCard.vue';
import { courses } from '../data/coursesData';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const router = useRouter();

// Cursos destacados
const featuredCourses = courses.filter(course => course.featured).slice(0, 3);

onMounted(() => {
  // Track view_item_list para cursos destacados
  clearEcommerce();
  trackEvent({
    event: EVENTS.VIEW_ITEM_LIST,
    ecommerce: {
      item_list_id: 'featured_courses',
      item_list_name: 'Featured Courses',
      items: featuredCourses.map((course, index) => formatCourseItem(course, index))
    }
  });
});

const goToCatalog = () => {
  router.push('/courses');
};
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Aprende Desarrollo Web con los Mejores Expertos
          </h1>
          <p class="hero-description">
            Más de 50,000 estudiantes han transformado su carrera profesional
            con nuestros cursos. Únete a nuestra comunidad de aprendizaje.
          </p>
          <div class="hero-cta">
            <button @click="goToCatalog" class="btn btn-primary btn-lg">
              Explorar Cursos
            </button>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" alt="Estudiantes aprendiendo" />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">50,000+</div>
            <div class="stat-label">Estudiantes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Cursos Disponibles</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4.8/5</div>
            <div class="stat-label">Calificación Promedio</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">95%</div>
            <div class="stat-label">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="featured-courses">
      <div class="container">
        <h2 class="section-title">Cursos Destacados</h2>
        <p class="section-description">
          Los cursos más populares de nuestra plataforma
        </p>
        
        <div class="courses-grid">
          <CourseCard
            v-for="(course, index) in featuredCourses"
            :key="course.id"
            :course="course"
            :index="index"
            list-id="featured_courses"
          />
        </div>

        <div class="text-center" style="margin-top: 2rem;">
          <button @click="goToCatalog" class="btn btn-outline">
            Ver Todos los Cursos
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">¿Por qué AcademyHub?</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎓</div>
            <h3 class="feature-title">Instructores Expertos</h3>
            <p class="feature-description">
              Aprende de profesionales con años de experiencia en la industria
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⏰</div>
            <h3 class="feature-title">Aprende a tu Ritmo</h3>
            <p class="feature-description">
              Acceso 24/7 a todos los cursos desde cualquier dispositivo
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💻</div>
            <h3 class="feature-title">Proyectos Prácticos</h3>
            <p class="feature-description">
              Aplica lo aprendido en proyectos reales para tu portafolio
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3 class="feature-title">Certificados</h3>
            <p class="feature-description">
              Obtén certificados al completar cada curso para tu CV
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: 4rem 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 1rem;
}

.hero-image img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Stats Section */
.stats {
  padding: 3rem 0;
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-600);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--gray-600);
}

/* Featured Courses */
.featured-courses {
  padding: 4rem 0;
  background: var(--gray-50);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.section-description {
  text-align: center;
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 3rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Features Section */
.features {
  padding: 4rem 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
}

.feature-description {
  color: var(--gray-600);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>

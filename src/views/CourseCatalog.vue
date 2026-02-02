<script setup>
import { ref, computed, onMounted } from 'vue';
import CourseCard from '../components/CourseCard.vue';
import { courses } from '../data/coursesData';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const selectedCategory = ref('all');
const searchQuery = ref('');

// Categorías únicas
const categories = computed(() => {
  const cats = ['all', ...new Set(courses.map(c => c.category))];
  return cats;
});

// Cursos filtrados
const filteredCourses = computed(() => {
  let result = courses;

  // Filtro por categoría
  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value);
  }

  // Filtro por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.instructor.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    );
  }

  return result;
});

onMounted(() => {
  // Track view_item_list inicial
  trackViewItemList();
});

const trackViewItemList = () => {
  clearEcommerce();
  trackEvent({
    event: EVENTS.VIEW_ITEM_LIST,
    ecommerce: {
      item_list_id: selectedCategory.value === 'all' ? 'all_courses' : `category_${selectedCategory.value}`,
      item_list_name: selectedCategory.value === 'all' ? 'All Courses' : selectedCategory.value,
      items: filteredCourses.value.slice(0, 12).map((course, index) => formatCourseItem(course, index))
    }
  });
};

const handleCategoryChange = (category) => {
  selectedCategory.value = category;
  trackViewItemList();
};

const handleSearch = () => {
  // Track búsqueda
  trackEvent({
    event: EVENTS.SEARCH,
    search_term: searchQuery.value
  });
  trackViewItemList();
};
</script>

<template>
  <div class="course-catalog">
    <div class="catalog-header">
      <div class="container">
        <h1 class="page-title">Catálogo de Cursos</h1>
        <p class="page-description">
          Explora nuestra colección completa de cursos de desarrollo web
        </p>
      </div>
    </div>

    <div class="catalog-content">
      <div class="container">
        <!-- Filtros y búsqueda -->
        <div class="filters-section">
          <!-- Búsqueda -->
          <div class="search-box">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Buscar cursos..."
              class="search-input"
            />
            <span class="search-icon">🔍</span>
          </div>

          <!-- Categorías -->
          <div class="categories">
            <button
              v-for="category in categories"
              :key="category"
              @click="handleCategoryChange(category)"
              :class="['category-btn', { active: selectedCategory === category }]"
            >
              {{ category === 'all' ? 'Todos' : category }}
            </button>
          </div>
        </div>

        <!-- Resultados -->
        <div class="results-info">
          <p>{{ filteredCourses.length }} cursos encontrados</p>
        </div>

        <!-- Grid de cursos -->
        <div v-if="filteredCourses.length > 0" class="courses-grid">
          <CourseCard
            v-for="(course, index) in filteredCourses"
            :key="course.id"
            :course="course"
            :index="index"
            :list-id="selectedCategory === 'all' ? 'all_courses' : `category_${selectedCategory}`"
          />
        </div>

        <!-- No hay resultados -->
        <div v-else class="no-results">
          <p>😕 No se encontraron cursos con los filtros seleccionados</p>
          <button @click="selectedCategory = 'all'; searchQuery = ''" class="btn btn-primary">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-header {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
  color: white;
  padding: 3rem 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.25rem;
  opacity: 0.9;
}

.catalog-content {
  padding: 3rem 0;
}

.filters-section {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-500);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  pointer-events: none;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--gray-300);
  background: white;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  text-transform: capitalize;
}

.category-btn:hover {
  border-color: var(--primary-500);
  color: var(--primary-600);
}

.category-btn.active {
  background: var(--primary-600);
  border-color: var(--primary-600);
  color: white;
}

.results-info {
  margin-bottom: 1.5rem;
  color: var(--gray-600);
  font-size: 0.875rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results p {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>

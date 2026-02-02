<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  listId: {
    type: String,
    default: 'all_courses'
  }
});

const router = useRouter();
const { addToCart, isInCart } = useCart();

const handleCourseClick = () => {
  // Track select_item
  clearEcommerce();
  trackEvent({
    event: EVENTS.SELECT_ITEM,
    ecommerce: {
      item_list_id: props.listId,
      item_list_name: props.listId.replace(/_/g, ' '),
      items: [formatCourseItem(props.course, props.index)]
    }
  });

  // Navegar a detalle
  router.push(`/courses/${props.course.id}`);
};

const handleAddToCart = (e) => {
  e.stopPropagation();
  addToCart(props.course);
};

const inCart = computed(() => isInCart(props.course.id));
</script>

<template>
  <div class="course-card" @click="handleCourseClick">
    <img :src="course.image" :alt="course.name" class="course-image" />
    
    <div class="course-content">
      <h3 class="course-title">{{ course.name }}</h3>
      
      <p class="course-instructor">👨‍🏫 {{ course.instructor }}</p>
      
      <div class="course-meta">
        <span class="rating">⭐ {{ course.rating }}</span>
        <span class="students">👥 {{ course.studentsCount.toLocaleString() }}</span>
      </div>
      
      <div class="course-details">
        <span class="duration">⏱️ {{ course.duration }}</span>
        <span class="level">📚 {{ course.level }}</span>
      </div>
      
      <div class="course-footer">
        <div class="price-section">
          <span class="current-price">${{ course.price }}</span>
          <span v-if="course.originalPrice" class="original-price">${{ course.originalPrice }}</span>
        </div>
        
        <button 
          v-if="!inCart"
          @click="handleAddToCart" 
          class="btn btn-primary add-to-cart"
        >
          Agregar
        </button>
        <span v-else class="in-cart-badge">✓ En carrito</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.course-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-instructor {
  color: var(--gray-600);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.course-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
}

.original-price {
  font-size: 0.875rem;
  color: var(--gray-500);
  text-decoration: line-through;
}

.add-to-cart {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.in-cart-badge {
  background: var(--primary-100);
  color: var(--primary-700);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}
</style>

import { ref, computed } from 'vue';
import { trackEvent, clearEcommerce, formatCourseItem } from '../utils/trackingHelper';
import { EVENTS } from '../utils/eventConstants';

// Estado global del carrito usando ref para reactividad completa
const cartItems = ref([]);

// Cargar desde localStorage al iniciar
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    cartItems.value = JSON.parse(savedCart);
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
  }
}

// Guardar en localStorage automáticamente
const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

export const useCart = () => {
  const addToCart = (course) => {
    // Verificar si ya está en el carrito
    const alreadyInCart = cartItems.value.find(item => item.id === course.id);
    if (alreadyInCart) {
      alert('Este curso ya está en tu carrito');
      return;
    }

    // Agregar al carrito
    cartItems.value.push(course);
    saveToStorage();

    // Trackear evento
    clearEcommerce();
    trackEvent({
      event: EVENTS.ADD_TO_CART,
      ecommerce: {
        currency: 'USD',
        value: course.price,
        items: [formatCourseItem(course)]
      }
    });
  };

  const removeFromCart = (courseId) => {
    const course = cartItems.value.find(item => item.id === courseId);
    if (!course) return;

    // Eliminar del carrito
    cartItems.value = cartItems.value.filter(item => item.id !== courseId);
    saveToStorage();

    // Trackear evento
    clearEcommerce();
    trackEvent({
      event: EVENTS.REMOVE_FROM_CART,
      ecommerce: {
        currency: 'USD',
        value: course.price,
        items: [formatCourseItem(course)]
      }
    });
  };

  const clearCart = () => {
    cartItems.value = [];
    saveToStorage();
  };

  const getCartTotal = () => {
    return cartItems.value.reduce((sum, item) => sum + item.price, 0);
  };

  const getItemCount = computed(() => {
    return cartItems.value.length;
  });

  const isInCart = (courseId) => {
    return cartItems.value.some(item => item.id === courseId);
  };

  return {
    cart: cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getItemCount,
    isInCart
  };
};

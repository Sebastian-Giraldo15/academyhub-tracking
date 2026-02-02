import { createRouter, createWebHistory } from 'vue-router';
import { trackPageView } from '../utils/trackingHelper';

import Home from '../views/Home.vue';
import CourseCatalog from '../views/CourseCatalog.vue';
import CourseDetail from '../views/CourseDetail.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import CheckoutSuccess from '../views/CheckoutSuccess.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Inicio - AcademyHub' }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CourseCatalog,
    meta: { title: 'Cursos - AcademyHub' }
  },
  {
    path: '/courses/:id',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: { title: 'Detalle del Curso - AcademyHub' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Carrito - AcademyHub' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Checkout - AcademyHub' }
  },
  {
    path: '/checkout/success',
    name: 'CheckoutSuccess',
    component: CheckoutSuccess,
    meta: { title: 'Compra Exitosa - AcademyHub' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Iniciar Sesión - AcademyHub' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: 'Registrarse - AcademyHub' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Track page views en cada cambio de ruta
router.afterEach((to, from) => {
  // Actualizar título
  document.title = to.meta.title || 'AcademyHub';
  
  // Track page view (solo si cambió la ruta)
  if (to.path !== from.path) {
    trackPageView({
      title: document.title,
      location: window.location.href,
      path: to.path
    });
  }
});

export default router;

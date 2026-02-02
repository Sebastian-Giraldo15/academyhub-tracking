/**
 * Helper centralizado para tracking
 * Todos los eventos pasan por aquí
 */

import { EVENTS } from './eventConstants';

const isDevelopment = import.meta.env.MODE === 'development';

/**
 * Esperar a que GTM esté listo
 */
export const waitForGTM = () => {
  return new Promise((resolve) => {
    if (window.dataLayer) {
      resolve();
    } else {
      const checkGTM = setInterval(() => {
        if (window.dataLayer) {
          clearInterval(checkGTM);
          resolve();
        }
      }, 100);
    }
  });
};

/**
 * Validar datos del evento
 */
const validateEvent = (eventData) => {
  if (!eventData || typeof eventData !== 'object') {
    console.error('❌ Invalid event data:', eventData);
    return false;
  }

  if (!eventData.event) {
    console.error('❌ Event name is required:', eventData);
    return false;
  }

  const ecommerceEvents = [
    EVENTS.VIEW_ITEM,
    EVENTS.ADD_TO_CART,
    EVENTS.REMOVE_FROM_CART,
    EVENTS.BEGIN_CHECKOUT,
    EVENTS.PURCHASE
  ];

  if (ecommerceEvents.includes(eventData.event)) {
    if (!eventData.ecommerce) {
      console.error('❌ Ecommerce object required for:', eventData.event);
      return false;
    }

    if (eventData.event === EVENTS.PURCHASE) {
      if (!eventData.ecommerce.transaction_id) {
        console.error('❌ transaction_id required for purchase');
        return false;
      }
    }
  }

  return true;
};

/**
 * Limpiar objeto ecommerce del dataLayer
 */
export const clearEcommerce = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  
  if (isDevelopment) {
    console.log('🧹 Ecommerce object cleared');
  }
};

/**
 * Función principal de tracking
 */
export const trackEvent = async (eventData) => {
  await waitForGTM();

  if (!validateEvent(eventData)) {
    return;
  }

  if (isDevelopment) {
    console.group(`🔍 Tracking: ${eventData.event}`);
    console.log('Event Data:', JSON.stringify(eventData, null, 2));
    console.groupEnd();
  }

  try {
    window.dataLayer.push(eventData);
  } catch (error) {
    console.error('❌ Error pushing to dataLayer:', error);
  }
};

/**
 * Formatear curso para ecommerce tracking
 */
export const formatCourseItem = (course, index = 0) => {
  return {
    item_id: course.id,
    item_name: course.name,
    item_category: course.category,
    item_category2: course.category2 || '',
    price: course.price,
    quantity: 1,
    currency: 'USD',
    index: index
  };
};

/**
 * Track page view
 */
export const trackPageView = (pageData) => {
  trackEvent({
    event: EVENTS.PAGE_VIEW,
    page_data: {
      page_title: pageData.title || document.title,
      page_location: pageData.location || window.location.href,
      page_path: pageData.path || window.location.pathname
    }
  });
};

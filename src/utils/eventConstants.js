/**
 * Constantes de eventos de tracking
 * Siguiendo nomenclatura de GA4
 */

export const EVENTS = {
  // Page tracking
  PAGE_VIEW: 'page_view',
  
  // E-commerce events (GA4 standard)
  VIEW_ITEM_LIST: 'view_item_list',
  SELECT_ITEM: 'select_item',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_CART: 'view_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  
  // User events
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  
  // Engagement events
  SEARCH: 'search',
  GENERATE_LEAD: 'generate_lead',
  
  // Custom events
  CTA_CLICK: 'custom_cta_click',
};

export const ITEM_LISTS = {
  ALL_COURSES: 'all_courses',
  FEATURED_COURSES: 'featured_courses',
  SEARCH_RESULTS: 'search_results',
};

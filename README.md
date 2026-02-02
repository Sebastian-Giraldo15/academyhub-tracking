# 📊 AcademyHub - Proyecto de Práctica de Tracking

¡Bienvenido a **AcademyHub**! Este es un proyecto completo de e-commerce de cursos online construido con **Vue 3** específicamente diseñado para aprender y practicar **Google Tag Manager (GTM)**, **Google Analytics 4 (GA4)** y **Meta Pixel**.

## 🎯 Objetivo del Proyecto

Este proyecto te permite aprender sobre tracking y análisis web de forma práctica mediante una aplicación real que implementa:

- ✅ Seguimiento completo del embudo de conversión e-commerce
- ✅ Integración con Google Tag Manager (GTM)
- ✅ Eventos de Google Analytics 4 (GA4)
- ✅ Consent Mode v2 para GDPR
- ✅ Arquitectura de tracking escalable y mantenible

## 🏗️ Tecnologías Utilizadas

- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Build tool moderno y rápido
- **Vue Router** - Enrutamiento para SPA
- **Google Tag Manager** - Gestión centralizada de tags
- **Google Analytics 4** - Análisis y métricas
- **Meta Pixel** - (Preparado para configuración)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.vue      # Navegación y carrito
│   ├── Footer.vue      # Newsletter y footer
│   ├── CookieConsent.vue  # Banner de cookies (Consent Mode v2)
│   └── CourseCard.vue  # Card de curso individual
│
├── views/              # Páginas de la aplicación
│   ├── Home.vue        # Página principal
│   ├── CourseCatalog.vue  # Catálogo completo
│   ├── CourseDetail.vue   # Detalle de curso
│   ├── Cart.vue        # Carrito de compras
│   ├── Checkout.vue    # Proceso de pago
│   ├── CheckoutSuccess.vue  # Confirmación
│   ├── Login.vue       # Inicio de sesión
│   └── Signup.vue      # Registro
│
├── utils/              # Utilidades de tracking
│   ├── trackingHelper.js    # Función centralizada de tracking
│   └── eventConstants.js    # Constantes de eventos GA4
│
├── data/               # Data de la aplicación
│   └── coursesData.js  # 12 cursos de ejemplo
│
├── composables/        # Lógica reutilizable
│   └── useCart.js      # State management del carrito
│
├── router/             # Configuración de rutas
│   └── index.js        # Definición de rutas + tracking automático
│
├── App.vue             # Componente raíz
├── main.js             # Entry point
└── style.css           # Estilos globales
```

## 🚀 Instalación y Ejecución

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### 3. Build para Producción

```bash
npm run build
```

## 📊 Configuración de Google Tag Manager

### Paso 1: Crear Cuenta de GTM

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea una cuenta nueva
3. Crea un contenedor Web
4. Copia el **ID del contenedor** (formato: GTM-XXXXXXX)

### Paso 2: Configurar el ID en el Proyecto

Abre el archivo `index.html` y reemplaza `GTM-XXXXXXX` con tu ID real en **DOS lugares**:

```html
<!-- Línea 8: Google Tag Manager HEAD -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>  <!-- ⬅️ CAMBIAR AQUÍ -->

<!-- Línea 40: Google Tag Manager BODY (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"  <!-- ⬅️ Y AQUÍ -->
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### Paso 3: Verificar Instalación de GTM

1. Abre la aplicación en el navegador
2. Abre las **DevTools** (F12)
3. Ve a la pestaña **Console**
4. Escribe: `window.dataLayer`
5. Deberías ver un array con datos

### Paso 4: Instalar Google Tag Assistant (Extensión)

1. Instala [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Haz clic en el ícono de la extensión
3. Activa el **Recording**
4. Navega por la aplicación
5. Observa los eventos que se disparan

## 🔧 Configuración de Google Analytics 4 en GTM

### Paso 1: Crear Propiedad GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una **propiedad GA4**
3. Copia el **ID de medición** (formato: G-XXXXXXXXXX)

### Paso 2: Crear Tag de Configuración en GTM

1. En GTM, ve a **Tags** → **New**
2. Tipo de etiqueta: **Google Analytics: GA4 Configuration**
3. Configura:
   - **Measurement ID**: Tu G-XXXXXXXXXX
4. Activador: **Initialization - All Pages**
5. Nombra la etiqueta: "GA4 - Configuration"
6. **Guardar**

### Paso 3: Crear Tag de Eventos GA4

1. En GTM, ve a **Tags** → **New**
2. Tipo de etiqueta: **Google Analytics: GA4 Event**
3. Configura:
   - **Configuration Tag**: Selecciona "GA4 - Configuration"
   - **Event Name**: `{{Event}}` (variable integrada)
4. Activador: **Custom Event** → Nombre del evento: `.*` (regex que captura todos)
5. Nombra la etiqueta: "GA4 - All Events"
6. **Guardar**

### Paso 4: Publicar Contenedor

1. Haz clic en **Submit** (arriba a la derecha)
2. Agrega un nombre de versión: "Initial Setup"
3. Haz clic en **Publish**

## 📈 Eventos Implementados

### Eventos de E-commerce (GA4 Standard)

La aplicación envía automáticamente los siguientes eventos:

| Evento | Cuándo se dispara | Vista/Componente |
|--------|-------------------|------------------|
| `page_view` | Cada cambio de ruta | Automático (router) |
| `view_item_list` | Al ver catálogo o destacados | Home, CourseCatalog |
| `select_item` | Al hacer clic en un curso | CourseCard |
| `view_item` | Al entrar a detalle de curso | CourseDetail |
| `add_to_cart` | Al agregar al carrito | CourseCard, CourseDetail |
| `remove_from_cart` | Al quitar del carrito | Cart |
| `view_cart` | Al abrir el carrito | Cart |
| `begin_checkout` | Al iniciar checkout | Checkout |
| `add_payment_info` | Al enviar form de pago | Checkout |
| `purchase` | Al completar compra | Checkout |

### Otros Eventos

| Evento | Cuándo se dispara | Vista/Componente |
|--------|-------------------|------------------|
| `search` | Al buscar cursos | CourseCatalog |
| `generate_lead` | Al suscribirse al newsletter | Footer |
| `login` | Al iniciar sesión | Login |
| `sign_up` | Al registrarse | Signup |

## 🔍 Cómo Verificar que el Tracking Funciona

### Opción 1: Consola del Navegador

1. Abre DevTools (F12) → pestaña **Console**
2. Navega por la aplicación
3. Verás logs como:
   ```
   [Tracking] Event: view_item_list
   [Tracking] Data: { ecommerce: {...}, ... }
   ```

### Opción 2: dataLayer

En la consola, ejecuta:
```javascript
window.dataLayer
```

Verás todos los eventos enviados.

### Opción 3: GTM Preview Mode

1. En GTM, haz clic en **Preview**
2. Ingresa la URL: `http://localhost:5173`
3. Se abrirá una ventana de debug
4. Navega por la aplicación
5. En la ventana de GTM Preview verás cada evento en tiempo real

### Opción 4: GA4 DebugView

1. En GA4, ve a **Admin** → **DebugView**
2. Asegúrate de tener el navegador en modo debug
3. Verás los eventos en tiempo real

## 🎓 Flujo de Usuario para Pruebas

Para probar todos los eventos, sigue este flujo:

1. **Inicio** → `page_view`
2. **Ver cursos destacados** → `view_item_list`
3. **Clic en un curso** → `select_item`
4. **Ver detalle** → `view_item`
5. **Agregar al carrito** → `add_to_cart`
6. **Ir a Catálogo** → `page_view`, `view_item_list`
7. **Buscar "React"** → `search`
8. **Agregar otro curso** → `add_to_cart`
9. **Ver carrito** → `view_cart`
10. **Eliminar un item** → `remove_from_cart`
11. **Checkout** → `begin_checkout`
12. **Completar formulario** → `add_payment_info`, `purchase`
13. **Newsletter (Footer)** → `generate_lead`

## 🍪 Consent Mode v2

El proyecto incluye un **banner de cookies** que implementa Consent Mode v2:

### Estados por Defecto
```javascript
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
```

### Al Aceptar Cookies
Todos los consentimientos cambian a `granted`.

### Al Rechazar
Permanecen en `denied`.

El estado se guarda en `localStorage`.

## 🛠️ Arquitectura de Tracking

### trackingHelper.js

Función centralizada que:

1. **Valida** el evento antes de enviarlo
2. **Espera** a que GTM esté disponible
3. **Limpia** ecommerce data cuando es necesario
4. **Formatea** items según el estándar GA4
5. **Loguea** en development para debugging

```javascript
trackEvent({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'TXN-123',
    value: 199.98,
    currency: 'USD',
    items: [...]
  }
});
```

### eventConstants.js

Constantes para evitar typos:

```javascript
import { EVENTS } from '@/utils/eventConstants';

trackEvent({ event: EVENTS.ADD_TO_CART, ... });
```

### Ventajas de esta Arquitectura

✅ **Centralizada**: Un solo lugar para cambiar lógica de tracking
✅ **Mantenible**: Fácil de actualizar y debuggear
✅ **Escalable**: Agregar nuevos eventos es simple
✅ **Type-safe**: Las constantes previenen errores
✅ **Debuggeable**: Logs automáticos en desarrollo

## 🧪 Testing de Eventos

### Checklist de Validación

- [ ] GTM está instalado correctamente
- [ ] dataLayer se inicializa
- [ ] page_view se dispara en cada ruta
- [ ] view_item_list muestra todos los items
- [ ] add_to_cart incluye item_id, item_name, price
- [ ] purchase incluye transaction_id único
- [ ] No hay eventos duplicados
- [ ] Consent Mode actualiza correctamente

## 📚 Recursos Adicionales

### Documentación Oficial

- [GA4 E-commerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GTM Developer Guide](https://developers.google.com/tag-platform/tag-manager/web)
- [Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)

### Herramientas Útiles

- [Tag Assistant](https://tagassistant.google.com/)
- [GA Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [dataLayer Inspector](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke)

## 🤝 Próximos Pasos

1. **Configurar Meta Pixel**:
   - Agregar el código del pixel en `index.html`
   - Mapear eventos de GA4 a eventos de Meta
   - Crear tags en GTM para Meta Pixel

2. **Configurar Google Ads**:
   - Crear conversiones en Google Ads
   - Vincular con GA4
   - Crear tags de conversión en GTM

3. **Agregar Enhanced Conversions**:
   - Hashear datos de usuario
   - Enviar con eventos de conversión

4. **Server-Side Tracking**:
   - Configurar GTM Server-Side
   - Enviar eventos desde el servidor

## 💡 Tips de Tracking

1. **Siempre usa transaction_id único** en eventos de purchase
2. **No envíes PII sin hashear** (emails, teléfonos)
3. **Valida items array** antes de enviar eventos de e-commerce
4. **Usa clearEcommerce()** antes de push para evitar contaminación
5. **Implementa Consent Mode** para cumplir GDPR/CCPA
6. **Testea en modo Preview** antes de publicar
7. **Documenta tus eventos** para el equipo

## 📞 Soporte

Si tienes dudas sobre el proyecto:

- Revisa los logs en la consola del navegador
- Usa GTM Preview Mode para debugging
- Verifica que el ID de GTM esté correcto
- Asegúrate de publicar los cambios en GTM

---

**¡Feliz Tracking! 📊🚀**

Este proyecto fue creado con fines educativos para aprender Google Analytics 4, Google Tag Manager y Meta Pixel de forma práctica.

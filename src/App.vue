<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import CookieConsent from './components/CookieConsent.vue';
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
    <CookieConsent />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

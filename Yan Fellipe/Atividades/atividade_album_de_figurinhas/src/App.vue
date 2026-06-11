<template>
  <div id="app">

    <nav class="navbar">
      <div class="navbar-logo">
        ⚽ FutebolApp
      </div>
      <div class="navbar-links">
        <router-link to="/">🏠 Início</router-link>
        <router-link to="/album">🎴 Álbum Oficial</router-link>
      </div>
    </nav>

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background-color: #f3f0f7;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e0a2e;
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(59, 7, 100, 0.3);
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
  color: #c0c0c0;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: #c0c0c0;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.navbar-links a:hover {
  background-color: rgba(192, 192, 192, 0.15);
}

.navbar-links a.router-link-exact-active {
  background-color: #7c3aed;
  color: #ffffff;
}
</style>
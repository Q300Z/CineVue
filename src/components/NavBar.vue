<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router'; // Gestion des routes.
import {useGlobalStore} from '../store/global'; // Supposons que vous utilisez Pinia ou un équivalent pour le contexte global.

const route = useRoute();

// Récupération de la wishlist depuis le store global.
const store = useGlobalStore();
const wishlistCount = computed(() => store.wishlist.length);

// Fonction pour vérifier la route active.
const isActive = (path) => route.path === path;
</script>

<template>
  <nav class="navbar">
    <ul>
      <li>
        <RouterLink
            to="/"
        >
          Accueil
        </RouterLink>
      </li>
      <li>
        <RouterLink
            to="/wishlist"
        >
          Liste de souhaits ({{ wishlistCount }})
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px 20px;
  font-family: 'Arial', sans-serif;
  border: #333333 solid 1px;
  border-radius: 5px;
  box-shadow: #acabab 2px 2px 5px;
  transition: box-shadow 200ms ease;
}

.navbar:hover {
  box-shadow: #acabab 5px 5px 5px;
}

.navbar ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 0;
}

.navbar li {
  display: inline;
}

.navbar li a {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 500ms ease;
  color: black;
}

.navbar li a:hover {
  background-color: #acabab;
}

.navbar li a.active {
  text-decoration: underline;
  font-weight: bold;
}

</style>

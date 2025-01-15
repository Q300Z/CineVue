<script setup>
import {computed} from 'vue';
import {useGlobalStore} from '../store/global'; // Supposons que vous utilisez Pinia ou un équivalent pour le contexte global.
import {useRouter} from 'vue-router'; // Pour la navigation

// Accès au store global
const store = useGlobalStore();
const wishlist = computed(() => store.wishlist);

// Fonction pour supprimer un film de la wishlist
const onRemoveWishlist = (movie) => {
  store.onRemoveWishlist(movie); // Appelle une méthode définie dans le store
};

// Gestion de la navigation vers les détails d'un film
const router = useRouter();
const goToMovieDetails = (movieId) => {
  router.push(`/movie/${movieId}`);
};
</script>

<template>
  <div v-if="wishlist.length === 0">
    <p class="wishlist_empty">Aucun film dans la wishlist</p>
  </div>
  <div class="wishlist_container" v-else>
    <h2 class="wishlist_title">Wishlist</h2>
    <p class="wishlist_count">Total de films : {{ wishlist.length }}</p>

    <!-- Affichage des films -->
    <div
        v-for="movie in wishlist"
        :key="movie.id"
        class="wishlist_item"
    >
      <img
          v-if="movie.poster_path"
          :alt="movie.title"
          :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
      />
      <div class="wishlist_item_info">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
        <button
            class="wishlist_item_link"
            @click="goToMovieDetails(movie.id)"
        >
          Plus de détails
        </button>
      </div>
      <button @click="onRemoveWishlist(movie)">
        Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
.wishlist_container {
  margin-bottom: 20px;
  width: 75%;
  place-items: center;
  justify-self: center;
}

.wishlist_title {
  margin-bottom: 10px;
}

.wishlist_count {
  font-size: 1.2em;
  color: #555;
}

.wishlist_empty {
  margin-top: 20px;
  color: #888;
}

.wishlist_item {
  display: flex;
  border: #ccc solid 1px;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  transition: box-shadow 300ms;
  box-shadow: #acabab 2px 2px 5px;
  align-items: center;
}

.wishlist_item:hover {
  box-shadow: #acabab 5px 5px 5px;
}

.wishlist_item img {
  width: 150px;
  height: auto;
  margin-right: 10px;
  border-radius: 4px;
}

.wishlist_item_info {
  flex: 1;
}

.wishlist_item_info h3 {
  margin: 0;
  color: #333;
}

.wishlist_item_info p {
  margin: 5px 0;
  color: #555;
}

.wishlist_item-link {
  color: #007BFF;
  text-decoration: none;
  font-size: 0.95em;
}

.wishlist_item-link:hover {
  text-decoration: underline;
}

.wishlist_item button {
  background-color: #FF4136;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 15px;
}

.button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #9ac7fb;
  border: #ccc solid 1px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 15px;
  color: black;
}

.wishlist_item button:hover {
  background-color: #b82b24;
}

</style>

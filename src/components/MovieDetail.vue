<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import MovieList from './MovieList.vue';
import {useGlobalStore} from "../store/global.js";

const route = useRoute();
const id = computed(()=>route.params.id);

const store = useGlobalStore();
const token = store.token;
const onAddWishlist = store.onAddWishlist;
const isInWishlist = store.isInWishlist;

const movie = ref([]);
const cast = ref([]);
const error = ref();
const similarMovies = ref([]);

const fetchMovieDetails = async () => {
  try {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id.value}?api_key=${token}&language=fr-FR&region=FR`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération des détails du film.");
    const data = await response.json();
    movie.value = data;
  } catch (err) {
    error.value = err.message;
  }
};

const fetchMovieCast = async () => {
  try {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id.value}/credits?api_key=${token}&language=fr-FR&region=FR`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération des acteurs.");
    const data = await response.json();
    cast.value = data.cast.slice(0, 10); // Limite aux 10 premiers acteurs.
  } catch (err) {
    error.value = err.message;
  }
};

const fetchSimilarMovies = async () => {
  try {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id.value}/similar?api_key=${token}&language=fr-FR&region=FR`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération des films similaires.");
    const data = await response.json();
    similarMovies.value = data.results;
  } catch (err) {
    console.error("Erreur lors du fetch des films similaires :", err.message);
  }
};

onMounted(() => {
  fetchMovieDetails();
  fetchMovieCast();
  fetchSimilarMovies();
});

watch(id, () => {
  fetchMovieDetails();
  fetchMovieCast();
  fetchSimilarMovies();
});
</script>

<template>
  <div class="container">
    <div v-if="error">
      <p>Erreur : {{ error }}</p>
    </div>
    <div v-else-if="!movie">
      <p class="container">Chargement des détails...</p>
    </div>
    <div class="movie_detail_container" v-else>
      <h1 class="movie_title">{{ movie.title }}</h1>
      <div class="movie_detail_content">
        <img
            v-if="movie.poster_path"
            :alt="movie.title"
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            class="movie_poster"
        />
        <div>
          <p class="movie_overview">{{ movie.overview }}</p>
          <p class="movie_info">Date de sortie : {{ movie.release_date }}</p>
          <p class="movie_info">Note moyenne : {{ movie.vote_average }}</p>

          <button
              :disabled="isInWishlist(movie)"
              class="add_to_wishlist_btn"
              type="button"
              @click="onAddWishlist(movie)"
          >
                          {{ isInWishlist(movie) ? "Déjà dans la wishlist" : "Ajouter à la wishlist" }}
          </button>
        </div>
      </div>
    </div>

    <h3 class="actors">Acteurs principaux</h3>
    <ul class="actors_list">
      <li v-for="actor in cast" :key="actor.cast_id">
        {{ actor.name }} - {{ actor.character }}
      </li>
    </ul>

    <h3 class="similarMoviesTitle">Films similaires</h3>
    <div class="similarMoviesList">
      <MovieList :listMovie="similarMovies"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.movie_title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.movie_poster {
  width: 300px;
  height: auto;
  margin: 20px;
  border-radius: 10px;
  box-shadow: #acabab 2px 2px 5px;
  transition: transform 200ms ease;
}

.movie_poster:hover {
  transform: scale(1.1);
  box-shadow: #acabab 5px 5px 5px;
}

.movie_detail_content {
  justify-items: center;
}

.movie_overview {
  font-size: 1.2rem;
  margin: 20px 0;
  max-width: 700px;
  text-align: justify;
}

.movie_info {
  font-size: 1rem;
  margin-top: 10px;
}

.actors {
  margin-top: 30px;
  font-size: 1.8rem;
}

.actors_list {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}

.actors_list li {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.add_to_wishlist_btn {
  background-color: #007BFF;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 1rem;
}

.add_to_wishlist_btn:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.similarMoviesTitle {
  margin-top: 30px;
  font-size: 1.8rem;
}

.similarMoviesList {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.similarMoviesItem {
  width: 150px;
  height: auto;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.similarMoviesItem img {
  width: 100%;
  border-radius: 10px;
}

.similarMoviesItem h4 {
  margin-top: 10px;
  text-align: center;
  font-size: 1rem;
}

</style>

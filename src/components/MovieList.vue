<script setup>
import {useRouter} from 'vue-router';

defineProps({
  listMovie: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

// Fonction pour naviguer vers les détails d'un film.
const goToMovieDetails = (id) => {
  router.push(`/movie/${id}`);
};
</script>

<template>
  <p v-if="listMovie.length === 0">Aucun film</p>
  <div class="container_movie_list" v-else>
    <!-- Affichage des films -->
      <div
          v-for="movie in listMovie"
          :key="movie.id"
          class="movie_card"
      >
        <h3 class="movie_title">{{ movie.title }}</h3>
        <img
            v-if="movie.poster_path"
            :alt="movie.title"
            :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            class="movie_poster"
        />
        <div v-else class="no_image">Pas d'image</div>
        <p class="movie_rating">
          <strong>Note :</strong> {{ movie.vote_average }}/10
        </p>
        <button
            class="details_link"
            @click="goToMovieDetails(movie.id)"
        >
          Voir les détails
        </button>
      </div>
    </div>
</template>

<style scoped>
.container_movie_list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  font-family: 'Arial', sans-serif;
}

.movie_card {
  border: #ccc solid 1px;
  border-radius: 5px;
  padding: 15px;
  width: 200px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s;
  box-shadow: #acabab 2px 2px 5px;
}

.movie_card:hover {
  transform: scale(1.05);
  box-shadow: #acabab 5px 5px 5px;
}

.movie_title {
  font-size: 16px;
  margin: 10px 0;
}

.movie_poster {
  border-radius: 8px;
  width: 100%;
  max-height: 278px;
  object-fit: cover;
  margin-bottom: 10px;
}

.no_image {
  border-radius: 8px;
  height: 278px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gainsboro;
  color: #555;
}

.movie_rating {
  margin: 10px 0;
  font-size: 14px;
}

.details_link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #9ac7fb;
  border: #ccc solid 1px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.3s ease;
  color: black;
}

.details_link:hover {
  background-color: #0056b3;
}

</style>

<!--Sixte Morio-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const imageId = ref(route.params.id);
const image = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`https://esd.atontour.org/v1/prompt/${imageId.value}`);
    const data = await response.json();
    image.value = data;
  } catch (error) {
    console.error('Error fetching image details:', error);
  }
});
</script>

<template>
  <div v-if="image">
    <h1>{{ image.title }}</h1>
    <img :src="image.img" class="img-fluid" :alt="image.title">
    <p><h2 class="h4">Fais le: </h2>{{ image.date }}</p>
    <p><h2 class="h4">Prompt: </h2>{{ image.prompt }}</p>
    <p><h2 class="h4">Négative: </h2>{{ image.negative }}</p>
    <p><router-link :to="'/category/' + image.id_category">Voir la catégorie</router-link></p>
    <p><router-link :to="'/ai/' + image.id_ai">Voir l'IA</router-link></p>
    <p><router-link :to="'/user/' + image.id_user">Voir l'utilisateur</router-link></p>
  </div>
</template>
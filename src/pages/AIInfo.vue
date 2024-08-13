<!--Sixte Morio-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const aiId = ref(route.params.id);
const ai = ref(null);
const aiImages = ref([]);

onMounted(async () => {
  try {
    // Fetch AI details
    const aiResponse = await fetch(`https://esd.atontour.org/v1/ai/${aiId.value}`);
    ai.value = await aiResponse.json();

    // Fetch prompts with the same category
    const promptsResponse = await fetch('https://esd.atontour.org/v1/prompt');
    const promptsData = await promptsResponse.json();
    aiImages.value = promptsData.filter(prompt => prompt.id_ai === aiId.value).map(prompt => prompt.img);
  } catch (error) {
    console.error('Error fetching AI details:', error);
  }
});
</script>

<template>
  <div v-if="ai && ai.logo">
    <h1>{{ ai.label }}</h1>
    <div>
      <img :src="ai.logo" class="img-fluid" :alt="logo">
    </div>
    <a :href="ai.url">Tester L'IA</a>
  </div>
  <div class="container mt-3">
    <div class="row">
      <h2 class="h4">Images de la même IA :</h2>
    </div>
    <div class="row">
      <div v-for="(image, index) in aiImages" :key="index" class="col-lg-3 col-md-4 col-sm-6 col-12">
        <img :src="image" class="img-fluid" :alt="`Image ${index + 1}`">
      </div>
    </div>
  </div>
</template>

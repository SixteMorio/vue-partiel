<!--Sixte Morio-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = ref(route.params.id);
const user = ref(null);
const userImages = ref([]);

onMounted(async () => {
  try {
    // Fetch user details
    const userResponse = await fetch(`https://esd.atontour.org/v1/user/${userId.value}`);
    user.value = await userResponse.json();

    // Fetch prompts with the same category
    const promptsResponse = await fetch('https://esd.atontour.org/v1/prompt');
    const promptsData = await promptsResponse.json();
    userImages.value = promptsData.filter(prompt => prompt.id_user === userId.value).map(prompt => prompt.img);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});
</script>

<template>
  <div v-if="user">
    <h1>{{ user.id_user }}</h1>
    <img :src="user.avatar" class="img-fluid" :alt="avatar">
    <p>
    <h2 class="h4">Description: </h2>{{ user.description }}
    </p>
    <p>
    <h2 class="h4">Label: </h2>{{ user.label }}
    </p>

    <div class="container mt-3">
      <div class="row">
        <h2 class="h4">Images de cet Utilisateur :</h2>
      </div>
      <div class="row">
        <div v-for="(image, index) in userImages" :key="index" class="col-lg-3 col-md-4 col-sm-6 col-12">
          <img :src="image" class="img-fluid" :alt="`Image ${index + 1}`">
        </div>
      </div>
    </div>
  </div>
</template>

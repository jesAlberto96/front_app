<template>
	<header-page></header-page>

  	<RouterView />
</template>

<script setup lang="ts">
  	import { RouterLink, RouterView } from 'vue-router';
	import HeaderPage from './layout/HeaderPage.vue';
</script>
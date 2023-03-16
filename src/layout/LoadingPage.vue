<template>
    <div class="row" style="font-size: 20px;display: flex;justify-content: center;" v-if="loading == 1">
		<div class="spinner-border" style="width: 3rem; height: 3rem;color:#008000;" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import config from '@/store/config/';

	export default {
		setup() {
            const loading = computed(() => config.getters.getLoading);
			console.log(loading)

			return {
                loading,
			}
    	},
	}
</script>
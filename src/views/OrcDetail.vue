<template>
	<div class="row content-info" v-if="data != false">
		<div class="col-12 card-button">
			<button type="button" class="btn btn-primary" @click="$router.push({name: 'Home'});">Go Back</button>
		</div>
		<div class="col-6">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title fw-bold">INFORMATION</h5>
					<p class="fw-bold mb-1">Name</p>
					<p class="card-text" v-text="data.name"></p>
					<p class="fw-bold mb-1">Lastname</p>
					<p class="card-text" v-text="data.lastname"></p>
					<p class="fw-bold mb-1">Email</p>
					<p class="card-text" v-text="data.email"></p>
				</div>
			</div>
		</div>
		<div class="col-6" v-if="data.keywords.length > 0">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Keywords</h5>

					<ul>
						<li v-for="item in data.keywords" v-text="item.content" class="keywords"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import orc from '@/store/orc/';
	import LoadingPage from '@/layout/LoadingPage.vue';

	export default {
		props: {
			id: {
				type: String,
				default: ''
			},
		},

		setup(props) {
            const data = ref(false);

			const find = async () => {
				const response = await orc.dispatch('find', { orcid: props.id });
                if (response.meta.success){
                    data.value = response.data;
                } else {
					data.value = false;
				}
			}

			find();

			return {
                data,
			}
    	},
	}
</script>

<style scoped>
	.card-body{
		color: #000000;
	}

	.content-info{
		justify-content: space-around;
	}

	.keywords{
		text-transform: uppercase;
	}

	.card-button{
		display: flex;
		justify-content: end;
		align-items: end;
		margin-right: 4vh;
		margin-bottom: 4vh;
	}
</style>
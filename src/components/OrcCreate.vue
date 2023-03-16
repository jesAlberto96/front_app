<template>
	<div class="row">
		<div class="col-12 card-button-back">
			<button type="button" class="btn btn-primary" @click="$router.push({name: 'Home'});">Go Back</button>
		</div>
	</div>

	<div class="row content-errors" v-if="errors != false">
		<div class="col-12">
			<div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
				<ul>
					<li v-for="item in errors" v-text="item"></li>
				</ul>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-6">
			<div class="input-group mb-3">
				<input type="text" class="form-control" placeholder="type a ORCID to search" aria-label="Search Researchers" aria-describedby="button-addon2" v-model="orcid">
				<button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="findResearcher()">Search</button>
			</div>
		</div>
	</div>

	<div class="row content-info" v-if="data != false">
		<div class="col-12 info-orc">
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
		<div class="col-12 info-orc" v-if="data.keywords.length > 0">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Keywords</h5>

					<ul>
						<li v-for="item in data.keywords" v-text="item.content" class="keywords"></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="card card-button">
				<div class="card-body">
					<button type="button" class="btn btn-primary" @click="create()">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import orc from '@/store/orc/';
	import router from '@/router';
	import Toastify from 'toastify-js'

	export default {
		setup() {
            const data = ref(false);
            const orcid = ref('');
            const errors = ref(false);

			const findResearcher = async () => {
				errors.value = false;
				data.value = false;
                const response = await orc.dispatch('findOrc', { orcid: orcid.value });

                if (response.meta.success){
                    data.value = {
						orcid: response.data["orcid-identifier"]['path'],
						name: response.data.person.name['given-names'].value,
						lastname: response.data.person.name['family-name'].value,
						email: (response.data.person.emails.email.length == 0) ? '' : response.data.person.emails.email.filter(word => word.primary == true)[0].email,
						keywords: response.data.person.keywords.keyword,
					}
                } else {
					messageToatsError("Resource not found");
				}
			}

			const create = async () => {
                const response = await orc.dispatch('create', data.value);

				if (response.meta.success){
					messageToats("Orc created successfull");

					router.push({
						name: 'OrcDetail',
						params: { id: response.data.orcid }
					});

					errors.value = false;
				} else {
					errors.value = response.meta.errors;
				}
			}

			const messageToats = (message) => {
				Toastify({
					text: message,
					className: "info",
					duration: 4000,
					style: {
						background: "linear-gradient(to right, #00b09b, #96c93d)",
					}
				}).showToast();
			}
			
			const messageToatsError = (message) => {
				Toastify({
					text: message,
					className: "info",
					duration: 4000,
					style: {
						background: "#dc3545",
					}
				}).showToast();
			}

			return {
                data,
                errors,
				orcid,
                findResearcher,
				create,
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

	.info-orc{
		margin-top: 2vh;
	}

	.card-button-back{
		display: flex;
		justify-content: end;
		align-items: end;
		margin-right: 4vh;
		margin-bottom: 4vh;
	}

	.card-button{
		margin-top: 2vh;
		justify-content: end;
    	align-items: end;
	}

	.content-errors{
		margin-bottom: 2vh;
	}

	.content-errors div div{
		color: #ff0000;
		font-weight: bold;
		font-size: 18px;
	}
</style>
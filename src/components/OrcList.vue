<template>
    <div class="row">
		<div class="col-12">
			<table class="table align-middle mb-0 bg-white">
				<thead class="bg-light table-dark">
					<tr>
						<th><p class="fw-bold mb-1">Name</p></th>
						<th><p class="fw-bold mb-1">Lastname</p></th>
						<th><p class="fw-bold mb-1">Email</p></th>
						<th v-html="'&ensp;'"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data">
						<td>
                            <p class="fw-normal mb-1" v-text="item.name"></p>
						</td>
						<td>
							<p class="fw-normal mb-1" v-text="item.lastname"></p>
						</td>
						<td v-text="item.email"></td>
						<td>
							<button type="button" class="btn btn-success" style="margin-right: 2vh" @click="$router.push({
                                name: 'OrcDetail',
                                params: { id: item.orcid }
                            })">Detail</button>
							<button type="button" class="btn btn-danger" @click="deleteOrc(item.orcid)">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

    <div class="row">
		<div class="col-12">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" :class="{ 'disabled': (link_prev == null) }" aria-label="Previous" @click="findByPage(current_page-1)">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    <li v-for="page in page_cant" :key="page" class="page-item" :class="{ 'active': (page == current_page) }" @click="findByPage(page)"><a class="page-link" href="#" v-text="page"></a></li>

                    <li class="page-item">
                        <a class="page-link" href="#" :class="{ 'disabled': (link_next == null) }" aria-label="Next" @click="findByPage(current_page+1)">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import config from '@/store/config/';
    import orc from '@/store/orc/';

	export default {
		setup() {
            const link_prev = ref(false);
            const link_next = ref(false);
            const page_cant = ref(false);
            const current_page = ref(false);
            const data = ref(false);

			const findByPage = async (page) => {
                const response = await orc.dispatch('findByPage', { page });

                if (response.data){
                    link_prev.value = response.links.prev;
                    link_next.value = response.links.next;
                    page_cant.value = response.meta.last_page;
                    current_page.value = response.meta.current_page;
                    data.value = response.data;
                }
			}

            const deleteOrc = async (orcid) => {
                if (confirm("Do you want to delete this orc?")){
                    const response = await orc.dispatch('delete', { orcid });
                    if (response.meta.success){
                        findByPage(1);
                    }
                }
			}

            onMounted(async () => {
                findByPage(1);
            });

			return {
                link_prev,
                link_next,
                page_cant,
                current_page,
                data,

                findByPage,
                deleteOrc,
			}
    	},
	}
</script>

<style scoped>
.pagination{
    margin-top: 2vh;
    justify-content: center;
    align-items: center;
}
</style>
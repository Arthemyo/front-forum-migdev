<template>
    <section class="conteiner">
        <div class="row d-flex justify-content-center">
            <div v-for="post in dataApi" :key="post.id" class="mt-3 ">
                <div class="card col-md-12 row shadow-sm">
                    <div class="card-header">
                        <button class="btn btn-secondary" @click="deleteDuvida(post.id)">Excluir</button>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img v-if="user.imagem.substr(18, 18 -5) != 'null'" :src="imagem" alt="" class="p-1 img">
                                <img v-else src="../assets/img_311846.png" alt="" class="p-1 img"/>
                                <RouterLink class="d-flex text-muted mb-0 " to="/user">{{ post.usuario.usuario }}</RouterLink>
                            </div>
                            <span class="text-muted ">{{ format_date(post.dataCriacao) }}</span>
                        </div>
                        <router-link :to="{ path: '/post/' + post.id}" class="text-decoration-none ">
                            <h5 class="card-title ">{{ post.titulo }}</h5>
                        </router-link>
                        <div class="">
                            <p id="contentPost" class="card-text text-muted h-25 ">{{ removeTags(post.descricao) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex d-flex justify-content-center mt-4">
                <vue-awesome-paginate paginate-buttons-class="btn" active-page-class="btn-active"
                    back-button-class="back-btn" next-button-class="next-btn" :total-items="itensTotal"
                    :items-per-page="perPage" :max-pages-shown="5" v-model="currentPage"
                    :on-click="onClickHandler" :showEndingButtons="true" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment'

export default defineComponent({
    name: 'SuasDuvidas',
    setup() {
        const store = useStore()
        var user = computed(() => store.getters.getUser)
        var token = computed(() => store.getters.getToken)

        return {
            user,
            token
        }
    },
    data() {
        return {
            dataApi: {},
            currentPage: 1,
            totalPage: 1,
            itensTotal: 1,
            perPage: 1,
            pageble: {},
            imagem: "../assets/img_311846.png"
        }
    },
    methods: {
        async deleteDuvida(id) {
            await axios.delete(`http://localhost:8080/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((data) => {
                    console.log(data);
                    location.reload()
                }).catch((e) => {
                    console.log(e);
                })
        },
        async getDuvidas(page) {
            await axios.get(`http://localhost:8080/user/posts/${this.user.id}?page=${page - 1}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                this.dataApi = data.data.content
                this.pageble = data.data.pageable
                this.totalPage = data.data.totalPages
                this.itensTotal = data.data.totalElements
                this.perPage = data.data.pageable.pageSize
            }).catch((e) => {
                console.log(e);
            })

        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        },
        removeTags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();

            str = str.replace(/(<([^>]+)>)/ig, ' ');
            str = new DOMParser().parseFromString(str, "text/html");
            return str.documentElement.textContent.substring(0, 275) + '...'
        },
        onClickHandler(page) {
            this.getDuvidas(page);
        }
    },
    mounted() {
        this.onClickHandler(this.currentPage)
        this.imagem =  this.user.imagem;
        console.log(this.user.imagem.substr(18, 18 -5));
        console.log(this.user);
        
        
    }
})
</script>
    

<style scoped>
section {
    margin: 0 10%;
}

h5 {
    margin-right: 5px;
}

img{
  width: 35px;
  border-radius: 100%;
}

button {
    margin-left: 4px;
}
</style>
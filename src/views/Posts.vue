<template>
    <section class="m-3">
        <ul class="d-flex">
            <li>
                <input type="text" v-model="tags" @change="searchTag(tags)" placeholder="Search for some tag">
            </li>
            <li class="filtro-li fw-semibold" @click="getMelhores()" :class="{ 'filtro-li-active': melhores == 1 }">
                MELHORES</li>
            <li class="filtro-li fw-semibold" @click="getRecentes()" :class="{ 'filtro-li-active': melhores == 0 }">
                RECENTES</li>
        </ul>
    </section>
    <section>
        <div v-if="!contentEmpty" class="d-flex justify-content-center">
            <div class="d-block row col-4 col-md-12">
                <div v-if="!success">
                    <div v-for="i in dataApi" :key="i.id">
                        <Placeholder class="mt-5"></Placeholder>
                    </div>
                </div>
                <div v-else v-for="post in dataApi" :key="post.id" class="mt-3 post">
                    <PostComponent :post="post"></PostComponent>
                </div>
                <div class="d-flex d-flex justify-content-center mt-4">
                    <vue-awesome-paginate paginate-buttons-class="btn" active-page-class="btn-active"
                        back-button-class="back-btn" next-button-class="next-btn" :total-items="itensTotal"
                        :items-per-page="perPage" v-model="currentPage" :on-click="onClickHandler" :showEndingButtons="true"
                        :maxPagesShown="3" />
                </div>
            </div>
        </div>
        <div v-else>
            <h1>SEM CONTEÚDO!</h1>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostComponent from '@/components/PostComponent.vue'
import axios from 'axios'
import Placeholder from '@/components/Placeholder.vue'


export default defineComponent({
    name: 'PostsVue',
    components: {
        PostComponent,
        Placeholder
    },
    data() {
        return {
            dataApi: [],
            pageble: {},
            currentPage: 1,
            totalPage: 1,
            itensTotal: 1,
            perPage: 1,
            melhores: 0,
            tags: '',
            success: false,
            contentEmpty: true
        }
    },
    methods: {
        onClickHandler(page) {
            this.fetchPosts(page);
        },
        async fetchPosts(pageValue) {
            await axios.get(`http://localhost:8080/posts?page=${pageValue - 1}&melhores=${this.melhores}&tag=${this.tags}`)
                .then((data) => {
                    this.dataApi = data.data.content
                    this.pageble = data.data.pageable
                    this.totalPage = data.data.totalPages
                    this.itensTotal = data.data.totalElements
                    this.perPage = data.data.pageable.pageSize

                    this.contentEmpty = this.dataApi.length != 0 ? false : true

                    console.log(this.dataApi);
                    
                })
                .catch((error) => {
                    alert(error)
                    this.success = false
                    if (error.response.status == 404) {
                        this.$router.push("/View404")
                    }
                })
        },
        getMelhores() {
            this.melhores = 1
            this.fetchPosts(this.currentPage)
        },
        getRecentes() {
            this.melhores = 0
            this.fetchPosts(this.currentPage)
        },
        searchTag(tag) {
            this.tags = tag
            this.fetchPosts(this.currentPage)
        }
    },
    mounted() {
        setTimeout(() => {
            this.success = true
        }, 1000)
        this.onClickHandler(this.currentPage)
    }
})
</script>

<style scoped>
section {
    margin: 0 5%;
}


ul {
    list-style: none;
}

.filtro-li {
    text-decoration: none;
    color: black;
    padding: 2px;
    cursor: pointer;
    margin-left: 4px;
}

.filtro-li:hover {
    color: #697a73;
}

.filtro-li-active {
    color: #01944f;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
}
</style>

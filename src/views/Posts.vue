<template>
    <section class="m-3">
        <ul class="d-flex">
            <li>
                <input type="text" v-model="tags" @change="searchTag(tags)" placeholder="Pesquisar tag">
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
                <div class="d-flex justify-content-center">
                    <button type="button" @click="getMoreItens()" class=" mt-4 btn btn-primary">load more</button>
                </div>
            </div>
        </div>
        <div v-else>
            <Placeholder class="mt-5"></Placeholder>
            <Placeholder class="mt-5"></Placeholder>
            <Placeholder class="mt-5"></Placeholder>
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
            melhores: 0,
            tags: '',
            success: false,
            contentEmpty: true,
            streamItens: 4
        }
    },
    methods: {
        onClickHandler() {
            this.fetchPosts();
        },
        async fetchPosts() {
            await axios.get(`http://localhost:8080/posts/stream/${this.streamItens}?melhores=${this.melhores}&tag=${this.tags}`)
                .then((data) => {
                    this.dataApi = data.data

                    this.contentEmpty = this.dataApi.length != 0 ? false : true
                    setTimeout(()=>{
                        this.success = true
                    }, 1000)

                })
                .catch((error) => {
                    alert(error)
                    
                    setTimeout(()=>{
                        this.success = false
                    }, 3000)

                    if (error.response.status == 404) {
                        this.$router.push("/View404")
                    }
                })
        },
        getMelhores() {
            this.melhores = 1
            this.fetchPosts()
        },
        getRecentes() {
            this.melhores = 0
            this.fetchPosts()
        },
        searchTag(tag) {
            this.tags = tag
            this.fetchPosts()
        },
        getMoreItens(){
            this.streamItens += 4
            this.fetchPosts()
        }
    },
    mounted() {
        this.onClickHandler()
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

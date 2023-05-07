<template>
    <div class="conteiner">
        <div class="row">
            <div class="p-5">
                <div class="m-3">
                    <h1>TAGS</h1>
                    <section class="d-flex">
                        <div class="m-1 justify-content-center">
                            <ul class="d-flex flex-wrap">
                                <li class="m-1" v-for="tag in tags" :key="tag.id">
                                    <RouterLink to="" class="m-1 text-primary tag">
                                        {{ tag.tag }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'TagsVue',
    data() {
        return {
            tags: []
        }
    },
    methods: {
        async getTags() {
            await axios.get("http://localhost:8080/tags")
                .then((data) => {
                    this.tags = data.data
                    console.log('success');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.getTags()
    }
})
</script>

<style scoped>
ul {
    list-style: none;
}

a {
    text-decoration: none;
}
.row {
    margin-left: 0;
    margin-right: 0;
}

.tag{
    background-color: #abd2f1;
    padding: 2px 16px;
    margin-right: 10px;
    border-radius: 8px;
}
</style>
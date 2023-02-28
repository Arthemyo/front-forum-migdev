<template>
    <div class="conteiner">
        <div class="row p-5">
            <h1>TAGS</h1>
            <section class="d-flex justify-content-center pt-5">
                <div class="m-5">
                    <ul class="d-flex">
                        <li v-for="tag in tags" :key="tag.id">
                            <RouterLink to="" class="m-3 text-primary">
                                <div class="tag">{{ tag.tag }}</div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </section>
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
.tag {
    background: #d5e4fa;
}
</style>
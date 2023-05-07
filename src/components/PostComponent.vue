<template>
    <div class="conteiner">
        <div class="row d-flex justify-content-center">
            <div class="col-md-8">
                <div class="card shadow-sm ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <p class="d-flex text-bold mb-0 txt-nameUser">{{ post?.usuario.usuario }}</p>
                            </div>
                            <span class="text-muted">{{ format_date(post?.dataCriacao) }}</span>
                        </div>
                        <router-link :to="{ path: '/post/' + post?.id }" class="text-decoration-none ">
                            <h5 class="card-title ">{{ post?.titulo }}</h5>
                        </router-link>
                        <div class="">
                            <p id="contentPost" class="card-text text-muted h-25 ">{{ removeTags(post?.descricao) }}</p>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <div class="d-flex flex-wrap col-md-10">
                            <div class="tag m-1" v-for="tags in post?.tags" :key="tags.id">
                                <span>{{tags.tag}}</span>
                            </div>
                        </div>
                        <div class="d-flex col-md-2 like">
                            <spam class="text-muted">Like: {{post?.avaliacao}}</spam>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
    name: "PostComponent",
    data() {
        return {
            imagem: "data:image;base64,"
        }
    },
    props: {
        post: {
            type: Object
        }
    },
    methods:{
        removeTags(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();

            str = str.replace(/(<([^>]+)>)/ig, ' ');
            str = new DOMParser().parseFromString(str, "text/html");
            return str.documentElement.textContent.substring(0, 275) + '...'
        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        }
    }
})
</script>

<style scoped>
h5 {
    margin-right: 5px;
}

.tag{
    background-color: #d4d3d3;
    padding: 2px 16px;
    margin-right: 10px;
    border-radius: 8px;
}

.txt-nameUser{
    margin-top: 3px;
}

</style>
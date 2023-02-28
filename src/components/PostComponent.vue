<template>
    <div class="conteiner">
        <div class="row d-flex justify-content-center">
            <div class="col-md-8">
                <div class="card shadow-sm ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img v-if="imagem.substr(18, 18 -5) != 'null'" :src="imagem" alt="" class="p-1">
                                <img v-else src="../assets/img_311846.png" alt="" class="p-1"/>
                                <p class="d-flex text-muted mb-0  ">{{ post?.usuario.usuario }}</p>
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
                        <div class="d-flex">
                            <div class="tag" v-for="tags in post?.tags" :key="tags.id">
                                <span>{{tags.tag}}</span>
                            </div>
                        </div>
                        <div class="text-muted">Like: {{post?.avaliacao}}</div>
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
    },
    mounted(){
        this.imagem += this.post?.usuario.imagem
    }
})
</script>

<style>
h5 {
    margin-right: 5px;
}

img{
  width: 35px;
  border-radius: 100%;
}

.tag{
    background-color: #d4d3d3;
    padding: 2px 16px;
    margin-right: 10px;
    border-radius: 8px;
}
</style>
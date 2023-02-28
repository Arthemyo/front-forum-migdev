<template>
    <section class="conteiner d-flex justify-content-center mt-5">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Poste sua dúvida</h5>
                    <h6 class="card-subtitle text-muted mb-3">Seja o mais claro possível na sua dúvida.</h6>
                    <form>
                        <label class="mb-0 text-secondary" for="duvida">titulo *</label>
                        <input :disabled="user.nome ? false : true" type="text"
                            placeholder="Seja o mais exclarecedor possível" required v-model="titulo" class="w-100 p-1" id="duvida">
                        <label class="mb-0 text-secondary mt-3">Tags *<input required :disabled="user.nome ? false : true"
                                :onchange="showTags(tags)" class="w-100 p-1" type="text" v-model="tags"
                                placeholder="Separe as tags por espaço"></label>
                        <p class="mb-0 text-secondary mt-2">Sua dúvida *</p>
                        <div class="col-md-12 col-9 col-sm-6">
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"
                                :disabled="user.nome ? false : true"></ckeditor>
                        </div>
                        <span>{{erro}}</span>
                        <button class="btn btn-primary d-block mt-2" @click="addPost()">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
    name: "EditorVue",
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
            },
            tags: '',
            arrayStrings: [],
            erro: ''
        };
    },
    methods: {
        showTags(tags) {
            tags = tags.trim()
            this.arrayStrings = tags.split(" ")
        },
        async addPost() {
            await axios.post("http://localhost:8080/posts", {
                titulo: this.titulo,
                descricao: this.editorData,
                usuarioId: this.user.id,
                tags: this.arrayStrings
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                this.$router.push(`/post/${data.data.id}`)
            }).catch((e) => {
                console.log(e.response.data)
            })
        }
    },
    setup() {
        const store = useStore()
        const user = computed(() => store.getters.getUser)
        const token = computed(() => store.getters.getToken)

        var titulo = ''

        return {
            user,
            titulo,
            token
        }
    }
});
</script>
  
<style>
.ck-editor__editable[role="textbox"] {
    min-height: 150px;
}
</style>
  
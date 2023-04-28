<template>
    <Modal :mostrar="mostrar" title-modal="Atenção" id="modal">
        <ModalBody>
            <p>Você precisa está logado para fazer isso!!!</p>
        </ModalBody>
        <ModalFooter>
            <RouterLink @click="distroyModal()" to="/login"><button class="btn btn-success background">Logar</button>
            </RouterLink>
            <RouterLink @click="distroyModal()" to="/cadastro"><button class="btn btn-primary">Cadastrar</button>
            </RouterLink>
        </ModalFooter>
    </Modal>
    <section class="conteiner mb-3">
        <div class="row d-flex justify-content-center">
            <section class="col-md-8">
                <div class="card mt-3">
                    <div class="card-header">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <p class="d-flex text-bold mb-0">{{ nomeUsuario }}</p>
                            </div>
                            <span>{{ format_date(post.dataCriacao) }}</span>
                        </div>
                        <h4 class="card-title">{{ post.titulo }}</h4>
                    </div>
                    <div class="card-body">
                        <div v-html="post.descricao"></div>
                    </div>
                    <div class="card-footer d-flex">
                        <p class="text-muted">{{ numAvaliacoes }}</p> <span
                            @click="postCurtido ? descurtir(post.id) : curtir(post.id)"
                            class="btn-curtir fs-6 fw-semibold text-primary"><i id="likeBtn" data-bs-toggle="modal"
                                :class="{ 'fa-regular': !postCurtido, 'fa-solid': postCurtido }"
                                class=" fa-heart p-1"></i></span>
                    </div>
                </div>
            </section>
            <h2 class="d-flex justify-content-center mt-3">Respostas</h2>
            <hr>

            <section class="col-md-7 ">
                <div v-for="resposta in post.respostas" :key="resposta.id" class="resmt-3">
                    <Resposta :resposta="resposta"></Resposta>
                </div>
            </section>

            <div class="col-md-7 col-sm-9 col-9">
                <h4 class="text-muted">Envie sua resposta</h4>
                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="user.nome ? false : true">
                </ckeditor>
                <button class="btn btn-primary d-block mt-2" @click="setResponse()">Responder</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import axios from 'axios'
import moment from 'moment'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Resposta from '@/components/Resposta.vue'
import Modal from '@/components/Modal.vue'
import ModalBody from '@/components/ModalBody.vue'
import ModalFooter from '@/components/ModalFooter.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';


export default defineComponent({
    name: "PostVue",
    data() {
        return {
            avaliacao: 0,
            nomeUsuario: "",
            post: {},
            editor: ClassicEditor,
            editorData: "",
            editorConfig: {},
            postCurtido: false,
            textBtnLike: "",
            numAvaliacoes: 0,
            mostrar: false,
            modal: bootstrap
        };
    },
    methods: {
        async descurtir(postId) {
            await axios.delete(`http://localhost:8080/posts/rate/d/${postId}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                },
                data: {
                    usuarioId: this.user.id
                }
            })
                .then((data) => {
                    this.postCurtido = false;
                    this.textBtnLike = "Curtir";
                    this.numAvaliacoes = data.data;
                })
                .catch((err) => {
                    console.log(err);
                    console.log("not deslike");
                });
        },
        async userLikePost() {

            if (this.logado) {
                await axios.post(`http://localhost:8080/posts/rate/o/${this.id}`, {
                    usuarioId: this.user.id
                }, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then((data) => {
                        if (data.data) {
                            this.postCurtido = data.data;
                            this.textBtnLike = "Curtido";
                        }
                        else {
                            this.textBtnLike = "Curtir";
                        }
                    })
                    .catch(() => {
                        this.textBtnLike = "Curtir";
                        throw "Error2"
                    });
            }

            await axios.get(`http://localhost:8080/posts/rate/g/${this.id}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                this.numAvaliacoes = data.data;
            })
                .catch((err) => {
                    console.log(err);
                });
        },
        async curtir(postId) {
            await axios.post(`http://localhost:8080/posts/rate/${postId}`, {
                usuarioId: this.user.id
            }, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((data) => {
                    this.numAvaliacoes = data.data.avaliacao;
                    this.textBtnLike = "Curtido";
                    this.postCurtido = true;
                })
                .catch((err) => {
                    this.mostrar = true

                    if (err.response.status == 403) {

                        this.modal = new bootstrap.Modal('#modal', {
                            keyboard: false
                        })

                        this.modal.toggle()
                    }
                });
        },
        distroyModal() {
            this.modal.toggle()
        },
        async getPost() {
            await axios.get(`http://localhost:8080/posts/${this.id}`)
                .then((data) => {
                    this.post = data.data;
                    this.nomeUsuario = data.data.usuario.usuario;
                }).catch((err) => {
                    console.log(err);

                    if (err.response.status == 404) {
                        this.$router.push("/View404")
                    }

                });
        },
        async setResponse() {
            await axios.post(`http://localhost:8080/posts/resposta/${this.id}`, {
                descricao: this.editorData,
                usuarioEmail: this.user.email
            }, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                location.reload();
                return data;
            }).catch((err) => {
                this.mostrar = true

                if (err.response.status == 403) {

                    this.modal = new bootstrap.Modal('#modal', {
                        keyboard: false
                    })

                    this.modal.toggle()
                }

                console.log(err);
            });
        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format("DD/MM/YYYY");
            }
        }
    },
    mounted() {
        this.getPost();
        this.userLikePost();
    },
    setup() {
        const token = computed(() => store.getters.getToken);
        const store = useStore();
        var route = useRoute();
        const user = computed(() => store.getters.getUser);
        const logado = computed(() => store.getters.isLogado)

        var id = route.params.id;
        return {
            user,
            token,
            id,
            route,
            logado
        };
    },
    components: { Resposta, Modal, ModalBody, ModalFooter }
})
</script>

<style scoped>
.btn-curtir:hover {
    color: black;
    cursor: pointer;
}

.btn-curtir {
    margin-left: 5px;
}

.background {
    background-color: #489d75;
}

i:hover {
    cursor: pointer;
}

.row {
    margin-left: 0;
    margin-right: 0;
}
</style>

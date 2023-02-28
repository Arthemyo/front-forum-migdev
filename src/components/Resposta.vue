<template>
    <Modal :mostrar="mostrar" title-modal="Atenção" id="mmodal">
        <ModalBody>
            <p>Você precisa está logado para avaliar essa resposta!!!</p>
        </ModalBody>
        <ModalFooter>
            <RouterLink @click="distroyModal()" to="/login"><button class="btn btn-success background">Logar</button>
            </RouterLink>
            <RouterLink @click="distroyModal()" to="/cadastro"><button class="btn btn-primary">Cadastrar</button>
            </RouterLink>
        </ModalFooter>
    </Modal>
    <div class="d-flex justify-content-between">
        <div class="d-flex">
            <img v-if="imagem !== 'data:image;base64,null'" :src="imagem" alt="" class="p-1">
            <img v-else src="../assets/img_311846.png" alt="" class="p-1" />
            <p class="d-flex text-muted mb-0">{{ resposta?.nomeUsuario }}</p>
        </div>
        <span>{{ format_date(resposta?.dataCriacao) }}</span>
    </div>
    <div class="p-1">
        <p v-html="resposta?.descricao"></p>
    </div>

    <div class="d-flex justify-content-between util-res p-3">
        <span>{{ resposta?.avalicao }}</span>
        <div class="d-flex">
            <div>
                <p class="text-muted txt-ava">Essa resposta ajudou você?</p>
            </div>
            <div v-if="(status != 201)">
                <i class="fa-solid fa-arrow-up p-1" @click="rankRes(true, resposta?.id)"></i>
                <i class="fa-solid fa-arrow-down p-1" @click="rankRes(false, resposta?.id)"></i>
            </div>
            <div v-else>
                <p class="font-res p-res text-black-50 p-1">Obrigado por avaliar!</p>
            </div>
        </div>
    </div>
    <hr>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import moment from 'moment'
import axios from 'axios'
import { useStore } from 'vuex'
import Modal from '@/components/Modal.vue'
import ModalBody from '@/components/ModalBody.vue'
import ModalFooter from '@/components/ModalFooter.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default defineComponent({
    name: 'RevpostVue',
    components: {Modal, ModalBody, ModalFooter},
    props: {
        resposta: {
            type: Object
        }
    },
    data() {
        return {
            getRankRes: null,
            status: 0,
            imagem: "data:image;base64,",
            mostrar: false,
            modal: bootstrap
        }
    },
    setup() {
        const token = computed(() => store.getters.getToken);
        const store = useStore();
        const user = computed(() => store.getters.getUser);
        const logado = computed(() => store.getters.isLogado)

        return {
            user,
            token,
            logado
        };
    },
    mounted() {

        this.getRank(this.resposta?.id)
        this.imagem += this.resposta?.imagem
    },
    methods: {
        async getRank(id) {
            if (this.logado) {
                await axios.post(`http://localhost:8080/respostas/rank/ub/${id}`, {
                    usuarioId: this.user.id
                }, {
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(data => {
                        this.status = data.status
                        this.getRankRes = data.data
                    })
            }
        },
        async rankRes(up, id) {
            await axios.post(`http://localhost:8080/respostas/rank/u/${id}`, {
                usuarioId: this.user.id,
                aprovacao: up
            }, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(() => {
                    location.reload()
                })
                .catch(err => {
                    this.mostrar = true

                    if (err.response.status == 403) {

                        this.modal = new bootstrap.Modal('#mmodal', {
                            keyboard: false
                        })

                        this.modal.toggle()
                    }
                    console.log(err)
                });
        },
        distroyModal() {
            this.modal.toggle()
        },
        format_date(value) {
            if (value) {
                return moment(String(value)).format("DD/MM/YYYY");
            }
        }
    }
})
</script>

<style scoped>
img {
    width: 35px;
    border-radius: 100%;
}

.util-res {
    background-color: rgb(245, 243, 243);
}

.btn-curtir:hover {
    color: black;
    cursor: pointer;
}

.btn-curtir {
    margin-left: 5px;
}

.language-plaintext {
    background: blue;
}

.font-res {
    font-size: 0.8rem;
}

.txt-ava {
    margin-right: 3px;
}

i:hover {
    cursor: pointer;
}

.p-res {
    background-color: rgb(198, 195, 195)
}
</style>
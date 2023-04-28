<template>
    <div class="d-flex justify-content-between">
        <div class="d-flex">
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
import { useToast } from "vue-toastification";

export default defineComponent({
    name: 'RevpostVue',
    props: {
        resposta: {
            type: Object
        }
    },
    data() {
        return {
            getRankRes: null,
            status: 0
        }
    },
    setup() {
        const token = computed(() => store.getters.getToken);
        const store = useStore();
        const user = computed(() => store.getters.getUser);
        const logado = computed(() => store.getters.isLogado)

        const toast = useToast();

        return {
            user,
            token,
            logado,
            toast
        };
    },
    mounted() {

        this.getRank(this.resposta?.id)
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
                    this.$router.go(0)
                    this.toast.success("Resposta avaliada!");
                }).catch(err => {
                    if (err.response.status == 403) {
                        this.toast.warning("Precisa estar logado!");
                    }
                    console.log(err)
                });
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
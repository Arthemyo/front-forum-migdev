<template>
    <section class="conteiner">
        <div class="row d-flex justify-content-center pt-5">
            <div class="col-md-4 mt-4">
                <form>
                    <div class="d-block">
                        <label class="d-block mt-2 fw-light">Senha<input v-model="senha" id="senha" type="email"
                                class="form-control d-block" placeholder="Digite sua nova senha"></label>
                        <label class="d-block mt-2 fw-light">Confirme a senha<input v-model="senhaConfirm" id="senha"
                                type="email" class="form-control d-block"
                                placeholder="Confirme a senha"></label>
                        <button class="btn btn-primary mt-2" type="button" @click="changePassword()">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from "vue-toastification";
export default defineComponent({
    name: 'RecoveryPassword',
    data() {
        return {
            senha: '',
            senhaConfirm: ''
        }
    },
    setup() {
        var route = useRoute()
        var code = route.params.code
        const toast = useToast();

        return {
            code,
            toast
        }
    },
    methods: {
        async changePassword() {
            await axios.patch(`http://localhost:8080/user/changePassword?code=${this.code}`, {
                senha: this.senha,
                senhaConfirm: this.senhaConfirm
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(data => {
                console.log(data)
                this.$router.push('/login')
                this.toast.success('Senha mudada com sucesso!')
            }).catch(e => console.log(e));
        }
    }
})
</script>

<style scoped>
.row {
    margin-left: 0;
    margin-right: 0;
}
</style>
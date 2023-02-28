<template>
    <div class="conteiner row">
        <div class=" d-flex justify-content-center mt-5">
            <div class="col-md-6">
                <form action="post">
                    <div class="">
                        <div class="">
                            <label class="fw-light">Usuario<input required type="text" v-model="usuario"
                                    placeholder="Digite seu primeiro nome" class="form-control" /></label>
                        </div>
                        <div class="">
                            <label class="fw-light">Email<input v-model="email" required type="email"
                                    placeholder="Informe um email util" class="form-control" /></label>
                            <span class="text-danger" :hidden="erro ? true : false">Esse email já existe.</span>
                            <label class="fw-light">Senha<input v-model="senha" required type="password"
                                    placeholder="Crie uma senha segura" class="form-control" /></label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary mt-3" @click="cadastro()">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'CadastroVue',
    data() {
        return {
            usuario: '',
            sobrenome: '',
            email: '',
            senha: '',
            erro: true
        }
    },
    methods: {
        async cadastro() {
            await axios.post('http://localhost:8080/user', {
                "usuario": this.usuario,
                "email": this.email,
                "senha": this.senha
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                this.$router.push('/email_success/' + data.data.email)
            })
                .catch((e) => {
                    console.log(e);
                    this.erro = false
                }
                )
        }
    }
})
</script>
    

<style scoped>
input,
label {
    display: block;
}

label {
    margin-top: 10px;
}
</style>

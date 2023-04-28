<template>
    <section class="conteiner">
        <div class="row d-flex justify-content-center  pt-5 mb-5">
            <div class="col-md-6 mt-4">
                <form>
                    <div class="d-block">
                        <label class="d-block mt-2 fw-light">Email<input  v-model="email" id="senha" type="email"
                                class="form-control d-block" placeholder="Digite seu email para recuperar a senha"></label>
                                <button class="btn btn-primary mt-2" @click="getEmail()" type="button">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ForgotPassword',
    data(){
        return {
            email: ''
        }
    },
    methods: {
        async getEmail(){
            if(this.email != null){
                await axios.post('http://localhost:8080/user/recovery_password/' + this.email).then(()=>{
                    this.$router.push('/success-change-password')
                    .catch(e => {
                        console.log(e);
                    })
                });
            }
            
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
<template>
    <section class="conteiner row">
        <div class="d-flex justify-content-center mt-5">
            <div class="d-block p-5 ">
                <h3 class="col-md-12 fs-3 text text-success ">Seu email foi verificado com sucesso!</h3>
                <h2 class="text fs-5 col-md-9">Agora realize o login e tire suas dúvidas</h2>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'EmailSuccess',
    methods:{
        async fetchVerufy(){
            await axios.get("http://localhost:8080/user/verify?code=" + this.code)
            .then((data)=>{
                console.log(data.data)
            })
            .catch((e)=>{
                console.log(e);
                
            })
        }
    },
    mounted(){
        this.fetchVerufy()
    },
    setup(){
        var route = useRoute()
        var code = route.params.code

        return{
            code
        }
    }
})
</script>
    

<style scoped>

</style>

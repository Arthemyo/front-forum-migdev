<template>
    <div class="conteiner">
        <div class="row p-5">
            <div class="m-1 d-flex justify-content-center pt-5">
                <div class="col-md-6">
                    <div class="d-flex">
                        <div>
                            <img v-if="user.imagem.substr(18, 18 - 5) != 'null'" :src="user.imagem" alt="" class="p-1 mb-3 img-thumbnail">
                            <img v-else src="../assets/img_311846.png" alt="" class="p-1 img-thumbnail" />
                        </div>
                        <div class="mt-3 p-3">
                            <p class="fw-light">{{ user.email }}</p>
                        </div>
                    </div>
                    <input class="form-control" type="file" id="imagem" placeholder="Nome Do Autor" accept="image/*" />
                    <input @click="patchImage()" type="submit" value="Upload File" id="buttom"
                        class="btn mt-3 bg-primary" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
    name: "UserVue",
    setup() {
        const store = useStore()
        var user = computed(() => store.getters.getUser)
        var token = computed(() => store.getters.getToken)

        return {
            user,
            token,
            store
        }
    },
    methods: {
        async patchImage() {

            var file = document.getElementById('imagem')?.files[0]

            var form = new FormData();

            form.append('file', file)

            await axios.patch(`http://localhost:8080/user?email=${this.user.email}`, form, {
                headers: {
                    "Authorization": `Bearer ${this.token}`,
                    "Content-Type": "multipart/form-data;"
                }
            }).then((data) => {
                sessionStorage.setItem('IMAGEM', "data:image;base64," + data.data.imagem)
                this.user.imagem = sessionStorage.getItem('IMAGEM')
                this.store.commit('SET_USER', this.user)

            }).catch((err) => {
                console.log(err);
            });
        }

    }
})
</script>

<style scoped>
img {
    width: 125px;
}

.row {
    margin-left: 0;
    margin-right: 0;
}
</style>
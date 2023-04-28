<template>
    <footer class="bg-dark mt-0 conteiner d-flex justify-content-center align-items-center"
        style="height: 10rem;">
        <div class="m-3">
            <p class="text-light d-flex mt-4 logo col-md-2 fs-3">Migdev</p>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FooterVue'
})
</script>

<style scoped>
.logo {
    font-family: 'Anton', sans-serif;
    font-size: 18px;
    margin-left: 1.5rem;
}

p {
    margin-left: 1.5rem;
}

ul {
    text-decoration: none;
    list-style: none;
}

li {
    padding-left: 10px;
}
</style>
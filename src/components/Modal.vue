<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ titleModal }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ModalVue',
    props: {
        mostrar: {
            type: Boolean,
            required: true
        },
        titleModal: {
            type: String,
            required: true
        },
        id:  {
            type: String,
            required: true
        }
    }
})
</script>

<style scoped>

</style>
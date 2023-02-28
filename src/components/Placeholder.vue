<template>
    <div class="card shadow-sm placeholder-glow">
        <div class="card-body">
            <div class="d-flex justify-content-between" >
                <div class="d-flex placeholder pl-info w-25">
                    <img src="" alt="" class="p-1">
                    <p class="d-flex text-muted mb-0"></p>
                </div>
                <span class="text-muted placeholder pl-date w-25"></span>
            </div>
            <a class="text-decoration-none">
                <h5 class="card-title"></h5>
            </a>
            <div class="">
                <p id="contentPost" class="w-100 body-placeholder card-text text-muted h-25 placeholder"></p>
                <p id="contentPost" class="w-75 body-placeholder card-text text-muted h-25 placeholder"></p>
                <p id="contentPost" class="w-50 body-placeholder card-text text-muted h-25 placeholder"></p>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <div class="d-flex">
                <div class="tag placeholder">
                    <span class="placeholder"></span>
                </div>
            </div>
            <div class="text-muted placeholder"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PlaceholderVue'
})
</script>

<style scoped>
.body-placeholder{
    width: 420px;
}
</style>


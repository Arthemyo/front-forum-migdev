<template>
  <div class="conteiner">
    <div class="row">
      <Header />
      <div class="col-md-2 bl">
        <BarraLateral></BarraLateral>
      </div>
      <main class="col-md-10 p-0 mb-5">
        <div class="row">
          <div class="p-0">
            <router-view></router-view>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import BarraLateral from './components/BarraLateral.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "App",
  components: { Header, Footer, BarraLateral },
  setup(){
    var route = useRoute()
    var path = route.path

    return {
      path
    }
  }
});
</script>

<style scoped>

.bl{
  padding: 0;
}

.conteiner{
  padding: 0;
}
.row {
    margin-left: 0;
    margin-right: 0;
}

main{
  padding: 0;
}

</style>

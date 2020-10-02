<template>
  <div class="home">
    <div class="pageOne">
      <Welcome />
      <GoogleMaps :showCoord="true" />
    </div>
    <div class="pageTwo">
      <h1>About</h1>
      <About />
    </div>
    <div class="pageThree">
      <h1>Who we are</h1>
      <Team />
    </div>
    <div class="pageFour">
      <h1>Want to Contribute?</h1>
      <AddCollection />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps.vue'
import Welcome from '@/components/Welcome.vue'
import About from '@/components/About.vue'
import Team from '@/components/Team.vue'
import AddCollection from '@/components/AddCollection.vue'

export default {
  name: 'Home',
  components: {
    GoogleMaps,
    Welcome,
    About,
    AddCollection,
    Team
  }
}
</script>

<style scoped lang="scss">
.pageOne{
  display: flex;
  width: 100%;
  height: 100vh
}
.pageTwo{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pageThree{
  display: flex;
  flex-direction: column;
  width: 100%;
}
h1{
  font-weight: 200;
}
</style>



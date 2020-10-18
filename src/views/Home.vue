<template>
  <div class="home">
    <div class="pageOne">
      <Welcome />
      <GoogleMaps 
        class="map" 
        :showInput="false" 
        :data="state.mapData"
      />
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
    <div class="pageFive">
      <AddComment />
    </div>
    <div class="pageSix">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps.vue'
import Welcome from '@/components/Layout/Welcome.vue'
import About from '@/components/Layout/About.vue'
import Team from '@/components/Layout/Team.vue'
import AddCollection from '@/components/Layout/AddCollection.vue'
import Footer from '@/components/Layout/Footer.vue'
import AddComment from '@/components/Layout/AddComment'
import {onMounted, reactive} from '@vue/composition-api'
import db from '@/utils/firebase'

export default {
  name: 'Home',
  components: {
    GoogleMaps,
    Welcome,
    About,
    AddCollection,
    Footer,
    Team,
    AddComment
  },
  setup() {
    const state = reactive({
      mapData: []
    })
    onMounted(() => {
          db.collection('businesses').get().then(item => {
            item.forEach(doc => {
              let data = doc.data()
              state.mapData.push({ position: data })
            })
          })
        })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.pageOne{
  display: flex;
  width: 100%;
  height: 100%
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
.pageFour{
  width: 100%;
  height: 100%;
}
.pageFive{
  width: 100%;
  height: 100%;
}
.pageSix{
  display: flex;
  width: 100%;
  height: 100%;
}
h1{
  font-weight: 200;
}
.map{
  height: 100vh;
  width: 50%;
}

@media only screen and (max-width: 1000px) {

  .pageOne{
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    .map{
      width: 100%
    }
  }
  
}
</style>



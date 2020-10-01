<template>
  <div class="home">
    <div class="welcome">
      welcome
    </div>
    <GoogleMaps />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '@/components/GoogleMaps.vue'

export default {
  name: 'Home',
  components: {
    GoogleMaps
  }
}
</script>

<style scoped lang="scss">
.home{
  display: flex;
  width: 100%;
  height: 100vh
}
.welcome{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}
</style>



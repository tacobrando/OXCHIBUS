<template>
  <div class="map">
    <GmapMap
      :center="state.OXFORD"
      :zoom="10"
      ref="map"
      class="google-maps"
      map-type-id="terrain"
    >
      
    </GmapMap>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'GoogleMaps',
  setup() {
    const state = reactive({
      OXFORD: { lat: 51.752022, lng: -1.257677 },
    })
    return {
      state
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map{
  width: 50%;
  height: 100%;
}
.google-maps{
    height: 100%;
    width: 100%;
}
</style>

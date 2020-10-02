<template>
  <div class="map fade-in">
    <GmapMap
      :center="state.OXFORD"
      :zoom="10"
      ref="map"
      :options="state.mapStyle"
      class="google-maps"
      map-type-id="terrain"
    >
      <MapMarker v-if="showCoord" :mapData="state.mapData" />
    </GmapMap>
  </div>
</template>

<script>
import db from '@/utils/firebase'
import { reactive, onMounted } from '@vue/composition-api'
import mapStyles from './mapStyles.js'
import MapMarker from './MapMarker'

export default {
  name: 'GoogleMaps',
  components: {
    MapMarker
  },
  props: {
    showCoord:{
      type: Boolean,
      required: true
    }
  },
  setup() {
    const state = reactive({
      OXFORD: { lat: 51.752022, lng: -1.257677 },
      mapData: [],
      mapStyle: {
          streetViewControl: false,
          rotateControl: false,
          mapTypeControl: false,
          minZoom: 9,
          restriction: {
            latLngBounds: {
                north: 51.83,
                south: 51.66,
                west: -1.44,
                east: -1.07
            },
            strictBounds: false,
          },
          styles: mapStyles
      }
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

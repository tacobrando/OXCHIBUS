<template>
  <div class="map fade-in">
    <GmapMap
      :center="state.OXFORD"
      :zoom="11"
      ref="map"
      :options="state.mapStyle"
      class="google-maps fade-in"
      map-type-id="terrain"
    >
    <GmapCluster :zoomOnClick="true">
      <GmapMarker 
        v-for="(pos, index) in data" 
        :data="pos" 
        :position="pos.position"
        :clickable="true"
        :draggable="false"
        @click="infoBox(pos, index)"
        :key="index" 
        :index="index" />
    </GmapCluster>
      <GmapMarker v-if="state.showMark" :data="state.position" />
      <GmapInfoWindow 
        class="info-window"
        v-if="state.pos !== undefined"
        :options="state.infoOptions" 
        :position="state.infoWindowPos" 
        :opened="state.infoWinOpen"
        @closeclick="state.infoWinOpen=false"
      >
        <span @click="infoBox" class="close-btn">
          <h3 style="margin: 0; font-weight: 500">X</h3>
        </span>
        <div class="info">
            <h3>{{state.pos.business_name}}</h3>
            <p v-if="state.pos.close_year">{{state.pos.open_year}} - {{state.pos.close_year}}</p>
            <p v-else>{{state.pos.open_year}}</p>
            <p>{{state.pos.address}}</p>
            <p>Owner: {{state.pos.owner}}</p>
            <p>{{state.pos.description}}</p>
            <img 
              v-if="state.pos.imageUrl" 
              :src="state.pos.imageUrl" 
              @click="imageModal(state.pos.imageUrl)"
            />
            <p 
              v-if="state.pos.imageCapOne && state.pos.imageUrl"
            > 
              {{state.pos.imageCapOne}} 
            </p>
            <img 
              v-if="state.pos.imageUrlTwo" 
              class="businessImage" 
              :src="state.pos.imageUrlTwo" 
              @click="imageModal(state.pos.imageUrlTwo)"
            />
            <p 
              v-if="state.pos.imageCapTwo && state.pos.imageUrlTwo"
            > 
              {{state.pos.imageCapTwo}} 
            </p>
            <img 
              v-if="state.pos.imageUrlThree"
              class="businessImage" 
              :src="state.pos.imageUrlThree" 
              @click="imageModal(state.pos.imageUrlThree)"

            />
            <p 
              v-if="state.pos.imageCapThree && state.pos.imageUrlThree"
            > 
              {{state.pos.imageCapThree}} 
            </p>
            <img 
              v-if="state.pos.imageUrlFour" 
              class="businessImage" 
              :src="state.pos.imageUrlFour" 
              @click="imageModal(state.pos.imageUrlFour)"
            />
            <p 
              v-if="state.pos.imageCapFour && state.pos.imageUrlFour"
            > 
              {{state.pos.imageCapFour}} 
            </p>
        </div>
      </GmapInfoWindow>
      
    </GmapMap>
    <ImageModal @toggle="imageModal('')" v-if="state.imageModal">
      <img class="modal-img" :src="state.imgUrl" alt="">
    </ImageModal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import mapStyles from './mapStyles.js'
import ImageModal from './ImageModal'


export default {
  name: 'GoogleMaps',
  components: {
    ImageModal
    
  },
  props: {
    data:{
      type: Array,
      required: false
    },
    showInput:{
      type: Boolean,
      required: true
    }
  },
   
  setup() {
    const state = reactive({
      OXFORD: { lat: 51.752022, lng: -1.257677 },
      mapData: [],
      pos: [],
      index: null,
      position: null,
      showMark: false,
      imageModal: false,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      imgUrl: '',
      infoOptions: {
          pixelOffset: {
          width: 0,
          height: -35
          }
      },
      mapStyle: {
          streetViewControl: false,
          rotateControl: false,
          mapTypeControl: false,
          minZoom: 11,

          styles: mapStyles
      }
    })

    function imageModal(url) {
      state.imgUrl = url
      state.imageModal = !state.imageModal
    }

    function infoBox(pos, index) {
      state.pos = pos.position
      state.infoWindowPos = pos.position;
      if(state.currentMidx == index) {
        state.infoWinOpen = !state.infoWinOpen
      } else {
        state.infoWinOpen = true;
        state.currentMidx = index
      }
    }

    return {
      state,
      infoBox,
      imageModal
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-img{
  width: 100%;
  height: 100%;
}
.map{
  width: 100%;
  height: 100%;
}
.google-maps{
    height: 100%;
    width: 100%;
}
.close-btn{
  position: absolute;
  left: 94%;
  cursor: pointer;
}
img{
  width: 200px;
  height: 20%;
  margin: 5px;
  cursor: pointer;
}

.info{
  overflow-y: auto;
  width: 250px;
  max-height: 250px;
}
.info-window{
  max-width: 100%;
}
@media only screen and(max-width: 800px) {
  .info{
    width: 100%;
    max-height: 250px;
    margin: 0
  }
  .info-window{
    max-width: 100%;
  }
  img{
    width: 100%;
    margin: 0;
  }
}
</style>

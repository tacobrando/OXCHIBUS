<template>
   <gmap-autocomplete 
    @place_changed="addMarker" 
    :options="{
        bounds: state.OXFORD_BOUNDS,
        strictBounds: true, 
        fields: ['geometry', 'formatted_address']
    }" 
    class="introInput"
  >
    </gmap-autocomplete>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
    setup(props, ctx) {
        const state = reactive({
            OXFORD: { lat: 51.752022, lng: -1.257677 },
            OXFORD_BOUNDS: {
                north: 51.85124106775668, 
                south: 51.63866880250183, 
                west: -1.4912060546874883 , 
                east: -1.0187939453124883
            },
            currentPlace: null,
            markers: [],
            places: [],
            
        })
        function addMarker(place) {
            state.markers = []
            state.currentPlace = place
            const info = {
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
            ctx.emit('set-marker', info)
            
        }
        return {
            state,
            addMarker
        }
    }
}
</script>

<style scoped lang="scss">
.introInput{
    height: 37px;
    width: 50%;
    border: 1px solid #dcdfe6;
    margin: 20px;
    border-radius: 5px;
}

</style>
<template>
   <gmap-autocomplete @place_changed="addMarker" :options="{bounds: state.OXFORD_BOUNDS,strictBounds: true, fields: ['geometry', 'formatted_address']}" class="introInput" >
    </gmap-autocomplete>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
    setup(props, ctx) {
        const state = reactive({
            OXFORD: { lat: 51.752022, lng: -1.257677 },
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
}

</style>
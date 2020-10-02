<template>
  <div class="marker">
    <GmapMarker
        :key="index"
        v-for="(m, index) in mapData"
        :position="m.position"
        :clickable="true"
        :draggable="false"
    >
    </GmapMarker>
  </div>
</template>

<script>
export default {
    props: {
        mapData: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">

</style>
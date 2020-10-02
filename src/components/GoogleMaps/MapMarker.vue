<template>
  <div class="marker">
    <GmapMarker
        @click="showInfo"
        v-if="data"
        :position="data.position"
        :clickable="true"
        :draggable="false"
    >
    </GmapMarker>
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    setup(props) {
      function showInfo() {
        console.log(props.data.position)
      }

      return {
        showInfo
      }
    }
}
</script>

<style scoped lang="scss">

</style>
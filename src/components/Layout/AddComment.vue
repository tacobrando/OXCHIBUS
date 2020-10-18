<template>
  <div class="add-comment">
    <h1>Add Comment</h1>
    <textarea name="add-comment" rows="4" cols="40" />
  </div>
</template>

<script>
export default {
  name: "AddComment"

}
</script>

<style lang="scss" scoped>
.add-comment{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
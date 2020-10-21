<template>
  <div class="reply">
    <div class="container">
      <div class="user-details">
        <h4>{{ reply.name }}</h4>
        <p>{{ reply.date }}</p>
      </div>
      <div class="comment-content">
        <p>{{ reply.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    reply: {
      type: Object,
      required: true
    },
  }

}
</script>

<style scoped lang="scss">
.reply {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;

    p, h4{
      margin: 5px;
    }

  .container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px;
    width: 100%;

    .user-details {
      display: flex;
      align-items: center;
      
      p {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
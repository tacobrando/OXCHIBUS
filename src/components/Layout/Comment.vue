<template>
  <div class="comment slide-in-up">
    <div class="container">
      <div class="user-details">
        <h4>{{ comment.name }}</h4>
        <p>{{ comment.date }}</p>
      </div>
      <div class="comment-content">
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {

  }
}
</script>

<style scoped lang="scss">
.comment {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 5px;
  width: 50%;

  .container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;

    .user-details {
      display: flex;
      align-items: center;
      
      p {
        font-size: 0.8rem;
      }
    }
    
    p, h4{
      margin: 5px;
    }

  }
}

@media only screen and (max-width: 1000px) {
  .comment {
    width: 80%
  }
}
@media only screen and (max-width: 800px) {
  .comment {
    width: 90%
  }
}
</style>
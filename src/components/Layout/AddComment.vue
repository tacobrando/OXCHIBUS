<template>
  <div class="add-comment">
    <h1>Leave a comment</h1>
    <form method="post" @submit.prevent="addComment">
      <div class="username">
        <p>Name</p>
        <input type="text" v-model="state.username">
      </div>
      <div class="comment-box">
        <p>Comment</p>
        <textarea placeholder="Write a comment...." v-model="state.comment" rows="4" cols="40" />
      </div>
      <div class="submit-btn">
        <button>Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: "AddComment",
  setup(props, ctx) {
    const state = reactive({
      comment: '',
      username: ''
    })

    function addComment() {
      if(state.comment !== '' && state.username !== '') {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        ctx.emit('addComment', {
          name: state.username,
          content: state.comment,
          date: today
        })
      }
    }

    return {
      state,
      addComment
    }
  }

}
</script>

<style lang="scss" scoped>
.add-comment{
  display: flex;
  flex-direction: column;

  .username {
    margin: 5px;

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 10px;
        width: 250px;
      }

    p {
      margin: 2px;
    }
  }
  .comment-box{
    textarea{
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      padding: 10px;
      width: 300px;
    }
  }
}

</style>
<template>
  <div class="add-comment">
    <h1>Leave a comment</h1>
    <form method="post" @submit.prevent="addComment">
      <div class="username">
        <p>Name</p>
        <input required type="text" v-model="state.username">
      </div>
      <div class="comment-box">
        <p>Comment</p>
        <textarea required placeholder="Write a comment...." v-model="state.comment" rows="4" cols="40" />
      </div>
      <div class="submit-btn">
        <button>SUBMIT</button>
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
        const time = new Date().toLocaleString('en-GB', {
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true
        })
        const date = new Date().toLocaleDateString()
        const today = `${date}, ${time}`

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

  p {
    margin: 10px;
  }

  h1 {
    margin-bottom: 10px;
  }

  .username {
    margin: 5px;

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 10px;
        width: 250px;
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
  .submit-btn {
    button{
      margin-top: 5px;
      width: 150px;
      border-radius: 5px;
      height: 37px;
      border: 1px solid #dcdfe6;
      color: #606266;
      background-color: white;
      transition: 0.3s;

      &:hover{
        background: rgb(221, 221, 221)
      }
    }
  }
}

</style>
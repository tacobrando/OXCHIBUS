<template>
  <div class="add-comment">
    <form method="post" id="comment-form" @submit.prevent="addComment">
      <div class="username">
        <p>Name</p>
        <input required type="text" v-model="state.form.username">
      </div>
      <div class="comment-box">
        <p>Comment</p>
        <textarea required placeholder="Write a comment...." v-model="state.form.comment" rows="4" cols="40" />
      </div>
      <div class="captcha">
        <p>Robot Check</p>
        <VueRecaptcha 
          ref="recaptcha" 
          @verify="onVerify"
          :sitekey="state.siteKey"
        >
        </VueRecaptcha>
      </div>
      <div class="submit-btn">
        <button>SUBMIT</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: "AddComment",
  components: { VueRecaptcha },
  setup(props, ctx) {
    const state = reactive({
      form: {
        username: '',
        comment: '',
        robot: false
      },
      siteKey: process.env.VUE_APP_RECAPTCHA_KEY
    })

    function addComment() {
      if(state.form.robot) {
        const time = new Date().toLocaleString('en-GB', {
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true
        })
        const date = new Date().toLocaleDateString()
        const today = `${date}, ${time}`
        const timestamp = new Date().getTime();

        ctx.emit('addComment', {
          name: state.form.username,
          content: state.form.comment,
          replies: [],
          date: today,
          timestamp: timestamp
        })

        state.form.robot = false
      }
    }

    function onVerify(response) {
      if (response) state.form.robot = true
    }

    return {
      state,
      addComment,
      onVerify
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
  .captcha{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .submit-btn {
    button{
      margin-top: 20px;
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
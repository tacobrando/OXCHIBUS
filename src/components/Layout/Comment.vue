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
      <div class="reply-btn">
        <span v-if="!state.replyBox" @click="reply">
          <p>Reply</p>
        </span>
        <span v-if="state.replyBox" @click="cancel">
          <p>Cancel</p>
        </span>
      </div>
      <div v-if="state.replyBox" id="reply-box" class="fade-in">
        <form 
          class="reply-box"
          method="post" 
          @submit.prevent="replyComment"
        >
          <p>Name:</p>
          <input required v-model="state.form.name" type="name">
          <p>Reply:</p>
          <textarea required maxlength="250" v-model="state.form.replyMsg" id="replyBox" name="reply" rows="5">
          </textarea>
          <p style="font-size: 0.7rem;margin-bottom: 10px">Character Count: {{ state.charCount }}/250</p>
          <VueReCaptcha
            required 
            class="captcha"
            ref="recaptcha" 
            @verify="onVerify"
            :sitekey="state.siteKey"
          >
          </VueReCaptcha>
          <button>Submit</button>
        </form>
      </div>
      <div class="replies">
        <Reply 
          v-for="reply in comment.replies" 
          :reply="reply"
          :key="reply.id" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import Reply from '@/components/Comment/Reply'
import VueReCaptcha from 'vue-recaptcha'

export default {
  name: 'Comment',
  components: { Reply, VueReCaptcha },
  props: {
    comment: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, ctx) {
    const state = reactive({
      form: {
        name: '',
        replyMsg: '',
        robot: false
      },
      siteKey: process.env.VUE_APP_RECAPTCHA_KEY,
      replyBox: false,
      charCount: computed(() => state.form.replyMsg.length),
      
    })
    function reply() {
      state.replyBox = true
    }
    function onVerify(response) {
      if (response) state.form.robot = true
    }

    function cancel() {
      let element = document.getElementById('reply-box')
      element.classList.remove('fade-in')
      element.classList.add('fade-out')
      setTimeout(() => {
        state.replyBox = false
      }, 100)
    }

    function replyComment() {
      if(state.charCount > 0) {
        const time = new Date().toLocaleString('en-GB', {
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true
        })
        const date = new Date().toLocaleDateString()
        const parsedDate = `${date}, ${time}`
        const timestamp = new Date().getTime();

        ctx.emit('reply', {
          name: state.form.name,
          content: state.form.replyMsg,
          date: parsedDate,
          timestamp: timestamp,
          parentId: props.comment.docId
        })

        state.form.replyMsg = ''
        state.replyBox = false
        state.form.robot = false
      }
    }

    return {
      reply,
      cancel,
      state,
      replyComment,
      onVerify
    }
  }
}
</script>

<style scoped lang="scss">
.comment {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 5px;
  width: 90%;

  .container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    width: 100%;

    .replies {
      width: 98%
    }

    .user-details {
      display: flex;
      align-items: center;
      
      p {
        font-size: 0.8rem;
      }
    }

    .reply-box{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      margin-left: 5px;
      padding: 20px;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      
      p{
        margin: 0;
        margin-bottom: 5px;
      }

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        padding: 7px;
        width: 150px;
        margin-bottom: 5px
      }

      textarea {
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
      }

      button{
      margin-top: 10px;
      width: 100px;
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

      #replyBox{
        width: 99%
      }
    }
    
    p, h4{
      margin: 5px;
    }

    .reply-btn{
      display: flex;
      span{
        cursor: pointer;

        p{
          font-weight: bold;
          transition: ease-in-out 0.2s;
          color: rgb(61, 107, 255);

          &:hover{
            color: rgb(142, 194, 255)
          }
        }
      }
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
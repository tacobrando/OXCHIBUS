<template>
   <transition name="modal">
        <div class="modal-mask ">
          <div class="modal-wrapper">
            <div class="modal-container animate-top">
              <div v-if="!state.loader" class="loader"></div>
              <div v-if="state.loader" class="modal-body fade-in">
                <slot name="body">
                  
                    <span class="material-icons fade-in slide-in-down">
                      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                      </svg>
                      mail_outline
                    </span>
                    <p class="fade-in">{{message}}</p>
                    <h3 class="fade-in">{{email}}</h3>
                </slot>
              </div>

              <div v-if="state.loader" class="modal-footer">
                <slot name="footer">
                  <button @click="closeModal">Ok</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
export default {
    name: "Confirmation",
    props :{
        showModal: {
            type: Boolean,
            required: true
        },
        loaded: {
            type: Boolean, 
            required: true
        },
        message: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        }
    },
    setup(props, ctx) {
        const state = reactive({
            loader: computed(() => props.loaded)
        })
        function closeModal() {
          ctx.emit('close-modal')
        }

        return {
            state,
            closeModal,
        }
    }

}
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-color: rgba(0, 0, 0, 0.2);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-footer button {
  width: 100px;
  height: 30px;
  font-size: 1rem;
}
.material-icons{
  font-size: 5rem;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.fade-in {
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.5s;
  }
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@-webkit-keyframes slideInDown {
    0% {
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @-moz-keyframes slideInDown {
    0% {
      transform: translateY(30px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideInDown {
    0% {
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .slide-in-down {
    -webkit-animation: slideInDown 1s forwards;
    -moz-animation: slideInDown 1s forwards;
    animation: slideInDown 1s forwards;
  }
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
}
.animate-top{
    opacity: 1;
    animation-name: animatetop;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.3s;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;

  img{
	width: 55%;
	height: 200px;
	border-radius: inherit;
  }
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
<template>
   <transition name="modal">
        <div class="modal-mask ">
          <div class="modal-wrapper">
            <div class="modal-container animate-top">
              <div class="modal-header fade-in">
                <slot name="header">
                  <h1>{{name}}</h1>
                </slot>
              </div>

              <div class="modal-body fade-in">
                <slot name="body">
                  <img v-if="name == 'Matthew Lee'" src="@/assets/Members/Matthew Lee.jpg">
                  <img v-if="name == 'Cecilia Young'" src="@/assets/Members/Cecilia Young.jpg">
                  <img v-if="name == 'Maria Mak'" src="@/assets/Members/Maria Mak.jpg">
                  <img v-if="name == 'Winnie Sung'" src="@/assets/Members/Winnie Sung.jpg">
                  <img v-if="name == 'Michal Bosworth'" src="@/assets/Members/Michal Bosworth.jpg">
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <h3>{{role}}</h3>
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
    props: {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    name: "Modal",
    setup(props, ctx) {
        const state = reactive({
            showModal: false,
            imageUrl: computed(() => imageUrlParse)
        })
        function modalOpen() {
            ctx.emit('showModal', props.name)
            state.showModal = !state.showModal
        }

        function imageUrlParse() {
            if (props.name == "Matthew Lee") {
                console.log(props.name)
                return require(`@/assets/Members/${props.name}.jpg`)
            }
        }

        return {
            state,
            modalOpen,
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}
.animate-top{
    opacity: 1;
    animation-name: animatetop;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.3s;
}

.modal-container {
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
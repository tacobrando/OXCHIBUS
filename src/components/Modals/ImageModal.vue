<template>
   <transition name="modal">
        <div @click="toggleModal" class="modal-mask ">
          <div class="modal-wrapper">
            <div class="modal-container animate-top">
                <slot>
                </slot>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
    name: "Modal",
    setup(props, ctx) {
        function toggleModal() {
            ctx.emit('toggle')
        }

        return {
            toggleModal
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
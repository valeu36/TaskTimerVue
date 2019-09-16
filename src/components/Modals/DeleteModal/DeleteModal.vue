<template>
  <transition name="modal">
    <div class="modals-mask">
      <div class="modals-wrapper">
        <div class="modals-container">

          <div class="modals-header">
            <slot name="header" class="agreement-modal">
              Are you sure you want to delete the task?
            </slot>
          </div>

          <div class="modals-footer">
            <slot name="footer">
              <button class="modals-button" @click="$emit('close')">
                NO
              </button>
              <button class="modals-button" @click="$emit('delete')">
                YES
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
	export default {
		data() {
			return {
				deleteTask: false,
			};
		},
	};
</script>

<style scoped>
  .modals-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modals-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modals-container {
    width: 300px;
    min-height: 100px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modals-header {
    text-align: center;
    font-size: 18px;
  }

  .modals-footer {
    display: flex;
    justify-content: space-around;
  }

  .modals-button {
    width: 50px;
    border: 0;
    border-radius: 5px;
    background-color: white;
    font-size: 16px;
    color: #3f51b5;
    margin-top: 50px;
    padding: 5px;
    outline: none;
    text-align: center;
  }

  .modals-button:hover {
    background-color: rgba(63, 81, 181, 0.1);
  }

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

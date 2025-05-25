<script setup>
defineProps({
  visible: {
    type: Boolean,
  },
});
defineEmits('close');
</script>
<template>
  <div v-show="visible">
    <div class="modal fade show" id="login-modal" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <button
            class="modal-close icofont-close"
            data-bs-dismiss="modal"
            @click.prevent="$emit('close')"
          ></button>
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  background-color: rgba(10, 10, 10, 0.45);
}
</style>
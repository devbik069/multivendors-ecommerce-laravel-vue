<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
    <input
        class="form-control"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    />
</template>

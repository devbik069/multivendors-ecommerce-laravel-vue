<script setup>
import { Field } from "vee-validate";
const props = defineProps(["modelValue", "name"]);
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
    <Field :name="name" v-slot="{ errors, field, meta }">
        <input
            class="form-control"
            :class="{
                'is-valid': meta.valid && meta.touched,
                'is-invalid': !meta.valid && meta.touched,
            }"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            v-bind="{...$attrs, ...field }"
        />
        <span class="text-danger" v-show="errors">{{ errors[0] }}</span>
    </Field>
</template>

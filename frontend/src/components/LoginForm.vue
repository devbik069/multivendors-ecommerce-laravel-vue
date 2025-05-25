<script setup>
import { useAuth, useNotification, useModal } from "@/stores";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { useRouter, useRoute } from "vue-router";
// import { ElNotification } from "element-plus";

const schema = yup.object({
  phone: yup.string().required("Phone field is empty"),
  password: yup.string().required(),
});

const auth = useAuth();
const modal = useModal();
const { errors } = storeToRefs(auth);

// const form = reactive({
//   phone: "",
//   password: "",
// });
const router = useRouter();
const route = useRoute();
const notify = useNotification();
const onSubmit = async (values, { setErrors }) => {
  let res = await auth.login(values);
  if (res.data) {
    modal.closeModal();
    router.push({ name: route.path === "/auth/login" ? "index" : "" });
    notify.Success("Login Success!");
  } else {
    setErrors(res);
  }
  // console.log(actions);
};

const showPassword = ref(false);
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
</script>
<template>
  <div>
    <div class="user-form-card">
      <div class="user-form-title">
        <h2>Customer Login</h2>
        <p>Use your credentials to access</p>
      </div>
      <div class="user-form-group" id="axiosForm">
        <!-- ------------------------------------------ -->
        <!-- ------------------------------------------ -->
        <!-- ------------------------------------------ -->
        <Form
          class="user-form"
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors, isSubmitting }"
        >
          <!--v-if-->
          <div class="form-group">
            <Field
              name="phone"
              type="text"
              class="form-control"
              placeholder="phone"
              :class="{ 'is-invalid': errors.phone }"
            /><!--v-if-->
            <!-- <ErrorMessage name="phone" class="text-danger" /> -->
            <span class="text-danger">{{ errors.phone }}</span>
          </div>
          <div class="form-group">
            <Field
              name="password"
              class="form-control"
              :type="showPassword ? 'text' : 'password'"
              placeholder="password"
              :class="{ 'is-invalid': errors.password }"
            /><span class="view-password" @click="toggleShow"
              ><i
                class="fas text-success"
                :class="{
                  'fa-eye-slash': showPassword,
                  'fa-eye': !showPassword,
                }"
              ></i></span
            ><!--v-if-->
            <!-- <ErrorMessage name="password" class="text-danger" /> -->
            <span class="text-danger">{{ errors.password }}</span>
          </div>
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              id="check"
              value=""
            /><label class="form-check-label" for="check">Remember Me</label>
          </div>
          <div class="form-button">
            <button type="submit" :disabled="isSubmitting">
              login
              <span
                v-show="isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              ></span></button
            ><br />
            <p>
              Don't have any account?
              <router-link
                :to="{ name: 'user.register' }"
                class="dropdown-item"
              >
                Register Here</router-link
              >
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth, useNotification, useModal } from "@/stores";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { ElNotification } from "element-plus";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required("Phone field is required!"),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string("Password confirmation is a required field")
    .required()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const router = useRouter();
const auth = useAuth();
const modal = useModal();
const showPassword = ref(false);
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};
const notify = useNotification();
const onSubmit = async (values, { setErrors, resetForm }) => {
  const res = await auth.register(values);
  if (res.data) {
    resetForm();
    router.push({ name: "index" });
    // sendOtp.value = true;
    notify.Success("Register Success!");
  } else {
    setErrors(res);
  }
};
// send otp((
const sendOtp = ref(false);
const schemaOtpVerify = yup.object({
  otp_code: yup.number().required("Input your otp code").min(6),
});

onMounted(() =>{
  // $("#login-modal").modal("hide")
  modal.closeModal();
})
</script>

<template lang="">
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2 v-if="sendOtp">Verification your phone</h2>
                <h2 v-else>Customer Register</h2>
                <!-- <p>Use your credentials to access</p> -->
              </div>
              <div class="user-form-group">
                <!-- login form -->
                <Form
                  class="user-form"
                  @submit="onSubmit"
                  :validation-schema="schema"
                  v-slot="{ errors, isSubmitting }"
                >
                  <!-- ==================== -->
                  <div class="form-group">
                    <Field
                      name="name"
                      type="text"
                      class="form-control"
                      placeholder="name"
                      :class="{ 'is-invalid': errors.name }"
                    />
                    <span class="text-danger" v-if="errors.name">
                      {{ errors.name }}
                    </span>
                  </div>
                  <!-- ===================== -->
                  <!-- ==================== -->
                  <div class="form-group">
                    <Field
                      name="email"
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <span class="text-danger" v-if="errors.email">
                      {{ errors.email }}
                    </span>
                  </div>
                  <!-- ===================== -->
                  <!-- ==================== -->
                  <div class="form-group">
                    <Field
                      name="phone"
                      type="text"
                      class="form-control"
                      placeholder="phone no"
                      :class="{ 'is-invalid': errors.phone }"
                    />
                    <span class="text-danger" v-if="errors.phone">
                      {{ errors.phone }}
                    </span>
                  </div>
                  <!-- ===================== -->
                  <div class="form-group">
                    <Field
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="password"
                      :class="{ 'is-invalid': errors.password }"
                    /><span class="view-password" @click="toggleShow"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i
                    ></span>
                    <span class="text-danger">
                      {{ errors.password }}
                    </span>
                  </div>
                  <!-- ===================== -->
                  <div class="form-group">
                    <Field
                      name="password_confirmation"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Retype password"
                      :class="{ 'is-invalid': errors.password_confirmation }"
                    /><span class="view-password" @click="toggleShow"
                      ><i
                        class="fas text-success"
                        :class="{
                          'fa-eye-slash': showPassword,
                          'fa-eye': !showPassword,
                        }"
                      ></i
                    ></span>
                    <span class="text-danger">
                      {{ errors.password_confirmation }}
                    </span>
                  </div>

                  <div class="form-button">
                    <button type="submit" :disabled="isSubmitting">
                      Register
                      <span
                        v-show="isSubmitting"
                        class="spinner-border spinner-border-sm mr-1"
                      ></span>
                    </button>
                    <p></p>
                    <div class="user-form-remind">
                      <p>
                        I have an account?
                        <router-link
                          :to="{ name: 'user.login' }"
                          class="dropdown-item"
                        >
                          Login Here</router-link
                        >
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
              <!-- ===================================== -->

              <!-- =================================== -->
            </div>

            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

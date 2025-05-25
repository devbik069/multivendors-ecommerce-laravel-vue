<script setup>
import { useSeller, useNotification } from "@/stores";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
const seller = useSeller();
const notify = useNotification();

const schema = yup.object({
  name: yup.string().required(),
  shop_name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required("password confirmation is a required field")
    .min(8)
    .oneOf(
      [yup.ref("password"), null],
      "password and confirm password must be match"
    ),
});

const onSubmit = async (values, { setErrors, resetForm }) => {
  const res = await seller.register(values);
  if (res.status) {
    notify.Success("Seller Apply Submitted");
    resetForm();
  } else {
    setErrors(res);
  }
};
</script>
<template>
  <div>
    <section class="user-form-part">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-12">
            <div class="user-form-card">
              <div class="user-form-title">
                <h2>Seller Registration Form</h2>
                <p>Use your right information and start your business</p>
              </div>
              <div class="user-form-group">
                <Form
                  class="user-form"
                  @submit="onSubmit"
                  :validation-schema="schema"
                  v-slot="{ errors, isSubmitting, meta }"
                >
                  <!--v-if-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <Field
                          name="name"
                          type="text"
                          class="form-control"
                          placeholder="name"
                          :class="{ 'is-invalid': errors.name }"
                        />

                        <span class="text-danger">{{ errors.name }}</span>
                      </div>

                      <div class="form-group">
                        <Field
                          name="shop_name"
                          type="text"
                          class="form-control"
                          placeholder="shop_name"
                          :class="{ 'is-invalid': errors.shop_name }"
                        />

                        <span class="text-danger">{{ errors.shop_name }}</span>
                      </div>

                      <div class="form-group">
                        <Field
                          name="phone"
                          type="text"
                          class="form-control"
                          placeholder="phone no"
                          :class="{ 'is-invalid': errors.phone }"
                        />

                        <span class="text-danger">{{ errors.phone }}</span>
                      </div>

                      <div class="form-group">
                        <Field
                          name="address"
                          type="text"
                          class="form-control"
                          placeholder="address"
                          :class="{ 'is-invalid': errors.address }"
                        />

                        <span class="text-danger">{{ errors.address }}</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <Field
                          name="email"
                          type="email"
                          class="form-control"
                          placeholder="email no"
                          :class="{ 'is-invalid': errors.email }"
                        />

                        <span class="text-danger">{{ errors.email }}</span>
                      </div>
                      <div class="form-group">
                        <Field
                          name="password"
                          type="password"
                          class="form-control"
                          placeholder="password no"
                          :class="{ 'is-invalid': errors.password }"
                        />

                        <span class="text-danger">{{ errors.password }}</span>
                      </div>
                      <div class="form-group">
                        <Field
                          name="password_confirmation"
                          type="password"
                          class="form-control"
                          placeholder="Retype-password"
                          :class="{
                            'is-invalid': errors.password_confirmation,
                          }"
                        />

                        <span class="text-danger">{{
                          errors.password_confirmation
                        }}</span>
                      </div>
                      <!-- <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="check"
                        /><label class="form-check-label" for="check"
                          >agree with all <a href="">terms</a> &amp;
                          <a href="">conditions</a></label
                        >
                      </div> -->
                      <div class="form-button">
                        <button type="submit" :disabled="isSubmitting">
                          Submit
                          <span
                            v-show="isSubmitting"
                            class="spinner-border spinner-border-sm mr-1"
                          ></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div class="user-form-footer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { DeliveryAddress, LocalModal } from "@/components";
import { useAuth, useNotification } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { useRouter, useRoute } from "vue-router";
const auth = useAuth();

const schema = yup.object({
  current_password: yup.string().required("Current password is required"),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string("Password confirmation is a required field")
    .required()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const { errors } = storeToRefs(auth);

const router = useRouter();
const route = useRoute();
const notify = useNotification();

const onSubmit = async (values, { setErrors }) => {
  let res = await auth.updatePassword(values);
  if (res.data) {
    notify.Success("Password update Success!");
  } else {
    setErrors(res);
  }
  // console.log(actions);
};

// ======================================

const { getUser, loading } = storeToRefs(auth);

const visible = ref(false);
const passwordVisible = ref(false);
const openModal = (data) => {
  if (data == "profile") {
    visible.value = true;
  } else {
    passwordVisible.value = true;
  }
};

const closeModal = (data) => {
  if (data == "profile") {
    visible.value = false;
  } else {
    passwordVisible.value = false;
  }
};

const form = reactive({
  name: auth.user?.data?.name,
  email: auth.user?.data?.email,
  phone: auth.user?.data?.phone,
});
const updateProfile = () => {
  auth.profileUpdate(form);
};

// user image upload
const profilePictureUpdate = (event) =>{
  const imageFile = event.target.files[0];
  const formData = new FormData();
  if (imageFile) {
    formData.append("image", imageFile);
    auth.imageUpdate(formData);
  }
  console.log(formData);
}
</script>


<template>
  <div>
    <!-- profile update modal -->
    <LocalModal :visible="visible" @close="closeModal('profile')">
      <form class="modal-form" @submit.prevent="updateProfile">
        <div class="form-title"><h3>edit profile info</h3></div>
        <div class="form-group">
          <label class="form-label">name</label
          ><input class="form-control" type="text" v-model="form.name" />
        </div>
        <div class="form-group">
          <label class="form-label">email</label
          ><input class="form-control" type="text" v-model="form.email" />
        </div>

        <div class="form-group">
          <label class="form-label">Phone</label
          ><input class="form-control" type="text" v-model="form.phone" />
        </div>
        <button class="form-btn" type="submit" :disabled="loading">
          save profile info
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
        </button>
      </form>
    </LocalModal>

    <!-- password change modal -->
    <LocalModal :visible="passwordVisible" @close="closeModal('pass')">
      <Form
        class="modal-form"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-title"><h3>Password Change</h3></div>

        <div class="form-group">
          <Field
            name="current_password"
            class="form-control"
            type="password"
            placeholder="password"
            :class="{ 'is-invalid': errors.current_password }"
          />
          <!-- <ErrorMessage name="password" class="text-danger" /> -->
          <span class="text-danger">{{ errors.current_password }}</span>
        </div>

        <div class="form-group">
          <Field
            name="password"
            class="form-control"
            type="password"
            placeholder="password_confirmation"
            :class="{ 'is-invalid': errors.password }"
          />
          <!-- <ErrorMessage name="password" class="text-danger" /> -->
          <span class="text-danger">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <Field
            name="password_confirmation"
            class="form-control"
            type="password"
            placeholder="password_confirmation"
            :class="{ 'is-invalid': errors.password_confirmation }"
          />
          <!-- <ErrorMessage name="password" class="text-danger" /> -->
          <span class="text-danger">{{ errors.password_confirmation }}</span>
        </div>
        <div class="form-button">
          <button type="submit" :disabled="isSubmitting">
            Update
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span></button
          ><br />
        </div>
      </Form>
    </LocalModal>

    <section class="inner-section single-banner">
      <div class="container">
        <h2>my profile</h2>
      </div>
    </section>

    <section class="inner-section profile-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title">
                <h4>Your Profile</h4>
                <button @click="openModal('profile')">edit profile</button>
                <button @click="openModal('pass')">Change Password</button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-lg-2">
                    <div class="profile-image">
                      <!-- <a href="#"
                        ><img src="@/assets/images/user.png" alt="user"
                      /></a> -->

                      <div class="upload">
                        <img
                          v-if="auth.user?.data?.image"
                          :src="$filters.makeImagePath(auth.user?.data?.image)"
                          width="100"
                          height="100"
                          alt=""
                        />
                        <img
                          v-else
                          src="@/assets/images/user.png"
                          width="100"
                          height="100"
                          alt=""
                        />
                        <div class="round">
                          <input
                            type="file"
                            class="profile-img"
                            @change="profilePictureUpdate"
                          />
                          <i class="fa fa-camera" style="color: #fff"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label class="form-label">name</label
                      ><input
                        class="form-control"
                        type="text"
                        :value="getUser?.name"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label class="form-label">Email</label
                      ><input
                        class="form-control"
                        type="email"
                        :value="getUser?.email"
                      />
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="profile-btn">
                      <a href="change-password.html">change pass.</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title">
                <h4>contact number</h4>
                <button data-bs-toggle="modal" data-bs-target="#contact-add">
                  add contact
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact active">
                      <h6>primary</h6>
                      <p>+8801838288389</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact">
                      <h6>secondary</h6>
                      <p>+8801941101915</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact">
                      <h6>secondary</h6>
                      <p>+8801747875727</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DeliveryAddress />

          <div class="col-lg-12">
            <div class="account-card mb-0">
              <div class="account-title">
                <h4>payment option</h4>
                <button data-bs-toggle="modal" data-bs-target="#payment-add">
                  add card
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment active">
                      <img
                        src="@/assets/images/payment/png/01.png"
                        alt="payment"
                      />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment">
                      <img
                        src="@/assets/images/payment/png/02.png"
                        alt="payment"
                      />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment">
                      <img
                        src="@/assets/images/payment/png/03.png"
                        alt="payment"
                      />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.upload {
  width: 100px;
  position: relative;
  margin: auto;
}

.upload img {
  border-radius: 50%;
  border: 6px solid #eaeaea;
}

.upload .round {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #119744;
  width: 32px;
  height: 32px;
  line-height: 33px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
}

.profile-img {
  position: absolute;
  transform: scale(2);
  opacity: 0;
}

.profile-img::-webkit-file-upload-button {
  cursor: pointer;
}
</style>

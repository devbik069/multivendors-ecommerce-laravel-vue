<script setup>
import { useAuth } from "@/admin/stores";
import VTextInput from "@/common/components/VTextInput.vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
});

const router = useRouter();
const auth = useAuth();
const onSubmit = async (values, { setErrors, resetForm }) => {
    try {
        const res = await auth.login(values);
        if(res.user){
            router.push({name: 'admin.home'})
        }
    } catch (error) {
        setErrors(error);
    }
};
</script>

<template>
    <div>
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <a href="../../index2.html" class="h1"><b>Admin</b>Login</a>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <Form
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors, isSubmitting, meta }"
                >
                    <div class="input-group mb-3">
                        <VTextInput
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div class="input-group mb-3">
                        <VTextInput
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label for="remember"> Remember Me </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                        <button type="submit" :disabled="isSubmitting" class="btn btn-primary btn-block">
                            Sign In
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm"></span>
                        </button>
                    </div>
                        <!-- /.col -->
                    </div>
                </Form>
            </div>
            <!-- /.card-body -->
        </div>
    </div>
</template>
<style>
.input-group > .custom-file,
.input-group > .custom-select,
.input-group > .form-control,
.input-group > .form-control-plaintext {
    width: 100%;
}
</style>

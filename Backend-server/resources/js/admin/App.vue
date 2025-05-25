<script setup>
import AdminLayout from "./layouts/AdminLayout.vue";
import AdminGuestLayout from "./layouts/AdminGuestLayout.vue";
import { useAuth } from "@/admin/stores";

const auth = useAuth();
</script>
<template>
    <div>
        <AdminLayout v-if="auth.getAuthStatus">
            <section class="content">
                <router-view></router-view>
            </section>
        </AdminLayout>

        <AdminGuestLayout v-if="!auth.getAuthStatus">
            <router-view></router-view>
        </AdminGuestLayout>
    </div>
</template>

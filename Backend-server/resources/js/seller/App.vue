<script setup>
import SellerLayout from "@/seller/layouts/SellerLayout.vue";
import SellerGuestLayout from "@/seller/layouts/SellerGuestLayout.vue";
import { useAuth } from "@/seller/stores";

const auth = useAuth();
</script>
<template>
    <div>
        <SellerLayout v-if="auth.getAuthStatus">
            <section class="content">
                <router-view></router-view>
            </section>
        </SellerLayout>

        <SellerGuestLayout v-if="!auth.getAuthStatus">
            <router-view></router-view>
        </SellerGuestLayout>
    </div>
</template>

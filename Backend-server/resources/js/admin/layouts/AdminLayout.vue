<script setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import PageHeader from "./PageHeader.vue";
</script>

<template>

    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
        <PageHeader />

        <slot />
    </div>
</template>

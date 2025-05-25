<script setup>
import { useAuth } from "@/admin/stores";
const auth = useAuth();
</script>

<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link
            :to="{ name: 'admin.home' }"
            class="brand-link text-center"
        >
            <span class="brand-text font-weight-light">Admin Panel</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <!-- <img
                        src=""
                        class="img-circle elevation-2"
                        alt="User Image"
                    /> -->
                </div>
                <div class="info text-center">
                    <a href="#" class="d-block">{{ auth.getUser?.name }}</a>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul
                    class="nav nav-pills nav-sidebar flex-column"
                    data-widget="treeview"
                    role="menu"
                    data-accordion="false"
                >
                    <li class="nav-item">
                        <RouterLink
                            :to="{ name: 'admin.home' }"
                            class="nav-link active"
                        >
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Dashboard</p>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="{ name: 'admin.brand.index' }" class="nav-link active">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Brand</p>
                        </RouterLink>
                    </li>
                    <li class="nav-item menu-open">
                        <a href="#" class="nav-link active">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="./index.html" class="nav-link active">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Dashboard v1</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="./index2.html" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Dashboard v2</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="./index3.html" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Dashboard v3</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            :to="{ name: 'file.index' }"
                            class="nav-link"
                        >
                            <i class="nav-icon fas fa-file"></i>
                            <p>File Manager</p>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

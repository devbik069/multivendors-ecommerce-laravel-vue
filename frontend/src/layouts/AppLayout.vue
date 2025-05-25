<script setup>

import {
  HeaderPart,
  Navbar,
  MobileMenu,
  CardSideBar,
  NewsLetter,
  FooterPart,
  LoginModal,
} from "@/components";


</script>
<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>

    <!-- header part -->
    <HeaderPart />
    <!-- header part -->

    <!-- navbar part -->
    <Navbar/>
    <!-- navbar part -->

    <!-- card side bar -->
    <CardSideBar />
    <!-- card side bar end -->

    <!--Mobile manu part -->
    <MobileMenu />
    <!-- Mobile manu part -->
    <LoginModal />


    <slot />


    <NewsLetter />

    <FooterPart />
  </div>
</template>

<style></style>

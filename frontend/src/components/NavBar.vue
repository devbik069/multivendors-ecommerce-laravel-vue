<script setup>
import { onMounted } from "vue";
import { useCategory } from "@/stores";
import { storeToRefs } from "pinia";
const navData = useCategory();
const { navCats } = storeToRefs(navData);

onMounted(() => {
  navData.navCategory();
});
</script>

<template>
  <div>
    <nav class="navbar-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="navbar-content">
              <ul class="navbar-list">
                <li class="navbar-item dropdown">
                  <router-link :to="{ name: 'index' }"  class="navbar-link">home</router-link>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>
                  <div class="megamenu">
                    <div class="container">
                      <div class="row row-cols-5">
                        <div
                          class="col"
                          v-for="(cat, index) in navCats?.data"
                          :key="index"
                        >
                          <div class="megamenu-wrap">
                            <router-link
                              :to="{
                                name: 'shop',
                                query: { products: cat.slug },
                              }"
                            >
                              <h5 class="megamenu-title">{{ cat.name }}</h5>
                            </router-link>
                            <ul
                              class="megamenu-list"
                              v-if="cat.subcategories.length > 0"
                            >
                              <li
                                v-for="(subCat, i) in cat.subcategories"
                                :key="i"
                              >
                                <router-link
                                  :to="{
                                    name: 'shop',
                                    query: { products: subCat.slug },
                                  }"
                                  >{{ subCat.name }}</router-link
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{ name: 'shop' }" class="navbar-link"
                    >shop</router-link
                  >
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{ name: 'seller.list' }" class="navbar-link"
                    >Seller List</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

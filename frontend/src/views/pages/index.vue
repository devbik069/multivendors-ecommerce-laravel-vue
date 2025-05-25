<script setup>
import { onMounted, ref } from "vue";
import { ProductCard, ProductPrice } from "@/components/product";
import { useSlider, useCategory, useProduct } from "@/stores";
import {
  HomeSliderScreen,
  HomeCategoryScreen,
  HomeProductSceen,
} from "@/components/skeleton";
import { storeToRefs } from "pinia";
// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
const modules = ref([Pagination, Autoplay]);
const newSlide = ref([Navigation, Autoplay]);

const slider = useSlider();
const category = useCategory();
const product = useProduct();
const { sliders } = storeToRefs(slider);
const { categories } = storeToRefs(category);
const { products, popular, sales, winter, newItems, feature } =
  storeToRefs(product);

onMounted(() => {
  slider.getSlideData();
  category.getCategoryData();
  // // products
  product.getProductData();
  product.getProductData("sale");
  product.getProductData("popular");
  product.getProductData("winter");
  product.getProductData("newItems");
  product.getProductData("feature");
});
</script>

<template>
  <div>
    <section class="banner-part">
      <div class="">
        <div class="row">
          <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
            <div class="home-grid-slider slider-arrow slider-dots">
              <template v-if="sliders.data">
                <swiper
                  :spaceBetween="30"
                  :pagination="{
                    clickable: true,
                  }"
                  :modules="modules"
                  :autoplay="{
                    delay: 2500,
                  }"
                  class="mySwiper"
                >
                  <swiper-slide
                    v-for="(slider, index) in sliders.data"
                    :key="index"
                  >
                    <a href="#"
                      ><img
                        :src="$filters.makeImagePath(slider.image)"
                        alt="" /></a
                  ></swiper-slide>
                </swiper>
              </template>

              <template v-else>
                <HomeSliderScreen />
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section suggest-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 style="float: left">SHOP BY CATEGORIES</h3>
            </div>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <template v-if="categories.data">
            <div
              class="col"
              v-for="(cat, index) in categories.data"
              :key="index"
            >
              <div class="product-card">
                <ul>
                  <li>
                    <router-link
                      :to="{
                        name: 'shop',
                        query: { products: cat.slug },
                      }"
                      class="suggest-card"
                    >
                      <img :src="$filters.makeImagePath(cat.image)" alt="" />
                    </router-link>
                  </li>
                </ul>

                <h6 class="text-center mt-2">{{ cat.name }}</h6>
              </div>
            </div>
          </template>

          <template v-else>
            <HomeCategoryScreen :dataAmount="10" />
          </template>
        </div>
      </div>
    </section>

    <!-- sales item -->
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Sales items</h2>
            </div>
          </div>
        </div>
        <!-- ================================================================= -->
        <!-- =====================product card============================================ -->
        <template v-if="sales.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in sales.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <HomeProductSceen :dataAmount="10" />
        </template>
        <!-- ================================================================= -->
        <!-- ================================================================= -->
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- winter items -->
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Winter Collection</h2>
            </div>
          </div>
        </div>
        <!-- ================================================================= -->
        <!-- =====================product card============================================ -->

        <template v-if="winter.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in winter.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <HomeProductSceen :dataAmount="10" />
        </template>

        <!-- ================================================================= -->
        <!-- ================================================================= -->
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- popular items -->
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Popular Products</h2>
            </div>
          </div>
        </div>
        <!-- ================================================================= -->
        <!-- =====================product card============================================ -->
        <!-- <ProductCard :products="popular"></ProductCard> -->
        <template v-if="popular.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in popular.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <HomeProductSceen :dataAmount="10" />
        </template>

        <!-- ================================================================= -->
        <!-- ================================================================= -->
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- feature items -->
    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Feature Products</h2>
            </div>
          </div>
        </div>
        <!-- ================================================================= -->
        <!-- =====================product card============================================ -->
        <!-- <ProductCard :products="feature"></ProductCard> -->
        <template v-if="feature.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in feature.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <HomeProductSceen :dataAmount="10" />
        </template>

        <!-- ================================================================= -->
        <!-- ================================================================= -->
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- new items -->
    <section class="section newitem-part">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>New Item Collected</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="new-slider slider-arrow">
              <swiper
                :slidesPerView="5"
                :centeredSlides="false"
                :slidesPerGroupSkip="1"
                :grabCursor="true"
                :autoplay="{
                  delay: 2500,
                }"
                :keyboard="{
                  enabled: true,
                }"
                :breakpoints="{
                  '769': {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                  },
                }"
                :scrollbar="true"
                :navigation="true"
                :loop="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide
                  v-for="(product, index) in products.data"
                  :key="index"
                >
                  <li>
                    <div class="product-card">
                      <div class="product-media">
                        <div class="product-label">
                          <label class="label-text new">{{
                            product.condition
                          }}</label>
                          <label class="label-text sale" v-if="product.discount"
                            >{{ product.discount }}%</label
                          >
                        </div>
                        <button class="product-wish wish">
                          <i class="fas fa-heart"></i></button
                        ><router-link
                          :to="{
                            name: 'product.details',
                            params: { slug: product.slug },
                          }"
                          class="product-image"
                          ><img
                            :src="$filters.makeImagePath(product.thumbnail)"
                            alt="product"
                        /></router-link>
                      </div>
                      <div class="product-content">
                        <h6 class="product-name">
                          <router-link
                            :to="{
                              name: 'product.details',
                              params: { slug: product.slug },
                            }"
                            >{{ product.name }}</router-link
                          >
                        </h6>

                        <ProductPrice
                          :price="product.price"
                          :discount="product.discount"
                        />
                        <button class="product-add" title="Add to Cart">
                          <i class="fas fa-shopping-basket"></i><span>Add</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </swiper-slide>
              </swiper>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

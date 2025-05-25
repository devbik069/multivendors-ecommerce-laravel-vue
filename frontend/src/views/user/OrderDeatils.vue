<script setup>
import { useOrder } from "@/stores";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { Loader } from "@/components/Loader";
import { useRoute } from "vue-router";
import { dateFormat } from "@/Helpers/helper";
const order = useOrder();
const route = useRoute();
const { getSingleOrder, loading } = storeToRefs(order);
onMounted(() => {
  order.dataById(route.params.id);
});
</script>

<template>
  <div>
    <section class="inner-section single-banner">
      <div class="container">
        <h2>Order Details</h2>
      </div>
    </section>
    <section class="inner-section wishlist-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <Loader v-if="loading" />
            <div class="orderlist" v-else>
              <div class="orderlist-head">
                <h5>order#{{ getSingleOrder.order_number }}</h5>
              </div>
              <div class="orderlist-body">
                <div class="row">
                  <div class="col-lg-5">
                    <ul class="orderlist-details">
                      <li>
                        <h6>order id</h6>
                        <p>{{ getSingleOrder.order_number }}</p>
                      </li>
                      <li>
                        <h6>Total Item</h6>
                        <p>{{ getSingleOrder.items?.length }} Items</p>
                      </li>
                      <li>
                        <h6>Order Time</h6>
                        <p>{{ dateFormat(getSingleOrder.created_at) }}</p>
                      </li>
                     
                    </ul>
                  </div>
                  <div class="col-lg-4">
                    <ul class="orderlist-details">
                      <li>
                        <h6>Sub Total</h6>
                        <p>
                          {{
                            $filters.currencySymbol(
                              getSingleOrder.subtotal ?? 0
                            )
                          }}
                        </p>
                      </li>
                      <li>
                        <h6>discount</h6>
                        <p>
                          {{
                            $filters.currencySymbol(
                              getSingleOrder.discount ?? 0
                            )
                          }}
                        </p>
                      </li>
                      <li>
                        <h6>delivery fee</h6>
                        <p>
                          {{
                            $filters.currencySymbol(getSingleOrder.charges ?? 0)
                          }}
                        </p>
                      </li>
                      <li>
                        <h6>Total<small>(Incl. VAT)</small></h6>
                        <p>
                          {{
                            $filters.currencySymbol(getSingleOrder.total ?? 0)
                          }}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-3">
                    <div class="orderlist-deliver">
                      <h6>Delivery location</h6>
                      <p>
                        {{ getSingleOrder.shipping_address }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="table-scroll">
                      <table class="table-list">
                        <thead>
                          <tr>
                            <th scope="col">Serial</th>
                            <th scope="col">Product</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in getSingleOrder?.items">
                            <td class="table-serial">
                              <h6>{{ ++index }}</h6>
                            </td>
                            <td class="table-image">
                              <img
                                :src="
                                  $filters.makeImagePath(
                                    item.product?.thumbnail
                                  )
                                "
                                alt="product"
                              />
                            </td>
                            <td class="table-name">
                              <h6>{{ item.product?.name }}</h6>
                            </td>
                            <td class="table-price">
                              <h6>{{ item.price }}</h6>
                            </td>
                            <td class="table-quantity">
                              <h6>{{ item.qty }}</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

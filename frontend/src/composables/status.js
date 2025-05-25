import { defineStore } from "pinia";
import { ref, computed } from "vue";
// export const useStatus = defineStore("status", () => {
//   // state will be go here
//   const couponStatus = ref(false);

//   // getters will be go here
//   const couponBtnClass = computed(() =>
//     couponStatus.value ? "coupon_btn_none" : ""
//   );

//   const couponFormClass = computed(() =>
//     couponStatus.value ? "coupon_form_display" : ""
//   );

//   //action will be go here
//   function toggleBtn() {
//     couponStatus.value = !couponStatus.value;
//   }

//   return { couponBtnClass, couponFormClass, toggleBtn };
// });


export const useStatus = defineStore('counter', () => {
  const couponStatus = ref(false);

  // getters will be go here
  const couponBtnClass = computed(() =>
    couponStatus.value ? "coupon_btn_none" : ""
  );

  const couponFormClass = computed(() =>
    couponStatus.value ? "coupon_form_display" : ""
  );

  // action will be go here
  function toggleBtn() {
    couponStatus.value = !couponStatus.value;
  }

  return { couponBtnClass, couponFormClass, toggleBtn };
})

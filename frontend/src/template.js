// import "./assets/vendor/bootstrap/jquery-1.12.4.min.js"
// import "./assets/vendor/bootstrap/popper.min.js"
// import "./assets/vendor/bootstrap/bootstrap.min.js";
// import "./assets/vendor/niceselect/nice-select.min.js"
// import "./assets/vendor/venobox/venobox.min.js"
// import "./assets/js/nice-select.js"
// import "./assets/js/countdown.js"
// import "./assets/js/accordion.js"
// import "./assets/js/venobox.js"

const { default: jQuery } = await import("jquery");
window.jquery = window.jQuery = window.$ = jQuery;
import { createPopper } from "@popperjs/core";
import "bootstrap/dist/js/bootstrap.min.js";

import "./assets/js/main.js"
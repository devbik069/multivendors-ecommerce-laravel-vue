<template>
  <div>
    <footer class="footer-part">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <router-link class="footer-logo" :to="{ name: 'index' }"
                ><img src="@/assets/images/logo.png" alt="logo"
              /></router-link>
              <p class="footer-desc">
                Adipisci asperiores ipsum ipsa repellat consequatur repudiandae
                quisquam assumenda dolor perspiciatis sit ipsum dolor amet.
              </p>
              <ul class="footer-social">
                <li><a class="icofont-facebook" href="#"></a></li>
                <li><a class="icofont-twitter" href="#"></a></li>
                <li><a class="icofont-linkedin" href="#"></a></li>
                <li><a class="icofont-instagram" href="#"></a></li>
                <li><a class="icofont-pinterest" href="#"></a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget contact">
              <h3 class="footer-title">contact us</h3>
              <ul class="footer-contact">
                <li>
                  <i class="icofont-ui-email"></i>
                  <p>
                    <span>support@test.com</span
                    ><span>test@gmail.com</span>
                  </p>
                </li>
                <li>
                  <i class="icofont-ui-touch-phone"></i>
                  <p><span>+9779841XXXXXX</span><span>+9779841XXXXXX</span></p>
                </li>
                <li>
                  <i class="icofont-location-pin"></i>
                  <p>Kathmandu, Nepal</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">quick Links</h3>
              <div class="footer-links">
                <ul>
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Order History</a></li>
                  <li><a href="#">Order Tracking</a></li>
                  <li><a href="#">Best Seller</a></li>
                  <li><a href="#">New Arrivals</a></li>
                </ul>
                <ul>
                  <li><a href="#">Location</a></li>
                  <li><a href="#">Affiliates</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Carrer</a></li>
                  <li><a href="#">Faq</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <h3 class="footer-title">Download App</h3>
              <p class="footer-desc">
                Lorem ipsum dolor sit amet tenetur dignissimos ipsum eligendi
                autem obcaecati minus ducimus totam reprehenderit
                exercitationem!
              </p>
              <div class="footer-app">
                <a href="#"
                  ><img
                    src="@/assets/images/google-store.png"
                    alt="google" /></a
                ><a href="#"
                  ><img src="@/assets/images/app-store.png" alt="app"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="footer-bottom">
              <p class="footer-copytext">
                &copy; All Copyrights Reserved by
                <a target="_blank" href="https://w3coders.net">W3 Coders</a>
              </p>
              <div class="footer-card">
                <a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/01.jpg"
                    alt="payment" /></a
                ><a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/02.jpg"
                    alt="payment" /></a
                ><a href="#"
                  ><img
                    src="@/assets/images/payment/jpg/03.jpg"
                    alt="payment" /></a
                ><a href="#"
                  ><img src="@/assets/images/payment/jpg/04.jpg" alt="payment"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

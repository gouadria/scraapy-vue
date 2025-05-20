<script lang="ts">
export default {
  name: 'footerComponant'
}
</script>

<template>
  <footer>
    <div class="footer-content max-width">
      <div class="footer-group1">
        <div class="footer-group11">
          <img src="@/assets/logo-w.svg?url" alt="logo" class="nav-logo" />
          <p class="footer-text">
            {{ $t('footer.aboutCompany') }}
          </p>
        </div>

        <div class="socials">
          <a href="">
            <img src="@/assets/twitter.svg?url" alt="twitter" />
          </a>
          <a href="">
            <img src="@/assets/instagram.svg?url" alt="instagram" />
          </a>
          <a href="">
            <img src="@/assets/linkedin.svg?url" alt="linkedin" />
          </a>
          <a href="">
            <img src="@/assets/youtube.svg?url" alt="youtube" />
          </a>
        </div>
      </div>
      <div class="footer-group2">
        <div class="footer-container">
          <div class="footer-column">
            <div class="footer-header">{{ $t('footer.product') }}</div>
            <ul class="footer-column">
              <li class="footer-item">
                <a href="#scrap">{{ $t('footer.scrapMarketplace') }}</a>
              </li>
              <li class="footer-item">
                <a href="#services">{{ $t('footer.services') }}</a>
              </li>
              <li class="footer-item">
                <a href="#renting">{{ $t('footer.rentingEquipment') }}</a>
              </li>
              <li class="footer-item">
                <a href="#offers">{{ $t('footer.offers') }}</a>
              </li>
              <li class="footer-item">
                <a href="#bedding">{{ $t('footer.bedding') }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <div class="footer-header">{{ $t('footer.company') }}</div>
            <ul class="footer-column">
              <li class="footer-item">
                <router-link :to="{ name: 'about' }">
                  {{ $t('footer.about') }}
                </router-link>
              </li>
              <li class="footer-item">
                <router-link :to="{ name: 'partner' }">
                  {{ $t('footer.partner') }}
                </router-link>
              </li>
              <li class="footer-item">
                <router-link :to="{ name: 'career' }">
                  {{ $t('footer.careers') }}
                </router-link>
              </li>
              <li class="footer-item">
                <a href="#contact">{{ $t('footer.contact') }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <div class="footer-header">{{ $t('footer.resources') }}</div>
            <ul class="footer-column">
              <li class="footer-item">
                <a href="#examples">{{ $t('footer.examples') }}</a>
              </li>
              <li class="footer-item">
                <a href="#community">{{ $t('footer.community') }}</a>
              </li>
              <li class="footer-item">
                <a href="#guides">{{ $t('footer.guides') }}</a>
              </li>
              <li class="footer-item">
                <a href="#faqs">{{ $t('footer.faqs') }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <div class="footer-header">{{ $t('footer.legal') }}</div>
            <ul class="footer-column">
              <li class="footer-item">
                <router-link :to="{ name: 'privacy_policy' }">
                  {{ $t('footer.privacy') }}
                </router-link>
              </li>
              <li class="footer-item">
                <a href="#terms">{{ $t('footer.terms') }}</a>
              </li>
              <li class="footer-item">
                <router-link :to="{ name: 'return_policy' }">
                  {{ $t('footer.return') }}
                </router-link>
              </li>
              <li class="footer-item">
                <router-link :to="{ name: 'materials_policy' }">
                  {{ $t('footer.materials') }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-legal max-width">
      <div class="address">
        <p>{{ $t('footer.address') }}</p>
        <p>{{ $t('footer.crVat') }}</p>
      </div>
    </div>
    <div class="footer-art"></div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--Blue-950, #0b3241);
}

.footer-content {
  padding: 40px 110px 0 110px;
}

.footer-group1 {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 422px;
}

.footer-group11 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.footer-group11 p {
  color: var(--Dark-100, #e7e7e7);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.footer-group11 img {
  height: 100%;
  width: auto;
}

.socials {
  display: flex;
  gap: 11px;
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-container {
  display: flex;
  gap: 48px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.footer-header {
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.footer-item a {
  color: #d1d1d1;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
}

.footer-legal {
  padding: 0 110px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.address {
  display: flex;
  gap: 20px;
  color: var(--Dark-200, #d1d1d1);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.powered-by {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--Dark-200, #d1d1d1);
  text-align: justify;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.powered-by a img {
  width: 7rem;
  height: auto;
}

.footer-art {
  width: 100%;
  height: 302px;
  background: url('@/assets/footer-art.png');
  background-repeat: repeat-x;
  background-size: contain;
  opacity: 0.7;
  mix-blend-mode: overlay;
  position: sticky;
  bottom: 0;
  background-position: bottom;
}

@media (min-width: 1441px) {
  .footer-content {
    padding-inline: 0;
  }

  .footer-legal {
    padding-inline: 0;
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 148px 20px 0 20px;
  }

  .footer-container {
    gap: 30px;
  }

  html[dir='ltr'] .footer-container {
    gap: 14px;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 14px;
    z-index: 1;
  }

  .footer-legal {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .address {
    flex-direction: column;
    gap: 8px;
  }
}

@media (min-width: 767.99px) and (max-width: 899px) {
  .footer-content {
    align-items: flex-start;
    padding: 148px 30px 0 30px;
  }

  .footer-group1 {
    width: 100%;
  }
}

@media (min-width: 899px) and (max-width: 1224px) {
  .footer-content {
    /* flex-direction: column; */
    padding: 148px 30px 0 30px;
  }
}
</style>

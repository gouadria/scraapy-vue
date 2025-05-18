<template>
  <section class="section_mobile">
    <div class="section-container max-width">
      <div class="section-header header_mobile">
        <div>
          <span>{{ $t('landingSection1.headerSpan') }}</span>
          <h1>{{ $t('landingSection1.headerTitle') }}</h1>
          <p class="head_desc">{{ $t('landingSection1.headerDescription') }}</p>
        </div>
      </div>

      <div class="section-content">
        <div class="card">
          <img src="@/assets/card-img-1.svg?url" alt="Card Image" />
          <div class="card-text-wrapper">
            <h2>{{ $t('landingSection1.card1Title') }}</h2>
            <p>{{ $t('landingSection1.card1Description') }}</p>
          </div>
        </div>
        <div class="card">
          <img src="@/assets/card-img-2.svg?url" alt="Card Image" />
          <div class="card-text-wrapper">
            <h2>{{ $t('landingSection1.card2Title') }}</h2>
            <p>{{ $t('landingSection1.card2Description') }}</p>
          </div>
        </div>
        <div class="card">
          <img src="@/assets/card-img-3.svg?url" alt="Card Image" />
          <div class="card-text-wrapper">
            <h2>{{ $t('landingSection1.card3Title') }}</h2>
            <p>{{ $t('landingSection1.card3Description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}

.section-container {
  width: 100%;
  display: flex;
  padding: 100px 0 60px 0;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  align-self: stretch;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  align-self: stretch;
}

.section-header span {
  color: var(--Secondary---500, #15b377);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.section-header h1 {
  color: var(--Blue-950, #0b3241);
  font-size: 60px;
  font-weight: 700;
  line-height: 70px;
  letter-spacing: -1.2px;
}

.section-content {
  width: 100%;
  display: flex;
  gap: 20px;
}

.card {
  display: flex;
  width: 100%;

  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  background: var(--Dark-50, #f6f6f6);
  gap: 26px;
}

.card-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8.5px;
}

.card-text-wrapper h2 {
  color: var(--Blue-950, #0b3241);
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
}

.card-text-wrapper p {
  color: var(--Dark-600, #5d5d5d);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

@media (max-width: 1441px) {
  section {
    padding-inline: 110px;
  }
}

.head_desc {
  margin-top: 20px;
}

.btn_none {
  display: none;
}

@media (max-width: 768px) {
  .header_mobile {
  }

  .section_mobile {
    padding-inline: 20px;
  }

  .section-header span {
    font-size: 16px;
    font-weight: 700;
  }

  .section-header h1 {
    font-size: 36px;
    font-weight: 700;
    width: 70%;
    line-height: 46px;
  }

  .section-content {
    flex-direction: column;
  }
}

@media (min-width: 768px) and (max-width: 1224px) {
  .section-header span {
    font-size: 20px;
  }

  section {
    padding-inline: 30px;
  }
}
</style>

<template>
  <div class="privacy-policy">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('privacyPolicy.title') }}</h1>
      <p>{{ $t('privacyPolicy.intro') }}</p>
      <p>{{ $t('privacyPolicy.intro2') }}</p>
    </section>

    <!-- جمع واستخدام المعلومات -->
    <section class="collection-use">
      <h2>{{ $t('privacyPolicy.collectionUseTitle') }}</h2>
      <ul>
        <li>{{ $t('privacyPolicy.collectionUseItem1') }}</li>
        <li>{{ $t('privacyPolicy.collectionUseItem2') }}</li>
        <li>{{ $t('privacyPolicy.collectionUseItem3') }}</li>
        <li>{{ $t('privacyPolicy.collectionUseItem4') }}</li>
      </ul>
    </section>

    <!-- تسجيل البيانات -->
    <section class="log-data">
      <h2>{{ $t('privacyPolicy.logDataTitle') }}</h2>
      <p>{{ $t('privacyPolicy.logDataIntro') }}</p>
      <ul>
        <li>{{ $t('privacyPolicy.logDataItem1') }}</li>
        <li>{{ $t('privacyPolicy.logDataItem2') }}</li>
        <li>{{ $t('privacyPolicy.logDataItem3') }}</li>
        <li>{{ $t('privacyPolicy.logDataItem4') }}</li>
      </ul>
    </section>

    <!-- ملفات تعريف الارتباط -->
    <section class="cookies">
      <h2>{{ $t('privacyPolicy.cookiesTitle') }}</h2>
      <p>{{ $t('privacyPolicy.cookiesIntro') }}</p>
      <p>{{ $t('privacyPolicy.cookiesChoice') }}</p>
    </section>

    <!-- مقدمو الخدمات الخارجية -->
    <section class="third-parties">
      <h2>{{ $t('privacyPolicy.thirdPartiesTitle') }}</h2>
      <ul>
        <li>{{ $t('privacyPolicy.thirdPartiesIntro') }}</li>
        <li>{{ $t('privacyPolicy.thirdPartiesAccess') }}</li>
        <li>{{ $t('privacyPolicy.thirdPartiesAdvice') }}</li>
      </ul>
    </section>

    <!-- الأمان -->
    <section class="security">
      <h2>{{ $t('privacyPolicy.securityTitle') }}</h2>
      <ul>
        <li>{{ $t('privacyPolicy.securityItem1') }}</li>
        <li>{{ $t('privacyPolicy.securityItem2') }}</li>
        <li>{{ $t('privacyPolicy.securityItem3') }}</li>
      </ul>
    </section>

    <!-- روابط لمواقع أخرى -->
    <section class="external-links">
      <h2>{{ $t('privacyPolicy.externalLinksTitle') }}</h2>
      <p>{{ $t('privacyPolicy.externalLinksDesc') }}</p>
    </section>

    <!-- خصوصية الأطفال -->
    <section class="children">
      <h2>{{ $t('privacyPolicy.childrenPrivacyTitle') }}</h2>
      <p>{{ $t('privacyPolicy.childrenPrivacyDesc') }}</p>
    </section>

    <!-- التحديثات -->
    <section class="updates">
      <h2>{{ $t('privacyPolicy.policyUpdatesTitle') }}</h2>
      <p>{{ $t('privacyPolicy.policyUpdatesDesc') }}</p>
      <p><strong>{{ $t('privacyPolicy.policyEffectiveDate') }}</strong></p>
    </section>

    <!-- التواصل -->
    <section class="contact">
      <h2>{{ $t('privacyPolicy.contactSectionTitle') }}</h2>
      <p>{{ $t('privacyPolicy.contactDescription') }}</p>
      <p><a href="mailto:admin@scraapy.sa">admin@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'privacyPolicy'
  }
</script>
  
<style scoped>
  .privacy-policy {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 900px;
    margin: auto;
  }
  
  h1, h2 {
    color: #2c3e50;
    margin-top: 40px;
  }
  
  .intro {
    margin-bottom: 30px;
  }
  
  ul {
    padding-left: 20px;
  }
  
  .contact a {
    color: #007bff;
    text-decoration: none;
  }
  
  .contact a:hover {
    text-decoration: underline;
  }
  
  .btn {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    margin-top: 10px;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
</style>
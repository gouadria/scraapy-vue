<template>
  <div class="terms-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('termsP.title') }}</h1>
      <p>{{ $t('termsP.intro') }}</p>
    </section>

    <!-- التعريفات -->
    <section class="definitions">
      <h2>{{ $t('termsP.definitionsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('termsP.definitionsItems') }}</strong> {{ $t('termsP.dDefinitionsItems') }}</li>
        <li><strong>{{ $t('termsP.definitionsItems2') }}</strong> {{ $t('termsP.dDefinitionsItems2') }}</li>
        <li><strong>{{ $t('termsP.definitionsItems3') }}</strong> {{ $t('termsP.dDefinitionsItems3') }}</li>
        <li><strong>{{ $t('termsP.definitionsItems4') }}</strong> {{ $t('termsP.dDefinitionsItems4') }}</li>
        <li><strong>{{ $t('termsP.definitionsItems5') }}</strong> {{ $t('termsP.dDefinitionsItems5') }}</li>
      </ul>
    </section>

    <!-- استخدام المنصة -->
    <section class="platform-use">
      <h2>{{ $t('termsP.platformUseTitle') }}</h2>
      <ul>
        <li>{{ $t('termsP.platformUseItems') }}</li>
        <li>{{ $t('termsP.platformUseItems2') }}</li>
        <li>{{ $t('termsP.platformUseItems3') }}</li>
        <li>{{ $t('termsP.platformUseItems4') }}</li>
      </ul>
    </section>

    <!-- الرسوم والمعاملات -->
    <section class="fees">
      <h2>{{ $t('termsP.feesTitle') }}</h2>
      <ul>
        <li>{{ $t('termsP.feesItems') }}</li>
        <li>{{ $t('termsP.feesItems2') }}</li>
        <li>{{ $t('termsP.feesItems3') }}</li>
        <li>{{ $t('termsP.feesItems4') }}</li>
      </ul>
    </section>

    <!-- الحقوق الفكرية -->
    <section class="ip-rights">
      <h2>{{ $t('termsP.ipRightsTitle') }}</h2>
      <ul>
        <li>{{ $t('termsP.ipRightsItems') }}</li>
        <li>{{ $t('termsP.ipRightsItems2') }}</li>
      </ul>
    </section>

    <!-- الأمان والسلوك -->
    <section class="security">
      <h2>{{ $t('termsP.securityTitle') }}</h2>
      <ul>
        <li>{{ $t('termsP.securityItems') }}</li>
        <li>{{ $t('termsP.securityItems2') }}</li>
        <li>{{ $t('termsP.securityItems3') }}</li>
      </ul>
    </section>

    <!-- المسؤولية والتعويض -->
    <section class="responsibility">
      <h2>{{ $t('termsP.responsibilityTitle') }}</h2>
      <ul>
        <li>{{ $t('termsP.responsibilityItems') }}</li>
        <li>{{ $t('termsP.responsibilityItems2') }}</li>
        <li>{{ $t('termsP.responsibilityItems3') }}</li>
      </ul>
    </section>

    <!-- التعديلات -->
    <section class="updates">
      <h2>{{ $t('termsP.updatesTitle') }}</h2>
      <p>{{ $t('termsP.updatesDesc') }}</p>
    </section>

    <!-- التواصل -->
    <section class="contact">
      <h2>{{ $t('termsP.contactTitle') }}</h2>
      <p>{{ $t('termsP.contactDesc') }} <a href="mailto:admin@scraapy.sa">admin@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'TermsAndConditions'
  }
</script>
  
<style scoped>
  .terms-page {
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
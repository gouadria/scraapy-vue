<template>
  <div class="service-providers-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('serviceProviders.title') }}</h1>
      <p>{{ $t('serviceProviders.intro') }}</p>
      <p>{{ $t('serviceProviders.intro2') }}</p>
    </section>

    <!-- فرص الشراكة -->
    <section class="partnership-opportunities">
      <h2>{{ $t('serviceProviders.opportunitiesTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('serviceProviders.opportunityDemolition') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityScrapDealers') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityRentalServices') }}</strong>
          <ul>
            <li>{{ $t('serviceProviders.opportunityWasteContainers') }}</li>
            <li>{{ $t('serviceProviders.opportunityEquipment') }}</li>
          </ul>
        </li>
        <li><strong>{{ $t('serviceProviders.opportunityInspection') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityLabs') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityTransport') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityCollectionCenters') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityRecyclingFacilities') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.opportunityDisposalFacilities') }}</strong></li>
      </ul>
    </section>

    <!-- مزايا الانضمام -->
    <section class="benefits">
      <h2>{{ $t('serviceProviders.benefitsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('serviceProviders.benefitDirectAccess') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.benefitProfitableContracts') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.benefitFlexiblePricing') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.benefitMarketingSupport') }}</strong></li>
        <li><strong>{{ $t('serviceProviders.benefitCertifiedPartner') }}</strong></li>
      </ul>
    </section>

    <!-- خطوات التسجيل -->
    <section class="registration-steps">
      <h2>{{ $t('serviceProviders.registrationStepsTitle') }}</h2>
      <ol>
        <li>{{ $t('serviceProviders.registrationStep') }} <a href="https://scraapy.sa/auth/register"  target="_blank">{{ $t('serviceProviders.registrationStep1') }}</a>.</li>
        <li>{{ $t('serviceProviders.registrationStep2') }}</li>
        <li>{{ $t('serviceProviders.registrationStep3') }}</li>
        <li>{{ $t('serviceProviders.registrationStep4') }}</li>
      </ol>
    </section>

    <!-- رسالة ختامية -->
    <section class="closing">
      <p><strong>{{ $t('serviceProviders.closingText') }}</strong></p>
      <a href="https://scraapy.sa/auth/register"  target="_blank" class="btn">{{ $t('serviceProviders.ctaButtonText') }}</a>
    </section>

    <!-- التواصل -->
    <section class="contact">
      <h3>{{ $t('serviceProviders.contactTitle') }}</h3>
      <p>{{ $t('serviceProviders.contactEmailLabel') }}: <a href="mailto:partners@scraapy.sa">partners@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ServiceProviders'
  }
</script>
  
<style scoped>
  .service-providers-page {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 900px;
    margin: auto;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
    margin-top: 40px;
  }
  
  .intro {
    margin-bottom: 30px;
  }
  
  ul, ol {
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
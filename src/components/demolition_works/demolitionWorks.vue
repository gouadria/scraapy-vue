<template>
  <div class="demolition-services">
    <!-- العنوان -->
    <h1>{{ $t('demolitionWorks.title') }}</h1>
    <p>{{ $t('demolitionWorks.intro') }}</p>

    <!-- مراحل الخدمة -->
    <section class="service-stages">
      <h2>{{ $t('demolitionWorks.stagesTitle') }}</h2>
      <ol>
        <li><strong>{{ $t('demolitionWorks.stageAssessment') }}</strong> {{ $t('demolitionWorks.dStageAssessment') }}</li>
        <li><strong>{{ $t('demolitionWorks.stagePlanning') }}</strong> {{ $t('demolitionWorks.dStagePlanning') }}</li>
        <li><strong>{{ $t('demolitionWorks.stageExecution') }}</strong> {{ $t('demolitionWorks.dStageExecution') }}</li>
        <li><strong>{{ $t('demolitionWorks.stageWasteRemoval') }}</strong> {{ $t('demolitionWorks.dStageWasteRemoval') }}</li>
        <li><strong>{{ $t('demolitionWorks.stageCleaning') }}</strong> {{ $t('demolitionWorks.dStageCleaning') }}</li>
      </ol>
    </section>

    <!-- خدمات مساندة -->
    <section class="support-services">
      <h2>{{ $t('demolitionWorks.supportServicesTitle') }}</h2>
      <ul>
        <li>{{ $t('demolitionWorks.supportServiceTrucks') }}</li>
        <li>{{ $t('demolitionWorks.supportServiceContainers') }}</li>
        <li>{{ $t('demolitionWorks.supportServiceRecycling') }}</li>
      </ul>
    </section>

    <!-- لماذا تختارنا -->
    <section class="why-us">
      <h2>{{ $t('demolitionWorks.whyUsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('demolitionWorks.whyUsSafety') }}</strong> {{ $t('demolitionWorks.dWhyUsSafety') }}</li>
        <li><strong>{{ $t('demolitionWorks.whyUsTransparentPricing') }}</strong> {{ $t('demolitionWorks.dWhyUsTransparentPricing') }}</li>
        <li><strong>{{ $t('demolitionWorks.whyUsSustainability') }}</strong> {{ $t('demolitionWorks.dWhyUsSustainability') }}</li>
        <li><strong>{{ $t('demolitionWorks.whyUsProfessionalTeam') }}</strong> {{ $t('demolitionWorks.dWhyUsProfessionalTeam') }}</li>
      </ul>
    </section>

    <!-- خطوات طلب الخدمة -->
    <section class="how-to-request">
      <h2>{{ $t('demolitionWorks.requestStepsTitle') }}</h2>
      <ol>
        <li>{{ $t('demolitionWorks.requestStepRegister') }}</li>
        <li>{{ $t('demolitionWorks.requestStepSelect') }}</li>
        <li>{{ $t('demolitionWorks.requestStepReceiveOffers') }}</li>
        <li>{{ $t('demolitionWorks.requestStepChooseProvider') }}</li>
        <li>{{ $t('demolitionWorks.requestStepMonitor') }}</li>
      </ol>
    </section>

    <!-- رسالة ختامية -->
    <section class="cta">
      <h2>{{ $t('demolitionWorks.ctaStartNow') }}</h2>
      <p>{{ $t('demolitionWorks.ctaDescription') }}</p>
      <p>
        {{ $t('demolitionWorks.ctaContactEmail') }}:
        <a href="mailto:demo@scraapy.sa">demo@scraapy.sa</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DemolitionWorks'
}
</script>

<style scoped>
.demolition-services {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

h1, h2 {
  color: #2c3e50;
  margin-top: 40px;
}

ol, ul {
  padding-left: 20px;
}

.cta {
  text-align: center;
  margin-top: 40px;
}

.btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
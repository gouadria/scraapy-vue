<template>
  <div class="policy-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('materialsTheft.title') }}</h1>
      <p>{{ $t('materialsTheft.intro') }}</p>
      <p>{{ $t('materialsTheft.intro2') }}</p>
    </section>

    <!-- الإجراءات الوقائية -->
    <section class="preventive-measures">
      <h2>{{ $t('materialsTheft.preventiveMeasuresTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('materialsTheft.measureOfficialCertification') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.measureTaxInvoices') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.measureTransparentPayments') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.measureIdentityVerification') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.measureDataArchiving') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.measureBlockedShipments') }}</strong></li>
      </ul>
    </section>

    <!-- التعامل مع الحالات المشبوهة -->
    <section class="suspicious-cases">
      <h2>{{ $t('materialsTheft.suspiciousCasesTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('materialsTheft.caseIntensiveInspection') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.caseImmediateReport') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.caseAccountSuspension') }}</strong></li>
      </ul>
    </section>

    <!-- العقوبات -->
    <section class="penalties">
      <h2>{{ $t('materialsTheft.penaltiesTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('materialsTheft.penaltyFinancialFines') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.penaltyPermanentBan') }}</strong></li>
      </ul>
    </section>

    <!-- التزام الشركة -->
    <section class="community-protection">
      <h2>{{ $t('materialsTheft.communityProtectionTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('materialsTheft.communityAwareness') }}</strong></li>
        <li><strong>{{ $t('materialsTheft.communityReportingLine') }}</strong></li>
      </ul>
    </section>

    <!-- رسالة ختامية -->
    <section class="closing">
      <p><strong>{{ $t('materialsTheft.closingMessage') }}</strong></p>
      <p>{{ $t('materialsTheft.contactEmailLabel') }}:
        <a :href="'mailto:' + $t('materialsTheft.contactEmail')">{{ $t('materialsTheft.contactEmail') }}</a>
      </p>
      <a href="https://www.scraapy.sa/policies"  target="_blank" class="btn">
        {{ $t('materialsTheft.ctaButtonText') }}
      </a>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'materialsTheftPolicy'
  }
</script>
  
<style scoped>
  .policy-page {
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
  
  li strong {
    color: #333;
  }
  
  .community-protection a {
    color: #007bff;
    text-decoration: none;
  }
  
  .community-protection a:hover {
    text-decoration: underline;
  }
  
  .closing {
    margin-top: 40px;
    text-align: center;
  }
  
  .btn {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
</style>
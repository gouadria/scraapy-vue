<template>
  <div class="qhs-policy">
    <!-- العنوان -->
    <h1>{{ $t('qhs.title') }}</h1>
    <p>{{ $t('qhs.intro') }}</p>

    <!-- الجودة -->
    <section class="quality-section">
      <h2>{{ $t('qhs.qualitySectionTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('qhs.qualityItemExcellence') }}</strong></li>
        <li><strong>{{ $t('qhs.qualityItemImprovement') }}</strong></li>
        <li><strong>{{ $t('qhs.qualityItemPerformance') }}</strong></li>
      </ul>
    </section>

    <!-- الصحة والسلامة -->
    <section class="safety-section">
      <h2>{{ $t('qhs.safetySectionTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('qhs.safetyItemRiskManagement') }}</strong></li>
        <li><strong>{{ $t('qhs.safetyItemTraining') }}</strong></li>
        <li><strong>{{ $t('qhs.safetyItemPPE') }}</strong></li>
        <li><strong>{{ $t('qhs.safetyItemHealthPrograms') }}</strong></li>
      </ul>
    </section>

    <!-- المسؤولية البيئية -->
    <section class="environment-section">
      <h2>{{ $t('qhs.environmentSectionTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('qhs.environmentItemInnovation') }}</strong></li>
        <li><strong>{{ $t('qhs.environmentItemCompliance') }}</strong></li>
        <li><strong>{{ $t('qhs.environmentItemISO14001') }}</strong></li>
        <li><strong>{{ $t('qhs.environmentItemCircularEconomy') }}</strong></li>
      </ul>
    </section>

    <!-- الشهادات والامتثال -->
    <section class="certifications">
      <h2>{{ $t('qhs.certificationsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('qhs.certificationISO9001') }}</strong></li>
        <li><strong>{{ $t('qhs.certificationISO45001') }}</strong></li>
        <li><strong>{{ $t('qhs.certificationISO14001') }}</strong></li>
        <li><strong>{{ $t('qhs.certificationStrategicPartnerships') }}</strong></li>
      </ul>
    </section>

    <!-- تمكين الموظفين -->
    <section class="empowerment">
      <h2>{{ $t('qhs.empowermentTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('qhs.empowermentTraining') }}</strong></li>
        <li><strong>{{ $t('qhs.empowermentInternalIdeas') }}</strong></li>
        <li><strong>{{ $t('qhs.empowermentRewards') }}</strong></li>
      </ul>
    </section>

    <!-- رسالة ختامية والتواصل -->
    <section class="closing">
      <p>{{ $t('qhs.closingStatement') }}</p>
      <p>{{ $t('qhs.contactLabel') }} <a href="mailto:quality@scraapy.sa">quality@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'QualityHealthSafetyPolicy'
  }
</script>

<style scoped>
  .qhs-policy {
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

  ul {
    padding-left: 20px;
  }

  .closing {
    text-align: center;
    margin-top: 40px;
  }

  .closing a {
    color: #007bff;
    text-decoration: none;
  }

  .closing a:hover {
    text-decoration: underline;
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
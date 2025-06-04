<template>
  <div class="franchise-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('franchise.title') }}</h1>
      <p>{{ $t('franchise.intro') }}</p>
      <p>{{ $t('franchise.intro2') }}</p>
    </section>

    <!-- لماذا تختارنا؟ -->
    <section class="why-us">
      <h2>{{ $t('franchise.whyUsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('franchise.whyUsItem1') }}</strong></li>
        <li><strong>{{ $t('franchise.whyUsItem2') }}</strong></li>
        <li><strong>{{ $t('franchise.whyUsItem3') }}</strong></li>
        <li><strong>{{ $t('franchise.whyUsItem4') }}</strong></li>
        <li><strong>{{ $t('franchise.whyUsItem5') }}</strong></li>
      </ul>
    </section>

    <!-- مجالات الاستثمار -->
    <section class="investment-sectors">
      <h2>{{ $t('franchise.investmentSectorsTitle') }}</h2>
      <ul>
        <li>{{ $t('franchise.investmentSector1') }}</li>
        <li>{{ $t('franchise.investmentSector2') }}</li>
        <li>{{ $t('franchise.investmentSector3') }}</li>
        <li>{{ $t('franchise.investmentSector4') }}</li>
        <li>{{ $t('franchise.investmentSector5') }}</li>
      </ul>
    </section>

    <!-- أنواع الامتياز -->
    <section class="franchise-types">
      <h2>{{ $t('franchise.typesTitle') }}</h2>
      <div class="type">
        <h3>{{ $t('franchise.typeLocal') }}</h3>
        <p>{{ $t('franchise.typeLocalDesc') }}</p>
      </div>
      <div class="type">
        <h3>{{ $t('franchise.typeGlobal') }}</h3>
        <p>{{ $t('franchise.typeGlobalDesc') }}</p>
      </div>
    </section>

    <!-- كيف نعمل معًا؟ -->
    <section class="how-we-work">
      <h2>{{ $t('franchise.howWeWorkTitle') }}</h2>
      <ol>
        <li><strong>{{ $t('franchise.stepAssessment') }}</strong></li>
        <li><strong>{{ $t('franchise.stepAgreement') }}</strong></li>
        <li><strong>{{ $t('franchise.stepExecution') }}</strong></li>
        <li><strong>{{ $t('franchise.stepFollowUp') }}</strong></li>
      </ol>
    </section>

    <!-- من نبحث عنه؟ -->
    <section class="who-we-are-looking-for">
      <h2>{{ $t('franchise.lookingForTitle') }}</h2>
      <ul>
        <li>{{ $t('franchise.lookingForItem1') }}</li>
        <li>{{ $t('franchise.lookingForItem2') }}</li>
        <li>{{ $t('franchise.lookingForItem3') }}</li>
        <li>{{ $t('franchise.lookingForItem4') }}</li>
      </ul>
    </section>

    <!-- رسالة ختامية وزر التواصل -->
    <section class="closing">
      <p><strong>{{ $t('franchise.closingMessage') }}</strong></p>
      <p>{{ $t('franchise.contactNow') }}:
        <a :href="'mailto:' + $t('franchise.contactEmail')">{{ $t('franchise.contactEmail') }}</a>
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Franchise'
  }
</script>

<style scoped>
  .franchise-page {
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

  .intro {
    margin-bottom: 30px;
  }

  ul, ol {
    padding-left: 20px;
  }

  .type {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .closing {
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
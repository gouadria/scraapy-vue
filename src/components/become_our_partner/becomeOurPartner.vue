<template>
  <div class="become-partner">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('partner.title') }}</h1>
      <p>{{ $t('partner.intro') }} {{ $t('partner.intro2') }}</p>
    </section>

    <!-- هل تنطبق عليك هذه الحالات؟ -->
    <section class="questions">
      <h2>{{ $t('partner.questionsTitle') }}</h2>
      <ul>
        <li>{{ $t('partner.question1') }}</li>
        <li>{{ $t('partner.question2') }}</li>
        <li>{{ $t('partner.question3') }}</li>
      </ul>
      <p>{{ $t('partner.questionFinal') }}</p>
    </section>

    <!-- لماذا الشراكة معنا -->
    <section class="why-partner">
      <h2>{{ $t('partner.whyPartnerTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('partner.whyPartnerItem1') }}</strong></li>
        <li><strong>{{ $t('partner.whyPartnerItem2') }}</strong></li>
        <li><strong>{{ $t('partner.whyPartnerItem3') }}</strong></li>
        <li><strong>{{ $t('partner.whyPartnerItem4') }}</strong></li>
      </ul>
    </section>

    <!-- من يمكنه الشراكة -->
    <section class="who-can-join">
      <h2>{{ $t('partner.whoCanJoinTitle') }}</h2>
      <ul>
        <li>{{ $t('partner.whoCanJoinItem1') }}</li>
        <li>{{ $t('partner.whoCanJoinItem2') }}</li>
        <li>{{ $t('partner.whoCanJoinItem3') }}</li>
        <li>{{ $t('partner.whoCanJoinItem4') }}</li>
        <li>{{ $t('partner.whoCanJoinItem5') }}</li>
        <li>{{ $t('partner.whoCanJoinItem6') }}</li>
        <li>{{ $t('partner.whoCanJoinItem7') }}</li>
        <li>{{ $t('partner.whoCanJoinItem8') }}</li>
        <li>{{ $t('partner.whoCanJoinItem9') }}</li>
      </ul>
    </section>

    <!-- خطوات التسجيل -->
    <section class="registration-steps">
      <h2>{{ $t('partner.registrationStepsTitle') }}</h2>
      <ol>
        <li>{{ $t('partner.registrationStep1') }}</li>
        <li>{{ $t('partner.registrationStep2') }}</li>
        <li>{{ $t('partner.registrationStep3') }}</li>
        <li>{{ $t('partner.registrationStep4') }}</li>
        <li>{{ $t('partner.registrationStep5') }}</li>
        <li>{{ $t('partner.registrationStep6') }}</li>
      </ol>
    </section>

    <!-- ملاحظات -->
    <section class="notes">
      <h3>{{ $t('partner.notesTitle') }}</h3>
      <ul>
        <li>{{ $t('partner.note1') }}</li>
        <li>{{ $t('partner.note2') }}</li>
      </ul>
    </section>

    <!-- زر التسجيل -->
    <section class="cta">
      <h2>{{ $t('partner.ctaTitle') }}</h2>
      <br/>
      <router-link :to="{ name: 'marketplace' }" target="_blank" class="btn">{{ $t('partner.ctaButtonText') }}</router-link>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'becomeOurPartner'
  }
</script>
  
<style scoped>
  .become-partner {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  ul, ol {
    padding-left: 20px;
  }
  
  .intro, .questions, .why-partner, .who-can-join, .registration-steps, .notes, .cta {
    margin-bottom: 30px;
  }
  
  .btn {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
</style>
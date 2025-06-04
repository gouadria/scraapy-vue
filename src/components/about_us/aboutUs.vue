<template>
  <div class="about-us">
    <!-- القسم الأول: عن الشركة -->
    <section class="section-intro">
      <h1>{{ $t('aboutUs.title') }}</h1>
      <p>{{ $t('aboutUs.intro') }}</p>
    </section>

    <!-- الرؤية والرسالة -->
    <section class="vision-mission">
      <div class="vision">
        <h2>{{ $t('aboutUs.visionTitle') }}</h2>
        <p>{{ $t('aboutUs.visionText') }}</p>
      </div>

      <div class="mission">
        <h2>{{ $t('aboutUs.missionTitle') }}</h2>
        <ul>
          <li><strong>{{ $t('aboutUs.missionItems') }}</strong> {{ $t('aboutUs.dMissionItems') }}</li>
          <li><strong>{{ $t('aboutUs.missionItems2') }}</strong> {{ $t('aboutUs.dMissionItems2') }}</li>
          <li><strong>{{ $t('aboutUs.missionItems3') }}</strong> {{ $t('aboutUs.dMissionItems3') }}</li>
        </ul>
      </div>
    </section>

    <!-- نطاق العمل -->
    <section class="scope">
      <h2>{{ $t('aboutUs.scopeTitle') }}</h2>
      <ul>
        <li>{{ $t('aboutUs.scopeItems') }}</li>
        <li>{{ $t('aboutUs.scopeItems2') }}</li>
        <li>{{ $t('aboutUs.scopeItems3') }}
          <ul>
            <li>{{ $t('aboutUs.scopeItems31') }}</li>
            <li>{{ $t('aboutUs.scopeItems32') }}</li>
            <li>{{ $t('aboutUs.scopeItems33') }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <!-- استراتيجياتنا -->
    <section class="strategies">
      <h2>{{ $t('aboutUs.strategiesTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('aboutUs.strategiesItems') }}</strong> {{ $t('aboutUs.dStrategiesItems') }}</li>
        <li><strong>{{ $t('aboutUs.strategiesItems2') }}</strong> {{ $t('aboutUs.dStrategiesItems2') }}</li>
        <li><strong>{{ $t('aboutUs.strategiesItems3') }}</strong> {{ $t('aboutUs.dStrategiesItems3') }}</li>
      </ul>
    </section>

    <!-- كيف يعمل سكرابي -->
    <section class="how-it-works">
      <h2>{{ $t('aboutUs.howItWorksTitle') }}</h2>
      <ol>
        <li>{{ $t('aboutUs.howItWorksSteps') }}</li>
        <li>{{ $t('aboutUs.howItWorksSteps2') }}</li>
        <li>{{ $t('aboutUs.howItWorksSteps3') }}</li>
        <li>{{ $t('aboutUs.howItWorksSteps4') }}</li>
        <li>{{ $t('aboutUs.howItWorksSteps5') }}</li>
      </ol>
    </section>

    <!-- لماذا نتميز -->
    <section class="why-us">
      <h2>{{ $t('aboutUs.whyUsTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('aboutUs.whyUsItems') }}</strong> {{ $t('aboutUs.dWhyUsItems') }}</li>
        <li><strong>{{ $t('aboutUs.whyUsItems2') }}</strong> {{ $t('aboutUs.dWhyUsItems2') }}</li>
        <li><strong>{{ $t('aboutUs.whyUsItems3') }}</strong> {{ $t('aboutUs.dWhyUsItems3') }}</li>
      </ul>
    </section>

    <!-- الرؤية المستقبلية -->
    <section class="future-vision">
      <h2>{{ $t('aboutUs.futureVisionTitle') }}</h2>
      <ul>
        <li>{{ $t('aboutUs.futureVisionItems') }}</li>
        <li>{{ $t('aboutUs.futureVisionItems2') }}</li>
        <li>{{ $t('aboutUs.futureVisionItems3') }}</li>
      </ul>
    </section>

    <!-- زر الانضمام -->
    <section class="join-section">
      <h2>{{ $t('aboutUs.joinTitle') }}</h2>
      <p>{{ $t('aboutUs.joinDesc') }}</p>
      <br/>
      <router-link :to="{ name: 'marketplace' }" class="btn">
        {{ $t('aboutUs.joinBtn') }}
      </router-link>
    </section>
  </div>
</template>
  
<script>
  export default {
    name: 'aboutUs'
  }
</script>
  
<style scoped>
  .about-us {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
  }
  
  .section-intro, .vision-mission, .scope, .strategies, .how-it-works, .why-us, .future-vision, .join-section {
    margin-bottom: 40px;
  }
  
  h1, h2 {
    color: #2c3e50;
  }
  
  ul, ol {
    padding-left: 20px;
  }
  
  .vision-mission {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .vision, .mission {
    flex: 1;
    min-width: 300px;
  }
  
  .btn {
    display: inline-block;
    background-color: #16B277;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
  }
  
  .btn:hover {
    background-color: #16B277;
  }
</style>
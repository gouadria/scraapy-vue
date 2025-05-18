<script lang="ts">
export default {
  data() {
    return {
      testimonials: [
        {
          quote:
            'Scraapy is a great platform for selling scrap. I have been using it for a while now and I am very satisfied with the service. The customer service is very responsive and helpful. I would recommend it to anyone who wants to sell scrap.',
          author: 'John Doe',
          title: 'Founder, Acme Company'
        },
        {
          quote:
            'The recycling industry is a very important industry and Scraapy is doing a great job in making it easier for people to buy and sell scrap materials. I would recommend it to anyone who is in the recycling industry.',
          author: 'James Smith',
          title: 'CEO, Smith Recycling'
        },
        {
          quote:
            'Being able to buy scrap materials from Scraapy has been a great experience. The platform is very easy to use and the customer service is very helpful. I would recommend it to anyone who wants to buy scrap materials.',
          author: 'Abullah Saleh',
          title: 'Procurement Manager, Abdullah Fouad Group'
        }
      ]
    }
  }
}
</script>
<template>
  <section>
    <div class="section-container max-width">
      <div class="section-header">
        <div>
          <span>{{ $t('landingSection3.headerSpan') }}</span>
          <h1>{{ $t('landingSection3.headerTitle') }}</h1>
        </div>
      </div>

      <div class="section-content">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
          <p>{{ $t(`landingSection3.testimonial${index + 1}Quote`) }}</p>
          <div class="testimonial-card-author">
            <img src="" alt="Author photo" />
            <div>
              <h1>{{ $t(`landingSection3.testimonial${index + 1}Author`) }}</h1>
              <span>{{ $t(`landingSection3.testimonial${index + 1}Title`) }}</span>
            </div>
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
  gap: 40px;
}

.testimonial-card {
  display: flex;
  max-width: 380px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex: 1 0 0;
}

.testimonial-card p {
  color: var(--Dark-600, #5d5d5d);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

.testimonial-card-author {
  display: flex;
  margin-top: auto;
  gap: 10px;
  align-items: center;
}

.testimonial-card-author img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--Dark-50, #f6f6f6);
}

.testimonial-card-author h1 {
  color: var(--Dark-950, #121212);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.1px;
}

.testimonial-card-author span {
  color: var(--Dark-950, #121212);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
@media (max-width: 1441px) {
  section {
    padding-inline: 110px;
  }
}
.section-container{
  display: none;
}
@media (max-width: 768px) {
  section {
    padding: 20px;
  }
}
</style>

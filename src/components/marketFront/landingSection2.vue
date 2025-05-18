<script lang="ts">
// import langToggle from '@/components/UIElements/langToggle.vue'
import MainBtn from '@/components/UIElements/MainBtn.vue'
import buyScrapimage from '@/assets/services-image-1.png'
import sellScrapimage from '@/assets/services-image-2.png'
import rentEquipmentimage from '@/assets/services-image-3.png'

export default {
  components: {
    MainBtn
  },
  data() {
    return {
      items: [
        {
          title: 'Buy Scrap',
          image: buyScrapimage,
          description:
            'Huge collection of scrap materials available for you to buy. Get the best deals on scrap materials.',
          buttonText: 'Buy Scrap'
        },
        {
          title: 'Sell Scrap',
          image: sellScrapimage,
          description:
            'Sell your scrap materials to the best buyers. Get the best price for your scrap materials.',
          buttonText: 'Sell Scrap'
        },
        {
          title: 'Rent Equipment',
          image: rentEquipmentimage,
          description:
            'Rent equipment for your scrap business. Get the best deals on equipment for your business.',
          buttonText: 'Rent Equipment'
        }
        // Add more items as needed
      ]
    }
  },
  methods: {
    isRowReversed(index: any) {
      return index % 2 !== 0
    }
  }
}
</script>
<template>
  <section>
    <div class="section-container max-width">
      <div class="section-header">
        <div>
          <span>{{ $t('landingSection2.headerSpan') }}</span>
          <h1>{{ $t('landingSection2.headerTitle') }}</h1>
        </div>
      </div>

      <div class="section-content">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="['more-item', { 'row-reverse': isRowReversed(index) }]"
        >
          <img :src="item.image" alt="" />
          <div class="more-item-content">
            <div class="more-item-text">
              <h1>{{ $t(`landingSection2.item${index + 1}Title`) }}</h1>
              <p>{{ $t(`landingSection2.item${index + 1}Description`) }}</p>
            </div>
            <MainBtn type="green">
              {{ $t(`landingSection2.item${index + 1}ButtonText`) }}
            </MainBtn>
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
  flex-direction: column;
  gap: 30px;
}

.more-item {
  display: flex;
  width: 100%;
  gap: 50px;
}

.row-reverse {
  flex-direction: row-reverse;
}

.more-item img {
  width: 587px;
  height: 430px;
  background-color: var(--Dark-50, #f6f6f6);
  border-radius: 40px;
  flex-shrink: 0;
}

.more-item-content {
  display: flex;
  padding: 30px 50px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
}

.more-item-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.more-item-text h1 {
  color: var(--Dark-950, #121212);
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: -0.72px;
}

.more-item-text p {
  color: var(--Dark-600, #5d5d5d);
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}

@media (max-width: 1441px) {
  section {
    padding-inline: 110px;
  }
}

@media (max-width: 768px) {
  section {
    padding: 20px;
  }
  .section-container {
    gap: 30px;
    padding: 100px 0 20px 0;
  }
  .section-header h1 {
    font-size: 36px;
  }
  .more-item {
    flex-direction: column;
    gap: 20px;
  }
  .more-item img {
    width: 100%;
    height: auto;
  }
  .more-item-content {
    padding: 0px;
  }
  .more-item-text {
    gap: 0;
  }
  .more-item-text h1 {
    font-size: 24px;
  }
  .more-item-text p {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 1224px) {
  .more-item {
    flex-direction: column;
    gap: 20px;
  }
  .more-item img {
    width: 100%;
    height: auto;
  }
  .more-item-content {
    padding: 0px;
  }
  .more-item-text {
    gap: 0;
  }
  .more-item-text h1 {
    font-size: 24px;
  }
  .more-item-text p {
    font-size: 16px;
  }
  section[data-v-ec21fe2c] {
    padding-inline: 30px;
  }
  .section-content {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
  }
}
</style>

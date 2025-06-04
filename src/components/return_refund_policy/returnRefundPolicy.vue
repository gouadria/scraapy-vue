<template>
  <div class="policy-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('returnPolicy.title') }}</h1>
      <p>{{ $t('returnPolicy.intro') }}</p>
    </section>

    <!-- سياسة إرجاع النفايات -->
    <section class="waste-policy">
      <h2>{{ $t('returnPolicy.wastePolicyTitle') }}</h2>
      <ul>
        <li><strong>{{ $t('returnPolicy.wastePolicyItem1') }}</strong></li>
        <li>{{ $t('returnPolicy.wastePolicyItem2') }}</li>
      </ul>
    </section>

    <!-- سياسة إرجاع المنتجات البيئية -->
    <section class="eco-products-policy">
      <h2>{{ $t('returnPolicy.ecoProductsPolicyTitle') }}</h2>
      <ul>
        <li>{{ $t('returnPolicy.ecoProductsPolicyItem1') }}</li>
        <li>{{ $t('returnPolicy.ecoProductsPolicyItem2') }}</li>
        <li>{{ $t('returnPolicy.ecoProductsPolicyItem3') }}</li>
        <li>{{ $t('returnPolicy.ecoProductsPolicyItem4') }}</li>
        <li><strong>{{ $t('returnPolicy.ecoProductsPolicyRefund') }}</strong></li>
      </ul>
    </section>

    <!-- إلغاء الخدمات المساندة -->
    <section class="support-services-cancel">
      <h2>{{ $t('returnPolicy.supportServicesCancelTitle') }}</h2>
      <ul>
        <li>{{ $t('returnPolicy.supportServicesCancelBefore') }}</li>
        <li><strong>{{ $t('returnPolicy.supportServicesCancelAfter') }}</strong></li>
        <ul>
          <li>{{ $t('returnPolicy.supportServicesCancelAfterCost') }}</li>
        </ul>
        <li>{{ $t('returnPolicy.supportServicesCancelAllCases') }}</li>
      </ul>
    </section>

    <!-- عملية الاسترداد -->
    <section class="refund-process">
      <h2>{{ $t('returnPolicy.refundProcessTitle') }}</h2>
      <ul>
        <li>{{ $t('returnPolicy.refundProcessItem1') }}</li>
        <li>{{ $t('returnPolicy.refundProcessItem2') }}</li>
        <li>{{ $t('returnPolicy.refundProcessItem3') }}</li>
      </ul>
    </section>

    <!-- تكاليف الشحن -->
    <section class="shipping-costs">
      <h2>{{ $t('returnPolicy.shippingCostsTitle') }}</h2>
      <ul>
        <li>{{ $t('returnPolicy.shippingCostsCustomerResponsibility') }}</li>
        <li>{{ $t('returnPolicy.shippingCostsNonRefundable') }}</li>
      </ul>
    </section>

    <!-- طريقة التواصل -->
    <section class="contact-support">
      <h2>{{ $t('returnPolicy.contactSupportTitle') }}</h2>
      <p>{{ $t('returnPolicy.contactSupportDesc') }}</p>
      <p><a href="mailto:support@scraapy.sa">support@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'returnRefundPolicy'
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
  
  .contact-support a {
    color: #007bff;
    text-decoration: none;
  }
  
  .contact-support a:hover {
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
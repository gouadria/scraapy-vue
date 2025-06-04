<template>
  <div class="subscriptions-page">
    <!-- العنوان -->
    <h1>{{ $t('subscriptions.title') }}</h1>
    <p>{{ $t('subscriptions.description') }}</p>

    <!-- قطاع الأفراد -->
    <section class="individuals-subscription">
      <h2>{{ $t('subscriptions.individualsTitle') }}</h2>
      <table>
        <thead>
          <tr>
            <th>{{ $t('subscriptions.individualsHeaderDesc') }}</th>
            <th>{{ $t('subscriptions.individualsHeaderMonthly') }}</th>
            <th>{{ $t('subscriptions.individualsHeaderQuarterly') }}</th>
            <th>{{ $t('subscriptions.individualsSemiAnnual') }}</th>
            <th>{{ $t('subscriptions.individualsAnnual') }}</th>
            <th>{{ $t('subscriptions.individualsPremium') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('subscriptions.individualsRowVerification') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowPage') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowScrapTransactions') }}</td>
            <td>5 {{ $t('subscriptions.transactions') }}</td>
            <td>24 {{ $t('subscriptions.transactions') }}</td>
            <td>55 {{ $t('subscriptions.transactions') }}</td>
            <td>{{ $t('subscriptions.individualsRowUnlimited') }}</td>
            <td>{{ $t('subscriptions.individualsRowUnlimited') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowPreferredPrice') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowPrioritySchedule') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowDemolition') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowRentConstructionContainers') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowRentPlasticContainers') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowCleanWaterSales') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowSewagePumping') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.individualsRowHomeProcessingMachine') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- قطاع الشركات التجارية -->
    <section class="commercial-subscription">
      <h2>{{ $t('subscriptions.commercialTitle') }}</h2>
      <table>
        <thead>
          <tr>
            <th>{{ $t('subscriptions.commercialHeaderDesc') }}</th>
            <th>{{ $t('subscriptions.commercialSemiAnnual') }}</th>
            <th>{{ $t('subscriptions.commercialAnnual') }}</th>
            <th>{{ $t('subscriptions.commercialPremium') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('subscriptions.commercialRowVerification') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowListing') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowInternalPage') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowInspectionContractor') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowShippingContractor') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowNonHazardousTransport') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowHazardousTransport') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowDemolitionContractor') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowContainerRental') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowWaterSales') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowSewagePumping') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowRenewalDiscount') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.commercialRowOpeningCredit') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowDash') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- قطاع مقدمي الخدمات -->
    <section class="providers-subscription">
      <h2>{{ $t('subscriptions.providersTitle') }}</h2>
      <table>
        <thead>
          <tr>
            <th>{{ $t('subscriptions.providersHeaderDesc') }}</th>
            <th>{{ $t('subscriptions.providersSemiAnnual') }}</th>
            <th>{{ $t('subscriptions.providersAnnual') }}</th>
            <th>{{ $t('subscriptions.providersPremium') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('subscriptions.providersRowVerification') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowListing') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowInternalPage') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowInspectionContractor') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowShippingContractor') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowNonHazardousTransport') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowHazardousTransport') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowDemolitionWorks') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowContainerRental') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowWaterSales') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
          <tr>
            <td>{{ $t('subscriptions.providersRowSewagePumping') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
            <td>{{ $t('subscriptions.individualsRowCheck') }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- زر الدعوة للتسجيل -->
    <section class="cta">
      <h3>{{ $t('subscriptions.ctaTitle') }}</h3>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Subscriptions'
  }
</script>
  
<style scoped>
  .subscriptions-page {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
    margin-top: 40px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  td:nth-child(1) {
    text-align: right;
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
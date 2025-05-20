<template>
    <div class="become-partner">
      <!-- القسم الأول -->
      <section class="intro">
        <h1>كن شريكنا</h1>
        <p>شكرًا لك على إظهار اهتمامك بـ <strong>سكرابي</strong>. إذا كنت من أصحاب المنشآت التي تنتج نفايات خطرة أو غير خطرة بشكل يومي، شهري، أو سنوي، أو تعمل في مجال بيع وشراء السكراب، أو لديك خدمات مساندة لإعادة التدوير، فإننا نتطلع للعمل معك!</p>
      </section>
  
      <!-- هل تنطبق عليك هذه الحالات؟ -->
      <section class="questions">
        <h2>هل تنطبق عليك الحالات التالية؟</h2>
        <ul>
          <li>هل تمتلك منشأة تجارية أو صناعية أو خدمية تنتج نفايات خطرة أو غير خطرة؟</li>
          <li>هل أنت شخص يتعامل في بيع وشراء أنواع مختلفة من النفايات أو الخردة؟</li>
          <li>هل نشاطك يتعلق بالخدمات المساندة مثل تأجير الحاويات، النقل، الفحص، أو التخزين؟</li>
        </ul>
        <p>إذا كانت الإجابة "نعم"، فأخبرنا لنبدأ رحلة العمل معًا.</p>
      </section>
  
      <!-- لماذا الشراكة معنا -->
      <section class="why-partner">
        <h2>لماذا الشراكة معنا؟</h2>
        <ul>
          <li>فرصة مربحة للطرفين.</li>
          <li>ربط البائعين والمشترين لتحقيق المنافع المشتركة.</li>
          <li>نُوفّر لك الوصول إلى قطاعات متعددة وبناء سوق إعادة التدوير.</li>
          <li>دعم كامل لرسالتك ومبادراتك البيئية.</li>
        </ul>
      </section>
  
      <!-- من يمكنه الشراكة -->
      <section class="who-can-join">
        <h2>من يمكنه الانضمام؟</h2>
        <ul>
          <li>مسجل لدى المركز الوطني لإدارة النفايات (موان)</li>
          <li>مُنتج للنفايات القابلة للتدوير من القطاعات المختلفة</li>
          <li>مالك محلات تشاليح أو سكراب</li>
          <li>مقاول هدم أو تأجير حاويات/ معدات</li>
          <li>شركة نقل وشحن أو فحص بيئي</li>
          <li>شركات الصرف الصحي أو بيع المياه</li>
          <li>بائع منتجات بيئية</li>
          <li>مالك شاحنات متوسطة ولديك الرغبة في تقنين أعمالك</li>
          <li>شخص متحمس ومبدع ويملك الخبرة</li>
        </ul>
      </section>
  
      <!-- خطوات التسجيل -->
      <section class="registration-steps">
        <h2>خطوات التسجيل</h2>
        <ol>
          <li>سجل أو سجل دخولك عبر الموقع الإلكتروني.</li>
          <li>اضغط على زر "كن شريكنا".</li>
          <li>املأ البيانات المطلوبة.</li>
          <li>ارفع الوثائق والمستندات الداعمة.</li>
          <li>اختر باقة الاشتراك المناسبة.</li>
          <li>انقر على زر التسجيل.</li>
        </ol>
      </section>
  
      <!-- ملاحظات -->
      <section class="notes">
        <h3>ملاحظات مهمة:</h3>
        <ul>
          <li>تقدم سكرابي عرض اشتراك سنوي بخصم خاص يصل إلى 50%.</li>
          <li>في حالة أي عملية بيع نهائية، سيتم خصم رسوم العمولة المتفق عليها من القيمة الإجمالية.</li>
        </ul>
      </section>
  
      <!-- زر التسجيل -->
      <section class="cta">
        <h2>سجل الآن وتمتع براحة البال!</h2>
        <router-link :to="{ name: 'marketplace' }" target="_blank" class="btn">
            زيارة الموقع
        </router-link>
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
    font-family: 'Arial', sans-serif;
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
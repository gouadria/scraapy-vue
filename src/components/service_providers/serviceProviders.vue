<template>
    <div class="service-providers-page">
      <!-- القسم الأول -->
      <section class="intro">
        <h1>الشركاء المميزون مع سكرابي</h1>
        <p>
          انضم إلى شبكتنا واحصد فرصًا استثمارية في سوق التدوير المزدهر.
          في إطار سعي سكرابي لبناء منظومة متكاملة لإدارة النفايات، نفتح الباب أمام الشركات والمؤسسات المتخصصة لتكونوا جزءًا من رحلتنا نحو تحقيق اقتصاد دائري مستدام.
        </p>
      </section>
  
      <!-- فرص الشراكة -->
      <section class="partnership-opportunities">
        <h2>مجالات الشراكة المطلوبة</h2>
        <ul>
          <li><strong>مقاولو هدم محترفون:</strong> للهدم الآمن والمُخطط.</li>
          <li><strong>تجار الخردة:</strong> شراء وبيع المواد القابلة لإعادة التدوير.</li>
          <li><strong>مُقدمو خدمات التأجير:</strong>
            <ul>
              <li>حاويات فرز النفايات بأنواعها.</li>
              <li>معدات الهدم والنقل المتخصصة.</li>
            </ul>
          </li>
          <li><strong>جهات الفحص والتدقيق:</strong> ضمان الجودة والامتثال البيئي.</li>
          <li><strong>المختبرات المعتمدة:</strong> تحليل العينات وتقييم المخلفات.</li>
          <li><strong>شركات نقل مرخصة من "موان":</strong> نقل آمن للمواد الخطرة وغير الخطرة.</li>
          <li><strong>مراكز الجمع والفرز والتخزين المُعتمدة.</strong></li>
          <li><strong>منشآت إعادة التدوير المُتوافقة مع معايير "موان".</strong></li>
          <li><strong>مرافق التخلص الآمن والمرادم المُراقَبة.</strong></li>
        </ul>
      </section>
  
      <!-- مزايا الانضمام -->
      <section class="benefits">
        <h2>مزايا الانضمام إلى شبكة سكرابي</h2>
        <ul>
          <li><strong>وصول مباشر:</strong> إلى آلاف العملاء الراغبين في خدماتك عبر منصتنا الرقمية.</li>
          <li><strong>فرص فوز بعقود مربحة:</strong> في مشاريع كبرى ضمن سوق التدوير الواعد.</li>
          <li><strong>عوائد مالية مجزية:</strong> مع شروط دفع مرنة وشفافة.</li>
          <li><strong>دعم تسويقي:</strong> لعرض خدماتك على نطاق واسع.</li>
          <li><strong>شهادة شريك معتمد:</strong> من سكرابي تعزز مصداقيتك في السوق.</li>
        </ul>
      </section>
  
      <!-- خطوات التسجيل -->
      <section class="registration-steps">
        <h2>كيفية التسجيل</h2>
        <ol>
          <li>سجل بيانات شركتك عبر <a href="https://scraapy.sa/auth/register " target="_blank">رابط التسجيل</a>.</li>
          <li>ارفع الوثائق المطلوبة (رخصة العمل، شهادات الاعتماد، إلخ).</li>
          <li>انتظر الموافقة خلال 3 أيام عمل.</li>
          <li>ابدأ بتقديم خدماتك للعملاء المستهدفين.</li>
        </ol>
      </section>
  
      <!-- رسالة ختامية -->
      <section class="closing">
        <p><strong>"مع سكرابي، لن تكون مجرد مقدم خدمة... بل شريكًا فاعلًا في تحويل النفايات إلى ثروة!"</strong></p>
        <a href="https://scraapy.sa/auth/register " target="_blank" class="btn">سجل الآن</a>
      </section>
  
      <!-- التواصل -->
      <section class="contact">
        <h3>للاستفسارات</h3>
        <p>بريد التواصل: <a href="mailto:partners@scraapy.sa">partners@scraapy.sa</a></p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ServiceProviders'
  }
  </script>
  
  <style scoped>
  .service-providers-page {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 900px;
    margin: auto;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
    margin-top: 40px;
  }
  
  .intro {
    margin-bottom: 30px;
  }
  
  ul, ol {
    padding-left: 20px;
  }
  
  .contact a {
    color: #007bff;
    text-decoration: none;
  }
  
  .contact a:hover {
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
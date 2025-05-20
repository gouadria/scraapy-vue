<template>
    <div class="policy-page">
      <!-- القسم الأول -->
      <section class="intro">
        <h1>سياسة التعامل مع المواد مجهولة المصدر</h1>
        <p>
          في سكرابي، نُقدّر ثقة عملائنا وشركائنا، ونسعى جاهدين لضمان نزاهة سوق إعادة التدوير عبر اتباع أنظمة صارمة لمكافحة تداول المواد المسروقة أو المشبوهة.
        </p>
        <p>
          الالتزام بهذه السياسة يساعدنا على بناء اقتصاد دائري آمن ومستدام، ويحمي جميع الأطراف من أي تعاملات غير قانونية.
        </p>
      </section>
  
      <!-- الإجراءات الوقائية -->
      <section class="preventive-measures">
        <h2>الإجراءات الوقائية</h2>
        <ul>
          <li><strong>الاعتماد الرسمي:</strong> يُسمح فقط للتجار والموردين المعتمدين من "موان" بمزاولة النشاط على المنصة.</li>
          <li><strong>الفواتير الضريبية:</strong> جميع عمليات البيع والشراء تتم عبر فواتير ضريبية رسمية تحدد مصدر المواد وتفاصيلها.</li>
          <li><strong>التعاملات المالية الشفافة:</strong> تُجرى جميع المدفوعات عبر قنوات بنكية موثقة لضمان تتبع كل عملية مالية.</li>
          <li><strong>مطابقة الهوية:</strong> تُطابق بيانات العملاء المسجلة مع الفواتير الصادرة لتأكيد هوية البائع/المشتري.</li>
          <li><strong>أرشفة البيانات:</strong> يُحتفظ بسجل كامل لجميع المعاملات لمدة 5 سنوات قابلة للمراجعة من الجهات المختصة.</li>
          <li><strong>منع الشحنات المشبوهة:</strong> لا يتم نقل أي مواد مجهولة المصدر أو غير موثقة عبر المنصة.</li>
        </ul>
      </section>
  
      <!-- التعامل مع الحالات المشبوهة -->
      <section class="suspicious-cases">
        <h2>إجراءات التعامل مع الحالات المشبوهة</h2>
        <ul>
          <li><strong>فحص مكثف:</strong> تلتزم شركات الفحص والتدقيق المعتمدة بإبلاغ سكرابي فور اكتشاف أي مواد غير مطابقة للمواصفات أو مشبوهة.</li>
          <li><strong>الإبلاغ الفوري:</strong> يتم إخطار الجهات الحكومية المختصة (مثل الشرطة البيئية) فورًا مع إخلاء مسؤولية المنصة.</li>
          <li><strong>تعليق الحسابات:</strong> تُعلق حسابات الأطراف المتورطة في عمليات غير مشروعة حتى انتهاء التحقيقات.</li>
        </ul>
      </section>
  
      <!-- العقوبات -->
      <section class="penalties">
        <h2>عقوبات المخالفات</h2>
        <ul>
          <li><strong>غرامات مالية:</strong> تصل إلى 50,000 ريال سعودي للمخالفات المتكررة.</li>
          <li><strong>حظر دائم:</strong> في حال ثبوت تورط أي طرف في ترويج مواد مسروقة.</li>
        </ul>
      </section>
  
      <!-- التزام الشركة -->
      <section class="community-protection">
        <h2>التزامنا بحماية المجتمع</h2>
        <ul>
          <li><strong>تعزيز الوعي:</strong> نقدم دورات توعوية حول مخاطر التعامل مع المواد مجهولة المصدر.</li>
          <li><strong>خط للإبلاغ:</strong> يمكنك الإبلاغ عن أي نشاط مشبوه عبر <a href="mailto:security@scraapy.sa">security@scraapy.sa</a>.</li>
        </ul>
      </section>
  
      <!-- رسالة ختامية -->
      <section class="closing">
        <p><strong>"في سكرابي، نحمي سوق إعادة التدوير لنبني اقتصادًا دائريًا آمنًا للجميع."</strong></p>
        <p>للاستفسارات: <a href="mailto:support@scraapy.sa">support@scraapy.sa</a></p>
        <a href="https://www.scraapy.sa/policies " target="_blank" class="btn">لمعرفة المزيد</a>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'materialsTheftPolicy'
  }
  </script>
  
  <style scoped>
  .policy-page {
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
  
  ul {
    padding-left: 20px;
  }
  
  li strong {
    color: #333;
  }
  
  .community-protection a {
    color: #007bff;
    text-decoration: none;
  }
  
  .community-protection a:hover {
    text-decoration: underline;
  }
  
  .closing {
    margin-top: 40px;
    text-align: center;
  }
  
  .btn {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
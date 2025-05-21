<template>
    <div class="terms-page">
      <!-- القسم الأول -->
      <section class="intro">
        <h1>الشروط والأحكام</h1>
        <p>
          منصة سكرابي © هي خدمة تقدمها شركة باهظ لتقنية المعلومات (س.ت: 2050180292).
          باستخدامك الموقع أو التطبيق، فإنك توافق على الالتزام بهذه الشروط والأحكام.
          يرجى قراءتها بعناية قبل استخدام خدماتنا.
        </p>
      </section>
  
      <!-- التعريفات -->
      <section class="definitions">
        <h2>التعريفات</h2>
        <ul>
          <li><strong>المنصة:</strong> موقع وتطبيق سكرابي.</li>
          <li><strong>المستخدم:</strong> الفرد أو المؤسسة التي تستخدم المنصة.</li>
          <li><strong>البائع/المورد:</strong> من يعرض أو يبيع المواد أو الخدمات.</li>
          <li><strong>المشتري:</strong> من يشتري المنتجات أو الخدمات.</li>
          <li><strong>العميل:</strong> أي طرف يستخدم المنصة لأغراض البيع أو الشراء.</li>
        </ul>
      </section>
  
      <!-- استخدام المنصة -->
      <section class="platform-use">
        <h2>استخدام المنصة</h2>
        <ul>
          <li>لا يجوز لك إعادة بيع أو توزيع الخدمات أو تعديل تصميم المنصة أو الوصول إلى كود المصدر.</li>
          <li>لا يسمح بمشاركة اسم المستخدم أو كلمة المرور مع أطراف ثالثة.</li>
          <li>غير مسموح للأطفال دون سن 18 عامًا باستخدام المنصة إلا بإشراف.</li>
          <li>الدخول إلى المنصة واستخدامها يكون فقط للأغراض القانونية.</li>
        </ul>
      </section>
  
      <!-- الرسوم والمعاملات -->
      <section class="fees">
        <h2>الرسوم والمعاملات</h2>
        <ul>
          <li>جميع الرسوم النهائية وغير قابلة للاسترداد ما لم يُحدد خلاف ذلك.</li>
          <li>تُخصم رسوم العمولة من قيمة البيع النهائي وفق الاتفاقية.</li>
          <li>الضرائب مثل ضريبة القيمة المضافة مستحقة الدفع حسب النظام السعودي.</li>
          <li>شركة باهظ تقوم بدور وكيل تحصيل الأموال بين الأطراف.</li>
        </ul>
      </section>
  
      <!-- الحقوق الفكرية -->
      <section class="ip-rights">
        <h2>الحقوق الفكرية</h2>
        <ul>
          <li>جميع المحتويات (النصوص، الصور، الفيديوهات) مملوكة لسكرابي أو الجهات الخارجية.</li>
          <li>لا يجوز نقل أو تعديل أو إعادة توزيع أي محتوى بدون إذن كتابي.</li>
        </ul>
      </section>
  
      <!-- الأمان والسلوك -->
      <section class="security">
        <h2>الأمان والسلوك</h2>
        <ul>
          <li>تلتزم المنصة بحماية بياناتك الشخصية عبر تقنيات التشفير.</li>
          <li>المسؤولية الكاملة عن استخدام الخدمة تقع على عاتق المستخدم.</li>
          <li>في حالة انتهاك الشروط، يجوز إيقاف الحساب أو رفع دعوى قانونية.</li>
        </ul>
      </section>
  
      <!-- المسؤولية والتعويض -->
      <section class="responsibility">
        <h2>المسؤولية والتعويض</h2>
        <ul>
          <li>لا تتحمل سكرابي مسؤولية أي ضرر مباشر أو غير مباشر نتيجة الاستخدام.</li>
          <li>توافق على تعويض سكرابي في حال تسببك في أي مطالبات أو خسائر.</li>
          <li>المنصة لا تضمن جودة أو ملاءمة مقدمي الخدمات.</li>
        </ul>
      </section>
  
      <!-- التعديلات -->
      <section class="updates">
        <h2>التعديلات على الشروط</h2>
        <p>تحتفظ سكرابي بحق تعديل هذه الشروط في أي وقت. سيتم إبلاغك بالتغييرات عبر الموقع.</p>
      </section>
  
      <!-- التواصل -->
      <section class="contact">
        <h2>لأي استفسارات</h2>
        <p>يمكنك التواصل عبر البريد الإلكتروني:</p>
        <p><a href="mailto:admin@scraapy.sa">admin@scraapy.sa</a></p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TermsAndConditions'
  }
  </script>
  
  <style scoped>
  .terms-page {
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
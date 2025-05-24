<template>
    <div class="policy-page">
      <!-- القسم الأول -->
      <section class="intro">
        <h1>سياسة الإرجاع والاسترداد</h1>
        <p>
          في سكرابي، نحرص على ضمان رضاك التام عن خدماتنا ومنتجاتنا. تُطبَّق الشروط التالية لضمان عدالة وشفافية العمليات.
        </p>
      </section>
  
      <!-- سياسة إرجاع النفايات -->
      <section class="waste-policy">
        <h2>سياسة إرجاع النفايات</h2>
        <ul>
          <li><strong>النفايات الخطرة وغير الخطرة:</strong></li>
          <ul>
            <li>لا يمكن إرجاع أو استبدال أي أنواع من النفايات (خطرة/غير خطرة) بعد استلام الدفع وإصدار الفاتورة.</li>
          </ul>
        </ul>
      </section>
  
      <!-- سياسة إرجاع المنتجات البيئية -->
      <section class="eco-products-policy">
        <h2>سياسة إرجاع المنتجات البيئية</h2>
        <ul>
          <li><strong>المدة المسموحة:</strong> يُمكن إرجاع المنتجات البيئية (مثل الحاويات الذكية، معدات التدوير) خلال <strong>48 ساعة فقط</strong> من استلام الفاتورة.</li>
          <li><strong>شروط الإرجاع:</strong></li>
          <ul>
            <li>تقديم الفاتورة الأصلية.</li>
            <li>إعادة المنتج بحالته الأصلية (مغلف بتغليف المصنع، غير تالف، غير مستخدم).</li>
            <li>اجتياز الفحص الفني من قبل فريق سكرابي.</li>
          </ul>
          <li><strong>الاسترداد:</strong> يُعاد المبلغ إلى محفظتك الإلكترونية في المنصة بعد خصم تكاليف النقل.</li>
        </ul>
      </section>
  
      <!-- إلغاء الخدمات المساندة -->
      <section class="support-services-cancel">
        <h2>إلغاء الخدمات المساندة</h2>
        <ul>
          <li><strong>قبل التنفيذ:</strong> يُمكن إلغاء الخدمات (مثل تأجير المعدات، النقل) قبل موعد التنفيذ بـ <strong>5 ساعات</strong> دون أي رسوم.</li>
          <li><strong>بعد التنفيذ:</strong></li>
          <ul>
            <li>إذا تعذَّر تنفيذ الخدمة رغم وصول الفريق إلى الموقع:</li>
            <ul>
              <li>يُخصم أجرة يوم واحد للمعدات أو تكلفة إعادة الحاويات.</li>
            </ul>
          </ul>
          <li><strong>في جميع الحالات:</strong> يُعاد المبلغ إلى محفظتك الإلكترونية دون إمكانية السحب النقدي.</li>
        </ul>
      </section>
  
      <!-- عملية الاسترداد -->
      <section class="refund-process">
        <h2>عملية الاسترداد</h2>
        <ul>
          <li><strong>فحص المنتج:</strong> عند استلام المنتج المرتجع، نفحصه خلال <strong>3 أيام عمل</strong> ونُبلغك بنتيجة الفحص عبر البريد الإلكتروني.</li>
          <li><strong>رد المبلغ:</strong> في حالة الموافقة، يُضاف المبلغ إلى محفظتك خلال <strong>5–7 أيام عمل</strong> (حسب سياسات البنك المُصدر للبطاقة).</li>
        </ul>
      </section>
  
      <!-- تكاليف الشحن -->
      <section class="shipping-costs">
        <h2>تكاليف الشحن</h2>
        <ul>
          <li><strong>مسؤولية العميل:</strong> يتحمل العميل تكاليف شحن المنتجات المرتجعة.</li>
          <li><strong>غير قابلة للاسترداد:</strong> لا تُعاد تكاليف الشحن في حال الموافقة على الاسترداد.</li>
        </ul>
      </section>
  
      <!-- طريقة التواصل -->
      <section class="contact-support">
        <h2>تواصل مع الدعم</h2>
        <p>لأي استفسارات حول الإرجاع أو الاسترداد:</p>
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
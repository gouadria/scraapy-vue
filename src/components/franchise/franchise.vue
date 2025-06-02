<template>
  <div class="franchise-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>الامتياز التجاري</h1>
      <p>
        في سكرابي، نوفر فرصًا استثمارية مميزة للشركات والأفراد الطموحين الراغبين في دخول سوق إعادة التدوير وإدارة النفايات الرقمية.
        نقدم نموذج امتياز تجاري (Franchise) متكامل مع دعم فني، تسويقي ولوجستي كامل.
      </p>
    </section>

    <!-- لماذا تختارنا؟ -->
    <section class="why-us">
      <h2>لماذا تختار سكرابي؟</h2>
      <ul>
        <li><strong>نموذج ناجح:</strong> تجربة مثبتة ومبنية على أحدث التقنيات لإدارة النفايات.</li>
        <li><strong>دعم شامل:</strong> تدريب فني وإداري، ودعم تسويقي ولوجستي منذ اليوم الأول.</li>
        <li><strong>استدامة عالية:</strong> نموذج عمل مستدام يتوافق مع رؤية المملكة والاقتصاد الدائري.</li>
        <li><strong>فرص توسع:</strong> إمكانية تنفيذ المشروع محليًا أو دوليًا حسب طموحاتك.</li>
        <li><strong>علامة تجارية قوية:</strong> سكرابي اسم موثوق ومعروف في سوق إدارة النفايات.</li>
      </ul>
    </section>

    <!-- مجالات الاستثمار -->
    <section class="investment-sectors">
      <h2>مجالات الاستثمار</h2>
      <ul>
        <li>إعادة التدوير وإدارة النفايات الخطرة وغير الخطرة.</li>
        <li>محطات فرز الذكية والنظامية للمخلفات المنزلية والصناعية.</li>
        <li>تقنيات البيئة والطاقة النظيفة.</li>
        <li>البنية التحتية الذكية وخدمات الاستدامة.</li>
        <li>الحلول الرقمية لإدارة النفايات (منصات رقمية، IoT، AI).</li>
      </ul>
    </section>

    <!-- أنواع الامتياز -->
    <section class="franchise-types">
      <h2>أنواع الامتياز المتاحة</h2>
      <div class="type">
        <h3>الامتياز المحلي</h3>
        <p>افتتاح محطة فرز أو مركز لإدارة النفايات في مدينتك تحت علامة سكرابي التجارية بعوائد مجزية.</p>
      </div>
      <div class="type">
        <h3>الامتياز الدولي</h3>
        <p>نشر نموذج سكرابي في بلدك مع ضمان الدعم الكامل الفني والتشغيلي لتحقيق النجاح المستدام.</p>
      </div>
    </section>

    <!-- كيف نعمل معًا؟ -->
    <section class="how-we-work">
      <h2>كيف نعمل معًا؟</h2>
      <ol>
        <li><strong>التقييم الأولي:</strong> دراسة الجدوى ومدى التوافق مع أهداف سكرابي.</li>
        <li><strong>توقيع الاتفاقية:</strong> تحديد حقوق وواجبات الطرفين بشكل واضح وشفاف.</li>
        <li><strong>التنفيذ:</strong> توفير الأدوات، التجهيزات، والتدريب اللازم لضبط الجودة.</li>
        <li><strong>المتابعة:</strong> تحليل الأداء وتقديم حلول تطويرية مستمرة.</li>
      </ol>
    </section>

    <!-- من نبحث عنه؟ -->
    <section class="who-we-are-looking-for">
      <h2>من نبحث عنه؟</h2>
      <ul>
        <li>مستثمرون طموحون في مجالات البيئة والاستدامة.</li>
        <li>رواد أعمال لديهم خبرة في الصناعات الخضراء أو الاقتصاد الدائري.</li>
        <li>شركات لديها رؤية استراتيجية تتوافق مع أهداف التنمية المستدامة.</li>
        <li>مؤسسات لديها البنية التحتية المناسبة لتطبيق نموذج سكرابي.</li>
      </ul>
    </section>

    <!-- رسالة ختامية وزر للتواصل -->
    <section class="closing">
      <p><strong>"في سكرابي، نرى في كل شريك عضوًا في عائلة ننمو معًا نحو غدٍ أنظف."</strong></p>
      <p>تواصل معنا الآن: <a href="mailto:franchise@scraapy.sa">franchise@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Franchise'
}
</script>

<style scoped>
.franchise-page {
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

ul, ol {
  padding-left: 20px;
}

.type {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.closing {
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
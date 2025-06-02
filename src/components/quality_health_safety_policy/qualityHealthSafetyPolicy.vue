<template>
  <div class="qhs-policy">
    <h1>سياسة الجودة، الصحة البيئية والسلامة</h1>
    <p>
      في سكرابي، نعتبر الجودة، الصحة والسلامة، والاستدامة البيئية ركيزة أساسية لتحقيق رؤيتنا نحو بناء مستقبل أنظف وأكثر أمانًا للجميع.
    </p>

    <!-- الجودة -->
    <section class="quality-section">
      <h2>التزامات الجودة</h2>
      <ul>
        <li><strong>التميز في الخدمة:</strong> نُطبّق أعلى معايير الجودة في جميع خدماتنا.</li>
        <li><strong>التحسين المستمر:</strong> نعتمد آليات متقدمة للتحسين المستمر وتقنيات الابتكار.</li>
        <li><strong>مؤشرات الأداء:</strong> نستخدم مؤشرات دقيقة لقياس الأداء وضمان تطور العمليات باستمرار.</li>
      </ul>
    </section>

    <!-- الصحة والسلامة -->
    <section class="safety-section">
      <h2>مبادئ الصحة والسلامة</h2>
      <ul>
        <li><strong>بيئة آمنة:</strong> نستخدم أنظمة متقدمة لتحديد وإدارة المخاطر (مثل المواد الكيميائية أو المعدات الثقيلة).</li>
        <li><strong>التدريب:</strong> نُدرّب موظفينا ومقاولينا على بروتوكولات السلامة بشكل دوري.</li>
        <li><strong>معدات الوقاية:</strong> نوفر معدات الحماية الشخصية المعتمدة (PPE) لجميع العاملين.</li>
        <li><strong>الصحة المهنية:</strong> نُجري فحوصات صحية دورية ونُنظم برامج توعوية حول الصحة البدنية والعقلية.</li>
      </ul>
    </section>

    <!-- المسؤولية البيئية -->
    <section class="environment-section">
      <h2>المسؤولية البيئية</h2>
      <ul>
        <li><strong>تخفيض الأثر البيئي:</strong> نطبق حلولاً مبتكرة لتقليل النفايات وتحسين استهلاك الموارد ومنع التلوث.</li>
        <li><strong>الامتثال التشريعي:</strong> نلتزم بكافة القوانين المحلية والدولية الخاصة بالبيئة.</li>
        <li><strong>شهادة ISO 14001:</strong> نسعى دائمًا للحصول على الشهادات العالمية التي تؤكد قيادتنا البيئية.</li>
        <li><strong>اقتصاد دائري:</strong> ندمج مفاهيم الاقتصاد الدائري في عملياتنا مثل إعادة تدوير النفايات وتحويلها إلى موارد.</li>
      </ul>
    </section>

    <!-- الشهادات والامتثال -->
    <section class="certifications">
      <h2>الشهادات والامتثال</h2>
      <ul>
        <li><strong>ISO 9001:</strong> لأنظمة إدارة الجودة.</li>
        <li><strong>ISO 45001:</strong> لأنظمة الصحة والسلامة المهنية.</li>
        <li><strong>ISO 14001:</strong> لأنظمة الإدارة البيئية.</li>
        <li><strong>شراكات استراتيجية:</strong> نتعاون مع جهات رقابية مثل الهيئة العامة للبيئة لضمان الامتثال الكامل.</li>
      </ul>
    </section>

    <!-- المشاركة والتطوير -->
    <section class="empowerment">
      <h2>تمكين الموظفين</h2>
      <ul>
        <li><strong>برامج تدريبية:</strong> نقدم دورات متخصصة مثل السلامة الصناعية والابتكار البيئي.</li>
        <li><strong>المشاركة الفعالة:</strong> نشجع الموظفين على تقديم أفكار مبتكرة عبر منصات داخلية.</li>
        <li><strong>مكافآت للمبادرات:</strong> نُكافئ المبادرات المتميزة التي تعزز الاستدامة والسلامة.</li>
      </ul>
    </section>

    <!-- رسالة ختامية وزر للتواصل -->
    <section class="closing">
      <p>"في سكرابي، نعتبر الجودة والسلامة والاستدامة ركائزَ لبناء مستقبلٍ أنظفَ وأكثرَ أمانًا للجميع."</p>
      <p>للاستفسارات: <a href="mailto:quality@scraapy.sa">quality@scraapy.sa</a></p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'QualityHealthSafetyPolicy'
}
</script>

<style scoped>
.qhs-policy {
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

ul {
  padding-left: 20px;
}

.closing {
  text-align: center;
  margin-top: 40px;
}

.closing a {
  color: #007bff;
  text-decoration: none;
}

.closing a:hover {
  text-decoration: underline;
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
<template>
  <div class="career-page">
    <!-- القسم الأول -->
    <section class="intro">
      <h1>{{ $t('career.title') }}</h1>
      <p>{{ $t('career.intro') }}</p>
      <p>{{ $t('career.intro2') }}</p>
      <p>{{ $t('career.intro3') }}</p>
    </section>

    <!-- الوظائف المتاحة -->
    <section class="available-jobs">
      <h2>{{ $t('career.availableJobsTitle') }}</h2>

      <div v-if="jobs.length > 0" class="jobs-list">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <h3>{{ job.title }}</h3>
          <p><strong>الموقع:</strong> {{ job.location }}</p>
          <p><strong>الوصف:</strong> {{ job.description }}</p>
          <button @click="applyForJob(job)">{{ $t('career.applyNowButtonText') }}</button>
        </div>
      </div>

      <p v-else>{{ $t('career.noJobsAvailable') }}</p>

    </section>

    <!-- نموذج التقديم -->
    <section class="application-form" v-if="selectedJob">
      <h2>{{ $t('career.formSectionTitle') }} {{ selectedJob.title }}</h2>

      <form @submit.prevent="submitApplication">
        <div class="form-group">
          <label for="name">{{ $t('career.nameLabel') }}</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="form-group">
          <label for="email">{{ $t('career.emailLabel') }}</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>

        <div class="form-group">
          <label for="phone">{{ $t('career.phoneLabel') }}</label>
          <input type="tel" id="phone" v-model="formData.phone" />
        </div>

        <div class="form-group">
          <label for="cv">{{ $t('career.cvLabel') }}</label>
          <input type="file" id="cv" @change="handleFileUpload" accept=".pdf,.doc,.docx" />
        </div>

        <div class="form-group">
          <label for="message">{{ $t('career.messageLabel') }}</label>
          <textarea id="message" v-model="formData.message"></textarea>
        </div>

        <button type="submit" class="submit-btn">{{ $t('career.submitButtonText') }}</button>
      </form>

      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'career',
    data() {
      return {
        // قائمة الوظائف (يمكن استبدالها من API لاحقًا)
        jobs: [
          // {
          //   id: 1,
          //   title: 'مهندس بيئي',
          //   location: 'الرياض',
          //   description: 'تحليل النفايات وإدارة المشاريع البيئية.'
          // },
          // {
          //   id: 2,
          //   title: 'مطور ويب',
          //   location: 'جدة',
          //   description: 'تطوير وصيانة المنصات الرقمية الخاصة بإدارة النفايات.'
          // },
          // {
          //   id: 3,
          //   title: 'مندوب مبيعات',
          //   location: 'الدمام',
          //   description: 'بناء علاقات مع العملاء وتسويق الخدمات.'
          // }
        ],
        selectedJob: null,
        formData: {
          name: '',
          email: '',
          phone: '',
          message: '',
          cv: null
        },
        successMessage: ''
      }
    },
    methods: {
      applyForJob(job) {
        this.selectedJob = job;
      },
      handleFileUpload(event) {
        this.formData.cv = event.target.files[0];
      },
      submitApplication() {
        // يمكنك هنا ربط هذا النموذج بـ API باستخدام axios أو fetch
        console.log('بيانات الطلب:', this.formData);
        this.successMessage = this.$t('career.successMessage');
        // إعادة تعيين البيانات بعد الإرسال
        this.formData = {
          name: '',
          email: '',
          phone: '',
          message: '',
          cv: null
        };
      }
    }
  }
</script>
  
<style scoped>
  .career-page {
    font-family: Inter, Zain;
    line-height: 1.6;
    padding: 20px;
    max-width: 900px;
    margin: auto;
  }
  
  h1, h2, h3 {
    color: #2c3e50;
  }
  
  .intro, .available-jobs, .application-form {
    margin-bottom: 40px;
  }
  
  .jobs-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .job-card {
    border: 1px solid #ddd;
    padding: 20px;
    flex: 1 1 300px;
    border-radius: 8px;
  }
  
  .job-card h3 {
    margin-top: 0;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #218838;
  }
  
  .success {
    color: green;
    font-weight: bold;
  }
</style>
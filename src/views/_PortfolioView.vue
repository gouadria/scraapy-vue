<script lang="ts">
import navBar from '@/components/UIElements/navBar.vue'
import footerComponant from '@/components/UIElements/footerComponant.vue'

export default {
  components: {
    navBar,
    footerComponant,
  },
  mounted() {
    this.$router.push({
      name: 'home',
    })
  },
}

const services = {
  products: [
    {
      icon: '🛍️',
      title: "سكراب الحديد",
      description: "تداول وبيع وشراء سكراب الحديد بمختلف أنواعه",
      image: "https://images.pexels.com/photos/2881762/pexels-photo-2881762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    },
    {
      icon: '📦',
      title: "سكراب الألمنيوم",
      description: "تداول الألمنيوم المعاد تدويره بأسعار تنافسية",
      image: "https://images.pexels.com/photos/5793929/pexels-photo-5793929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    }
  ],
  services: [
    {
      icon: '🔄',
      title: "إعادة تدوير المعادن",
      description: "خدمة متكاملة لإعادة تدوير المعادن بطرق صديقة للبيئة",
      image: "https://images.pexels.com/photos/5558536/pexels-photo-5558536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    },
    {
      icon: '🚚',
      title: "خدمة النقل والتوصيل",
      description: "نقل السكراب من وإلى أي مكان بسرعة وأمان",
      image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    }
  ]
};

function setTab(tab) {
  const container = document.getElementById("service-cards");
  container.innerHTML = "";

  services[tab].forEach(service => {
    container.innerHTML += `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img src="${service.image}" alt="${service.title}" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="text-teal-600 mb-4 text-2xl">${service.icon}</div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${service.title}</h3>
                <p class="text-gray-600">${service.description}</p>
              </div>
            </div>
          `;
  });
}

// تحميل الافتراضي عند بدء الصفحة
window.onload = () => setTab('products');
</script>
<template>
  <navBar />
  <main>
    <!-- hero -->
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-full w-full opacity-5 z-0">
        <div className="absolute h-64 w-64 rounded-full border-8 border-teal-300 -top-20 -right-20"></div>
        <div className="absolute h-96 w-96 rounded-full border-8 border-orange-300 -bottom-40 -left-40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          <div className="md:w-1/2 text-center order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
              <span className="text-teal-600">سكرابي</span>
              <br /> عالم التدوير
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mb-8">
              منصة متكاملة لعالم التدوير (بيع - شراء - خدمات مساندة) بكل سهولة وأمان
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-center">
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors flex items-center gap-2">
                تعرف علينا
              </button>
              <button
                className="bg-white hover:bg-gray-50 text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-full font-medium text-lg transition-colors">
                خدماتنا
              </button>
            </div>
          </div>

          <div className="md:w-1/2 order-1 md:order-2">
            <img
              src="@/assets/home-register.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="خدمات السكراب" className="w-full h-auto rounded-xl shadow-xl" />
          </div>
        </div>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4 text-right">
            <div class="p-3 bg-teal-50 rounded-full text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-truck ">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                <path d="M15 18H9"></path>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                <circle cx="17" cy="18" r="2"></circle>
                <circle cx="7" cy="18" r="2"></circle>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-xl mb-1 text-gray-800">خدمة توصيل سريعة</h3>
              <p class="text-gray-600">نقل وتوصيل المنتجات بكفاءة عالية</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4 text-right">
            <div class="p-3 bg-teal-50 rounded-full text-teal-600"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users ">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg></div>
            <div>
              <h3 class="font-semibold text-xl mb-1 text-gray-800">ثقة وأمان</h3>
              <p class="text-gray-600">نضمن سلامة المعاملات</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4 text-right">
            <div class="p-3 bg-teal-50 rounded-full text-teal-600"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap ">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg></div>
            <div>
              <h3 class="font-semibold text-xl mb-1 text-gray-800">خدمة متكاملة</h3>
              <p class="text-gray-600">منتجات وخدمات وتأجير معدات في مكان واحد</p>
            </div>
          </div>
        </div>

      </div>
    </section>
    <!-- services -->
    <section id="خدماتنا" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 md:px-8">
        <!-- عنوان القسم -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">خدماتنا المتميزة</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة متكاملة من المنتجات والخدمات وخيارات تأجير المعدات لتلبية جميع احتياجاتك في مجال إدارة النفايات
            الخطرة والغير خطرة
          </p>
        </div>

        <!-- علامات التبويب -->
        <div class="flex justify-center gap-4 mb-10">
          <button onclick="setTab('products')"
            class="px-6 py-3 rounded-full font-medium transition-colors bg-teal-600 text-white">المنتجات</button>
          <button onclick="setTab('services')"
            class="px-6 py-3 rounded-full font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100">الخدمات</button>
          <button onclick="setTab('equipment')"
            class="px-6 py-3 rounded-full font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100">تأجير
            المعدات</button>
        </div>

        <!-- بطاقات الخدمات -->
        <div id="service-cards" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- سيتم تحديث هذه البطاقات ديناميكيًا -->
        </div>
      </div>
    </section>

    <!-- how it work -->
    <section id="كيف نعمل" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">كيف تعمل منصة سكرابي؟</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            خطوات بسيطة وسهلة للتعامل مع منصتنا في مجال إدارة النفايات الخطرة والغير خطرة
          </p>
        </div>

        <div class="hidden md:flex justify-between relative mb-6">
          <div class="absolute top-1/4 left-0 w-full h-1 bg-gray-200 -z-10"></div>
          <div class="flex flex-col items-center w-[calc(100%/5)]">
            <div class="bg-blue-50 text-blue-600 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus ">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" x2="19" y1="8" y2="14"></line>
                <line x1="22" x2="16" y1="11" y2="11"></line>
              </svg></div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">إنشاء حساب</h3>
            <p class="text-gray-600 text-center text-sm">قم بالتسجيل كفرد أو عمل تجاري بخطوات بسيطة</p>
          </div>
          <div class="flex flex-col items-center w-[calc(100%/5)]">
            <div class="bg-purple-50 text-purple-600 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search ">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg></div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">تصفح الخدمات</h3>
            <p class="text-gray-600 text-center text-sm">ابحث عن المنتجات والخدمات التي تناسب احتياجاتك</p>
          </div>
          <div class="flex flex-col items-center w-[calc(100%/5)]">
            <div class="bg-orange-50 text-orange-600 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-handshake ">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                <path
                  d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4">
                </path>
                <path d="m21 3 1 11h-2"></path>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                <path d="M3 4h8"></path>
              </svg></div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">طلب شراء</h3>
            <p class="text-gray-600 text-center text-sm">خدمة - منتج - تاجير</p>
          </div>
          <div class="flex flex-col items-center w-[calc(100%/5)]">
            <div class="bg-green-50 text-green-600 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck ">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                <path d="M15 18H9"></path>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                <circle cx="17" cy="18" r="2"></circle>
                <circle cx="7" cy="18" r="2"></circle>
              </svg></div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">إتمام العملية</h3>
            <p class="text-gray-600 text-center text-sm">أتمم عملية البيع أو الشراء بكل سهولة ويسر</p>
          </div>
          <div class="flex flex-col items-center w-[calc(100%/5)]">
            <div class="bg-teal-50 text-teal-600 p-4 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle ">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg></div>
            <h3 class="font-bold text-xl mb-2 text-gray-800">استلام الخدمة</h3>
            <p class="text-gray-600 text-center text-sm">استلم منتجاتك أو خدماتك واستمتع بتجربة متميزة</p>
          </div>
        </div>

        <div class="md:hidden space-y-6">
          <div class="flex items-start gap-4">
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full shrink-0 mt-1"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus ">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" x2="19" y1="8" y2="14"></line>
                <line x1="22" x2="16" y1="11" y2="11"></line>
              </svg></div>
            <div>
              <h3 class="font-bold text-xl mb-1 text-gray-800">إنشاء حساب</h3>
              <p class="text-gray-600">قم بالتسجيل كبائع أو مشتري بخطوات بسيطة</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-purple-50 text-purple-600 p-3 rounded-full shrink-0 mt-1"><svg
                xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-search ">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg></div>
            <div>
              <h3 class="font-bold text-xl mb-1 text-gray-800">تصفح الخدمات</h3>
              <p class="text-gray-600">ابحث عن المنتجات والخدمات التي تناسب احتياجاتك</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-orange-50 text-orange-600 p-3 rounded-full shrink-0 mt-1"><svg
                xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-handshake ">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                <path
                  d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4">
                </path>
                <path d="m21 3 1 11h-2"></path>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                <path d="M3 4h8"></path>
              </svg></div>
            <div>
              <h3 class="font-bold text-xl mb-1 text-gray-800">تواصل وتفاوض</h3>
              <p class="text-gray-600">تواصل مباشرة مع البائعين أو المشترين وتفاوض على الأسعار</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-green-50 text-green-600 p-3 rounded-full shrink-0 mt-1"><svg
                xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-truck ">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                <path d="M15 18H9"></path>
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                <circle cx="17" cy="18" r="2"></circle>
                <circle cx="7" cy="18" r="2"></circle>
              </svg></div>
            <div>
              <h3 class="font-bold text-xl mb-1 text-gray-800">إتمام العملية</h3>
              <p class="text-gray-600">أتمم عملية البيع أو الشراء بكل سهولة ويسر</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-teal-50 text-teal-600 p-3 rounded-full shrink-0 mt-1"><svg xmlns="http://www.w3.org/2000/svg"
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle ">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg></div>
            <div>
              <h3 class="font-bold text-xl mb-1 text-gray-800">استلام الخدمة</h3>
              <p class="text-gray-600">استلم منتجاتك أو خدماتك واستمتع بتجربة متميزة</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg mb-6">
            انضم إلى آلاف المستخدمين المستفيدين من خدماتنا واستمتع بتجربة متميزة
          </p>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors">
            سجل الآن واستفد من خدماتنا
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section className="py-16 bg-teal-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            نفخر بثقة عملائنا وتقييماتهم الإيجابية لخدماتنا وتجربتهم مع منصة سكرابي
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">

            </div>

          </div>


          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full">

          </div>

        </div>
      </div>
    </section>

    <!-- Contact -->

    <section id="تواصل معنا" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            نحن هنا لمساعدتك والإجابة على جميع استفساراتك. يمكنك التواصل معنا من خلال أي من الطرق التالية
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          <div className="md:w-7/12 bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">ارسل لنا رسالة</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">الاسم</label>
                  <input type="text" id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                    placeholder="أدخل اسمك" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">الرقم</label>
                  <input type="tel" id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                    placeholder="أدخل رقمك" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">الموضوع</label>
                <input type="text" id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                  placeholder="موضوع الرسالة" />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">الرسالة</label>
                <textarea id="message" rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                  placeholder="اكتب رسالتك هنا..."></textarea>
              </div>

              <div>
                <button type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </div>

          <div className="md:w-5/12">
            <div className="bg-teal-600 text-white p-8 rounded-xl shadow-md mb-8">
              <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-map-pin ">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">العنوان</h4>
                    <p>الصناعية، الدمام، المملكة العربية السعودية</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-phone ">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">الهاتف</h4>
                    <p>+966547909060</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-mail ">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">البريد الإلكتروني</h4>
                    <p>info@scraapy.sa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-clock ">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">ساعات العمل</h4>
                    <p>من الأحد إلى الخميس: 8 صباحاً - 6 مساءً</p>
                    <p>الجمعة والسبت: مغلق</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-8 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">هل أنت مستعد للبدء؟</h3>
              <p className="text-gray-600 mb-6">سجل الآن واستفد من خدماتنا المتميزة في عالم السكراب</p>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
                انضم إلينا الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
  <footerComponant />
</template>
<style>
*,
::before,
::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}

/*
! tailwindcss v3.4.13 | MIT License | https://tailwindcss.com
*/
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
5. Use the user's configured `sans` font-feature-settings by default.
6. Use the user's configured `sans` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
  tab-size: 4;
  /* 3 */
  font-family: Inter, Zain;
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
  -webkit-tap-highlight-color: transparent;
  /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font-family by default.
2. Use the user's configured `mono` font-feature-settings by default.
3. Use the user's configured `mono` font-variation-settings by default.
4. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: Inter, Zain;
  /* 1 */
  font-feature-settings: normal;
  /* 2 */
  font-variation-settings: normal;
  /* 3 */
  font-size: 1em;
  /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: Inter, Zain;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  letter-spacing: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder,
textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

.container {
  width: 100%;
}

@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.inset-0 {
  inset: 0px;
}

.-bottom-40 {
  bottom: -10rem;
}

.-left-40 {
  left: -10rem;
}

.-right-20 {
  right: -5rem;
}

.-top-20 {
  top: -5rem;
}

.left-0 {
  left: 0px;
}

.right-0 {
  right: 0px;
}

.top-0 {
  top: 0px;
}

.top-1\/2 {
  top: 50%;
}

.top-1\/4 {
  top: 25%;
}

.-z-10 {
  z-index: -10;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-50 {
  z-index: 50;
}

.order-1 {
  order: 1;
}

.order-2 {
  order: 2;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mb-16 {
  margin-bottom: 4rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-16 {
  margin-top: 4rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.h-1 {
  height: 0.25rem;
}

.h-20 {
  height: 5rem;
}

.h-3 {
  height: 0.75rem;
}

.h-48 {
  height: 12rem;
}

.h-5 {
  height: 1.25rem;
}

.h-64 {
  height: 16rem;
}

.h-8 {
  height: 2rem;
}

.h-96 {
  height: 24rem;
}

.h-auto {
  height: auto;
}

.h-full {
  height: 100%;
}

.w-20 {
  width: 5rem;
}

.w-3 {
  width: 0.75rem;
}

.w-5 {
  width: 1.25rem;
}

.w-64 {
  width: 16rem;
}

.w-8 {
  width: 2rem;
}

.w-96 {
  width: 24rem;
}

.w-\[calc\(100\%\/5\)\] {
  width: calc(100% / 5);
}

.w-full {
  width: 100%;
}

.max-w-3xl {
  max-width: 48rem;
}

.max-w-4xl {
  max-width: 56rem;
}

.shrink-0 {
  flex-shrink: 0;
}

.-translate-x-1\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-translate-y-1\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.translate-x-1\/2 {
  --tw-translate-x: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-8 {
  gap: 2rem;
}

.space-y-3> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}

.space-y-6> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}

.overflow-hidden {
  overflow: hidden;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.border {
  border-width: 1px;
}

.border-2 {
  border-width: 2px;
}

.border-8 {
  border-width: 8px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-t {
  border-top-width: 1px;
}

.border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity));
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}

.border-gray-700 {
  --tw-border-opacity: 1;
  border-color: rgb(55 65 81 / var(--tw-border-opacity));
}

.border-gray-800 {
  --tw-border-opacity: 1;
  border-color: rgb(31 41 55 / var(--tw-border-opacity));
}

.border-orange-300 {
  --tw-border-opacity: 1;
  border-color: rgb(253 186 116 / var(--tw-border-opacity));
}

.border-teal-300 {
  --tw-border-opacity: 1;
  border-color: rgb(94 234 212 / var(--tw-border-opacity));
}

.border-teal-600 {
  --tw-border-opacity: 1;
  border-color: rgb(13 148 136 / var(--tw-border-opacity));
}

.bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity));
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}

.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}

.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
}

.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}

.bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity));
}

.bg-orange-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 247 237 / var(--tw-bg-opacity));
}

.bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity));
}

.bg-teal-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 250 / var(--tw-bg-opacity));
}

.bg-teal-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(20 184 166 / var(--tw-bg-opacity));
}

.bg-teal-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(13 148 136 / var(--tw-bg-opacity));
}

.bg-transparent {
  background-color: transparent;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}

.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}

.from-black\/60 {
  --tw-gradient-from: rgb(0 0 0 / 0.6) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.from-gray-50 {
  --tw-gradient-from: #f9fafb var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(249 250 251 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-transparent {
  --tw-gradient-to: transparent var(--tw-gradient-to-position);
}

.to-white {
  --tw-gradient-to: #fff var(--tw-gradient-to-position);
}

.fill-yellow-400 {
  fill: #facc15;
}

.object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.pb-16 {
  padding-bottom: 4rem;
}

.pb-8 {
  padding-bottom: 2rem;
}

.pt-16 {
  padding-top: 4rem;
}

.pt-28 {
  padding-top: 7rem;
}

.pt-8 {
  padding-top: 2rem;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.font-sans {
  font-family: Inter, Zain;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.italic {
  font-style: italic;
}

.leading-tight {
  line-height: 1.25;
}

.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity));
}

.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}

.text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity));
}

.text-orange-600 {
  --tw-text-opacity: 1;
  color: rgb(234 88 12 / var(--tw-text-opacity));
}

.text-purple-600 {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity));
}

.text-teal-400 {
  --tw-text-opacity: 1;
  color: rgb(45 212 191 / var(--tw-text-opacity));
}

.text-teal-600 {
  --tw-text-opacity: 1;
  color: rgb(13 148 136 / var(--tw-text-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity));
}

.opacity-5 {
  opacity: 0.05;
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.last\:border-0:last-child {
  border-width: 0px;
}

.hover\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.hover\:bg-gray-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}

.hover\:bg-teal-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(15 118 110 / var(--tw-bg-opacity));
}

.hover\:text-teal-400:hover {
  --tw-text-opacity: 1;
  color: rgb(45 212 191 / var(--tw-text-opacity));
}

.hover\:text-teal-600:hover {
  --tw-text-opacity: 1;
  color: rgb(13 148 136 / var(--tw-text-opacity));
}

.hover\:text-teal-700:hover {
  --tw-text-opacity: 1;
  color: rgb(15 118 110 / var(--tw-text-opacity));
}

.hover\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.focus\:border-teal-400:focus {
  --tw-border-opacity: 1;
  border-color: rgb(45 212 191 / var(--tw-border-opacity));
}

.focus\:border-teal-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(20 184 166 / var(--tw-border-opacity));
}

.focus\:ring:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-teal-200:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(153 246 228 / var(--tw-ring-opacity));
}

.focus\:ring-teal-300:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(94 234 212 / var(--tw-ring-opacity));
}

.focus\:ring-opacity-50:focus {
  --tw-ring-opacity: 0.5;
}

.group:hover .group-hover\:scale-110 {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@media (min-width: 768px) {

  .md\:order-1 {
    order: 1;
  }

  .md\:order-2 {
    order: 2;
  }

  .md\:block {
    display: block;
  }

  .md\:flex {
    display: flex;
  }

  .md\:hidden {
    display: none;
  }

  .md\:w-1\/2 {
    width: 50%;
  }

  .md\:w-5\/12 {
    width: 41.666667%;
  }

  .md\:w-7\/12 {
    width: 58.333333%;
  }

  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\:flex-row {
    flex-direction: row;
  }

  .md\:justify-start {
    justify-content: flex-start;
  }

  .md\:gap-12 {
    gap: 3rem;
  }

  .md\:p-10 {
    padding: 2.5rem;
  }

  .md\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .md\:pb-24 {
    padding-bottom: 6rem;
  }

  .md\:pt-32 {
    padding-top: 8rem;
  }

  .md\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .md\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .md\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

@media (min-width: 1024px) {

  .lg\:text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }
}

.rtl\:rotate-180:where([dir="rtl"], [dir="rtl"] *) {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.rtl\:transform:where([dir="rtl"], [dir="rtl"] *) {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
</style>

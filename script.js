const form = document.getElementById("contactForm");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const languageMenuBtn = document.getElementById("languageMenuBtn");
const languageMenu = document.getElementById("languageMenu");
const languageItems = document.querySelectorAll(".lang-menu-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const translations = {
  az: {
    nav_about: "Haqqımda",
    nav_services: "Xidmətlər",
    nav_results: "Nəticələr",
    nav_contact: "Əlaqə",

    hero_tag: "Trading Mentorluğu",
    hero_title: "Sistemli trading öyrən, təsadüfi qərarları geridə qoy",
    hero_subtitle:
      "Strategiya, risk idarəsi, psixologiya və icra intizamı üzrə daha sağlam və davamlı yanaşma qurmaq üçün fərdi mentorluq.",
    hero_btn_primary: "Mentorluğa müraciət et",
    hero_btn_secondary: "Xidmətlərə bax",

    hero_card_title: "Nə əldə edəcəksən?",
    hero_li_1: "Strukturlaşdırılmış inkişaf planı",
    hero_li_2: "Risk idarəsi sistemi",
    hero_li_3: "Trade analiz düşüncəsi",
    hero_li_4: "Emosional səhvlərin azalması",
    hero_li_5: "Fərdi mentor dəstəyi",

    about_title: "Haqqımda",
    about_text:
      "Mən trading sahəsində sistemli və peşəkar yanaşmanı önə çəkən mentoram. Məqsədim insanlara hazır siqnal asılılığı yaratmaq yox, bazarı daha düzgün oxumaq, daha intizamlı qərar vermək və davamlı inkişaf etmək bacarığı qazandırmaqdır.",

    services_title: "Xidmətlər",
    service_1_title: "1:1 Mentorluq",
    service_1_text:
      "Şəxsi səviyyənə uyğun qurulmuş plan, canlı izah və nəzarətli inkişaf prosesi.",
    service_2_title: "Strategiya Analizi",
    service_2_text:
      "Mövcud yanaşmanın güclü və zəif tərəflərinin yoxlanılması və təkmilləşdirilməsi.",
    service_3_title: "Risk İdarəsi",
    service_3_text:
      "Kapitalın qorunması və uzunmüddətli davamlılıq üçün qayda əsaslı sistem qurulması.",

    results_title: "Nəticələr",
    results_text:
      "Tradingdə əsas məqsəd təsadüfi qazanc yox, sistemli qərarvermə və təkrarlana bilən nəticə modelidir.",
    result_1: "Plansız trade yanaşması minimuma endirilir",
    result_2: "Risk əvvəlcədən müəyyən edilir və qorunur",
    result_3: "İcra sonrası analiz və inkişaf prosesi qurulur",
    certificates_title: "Sertifikatlar",

    contact_title: "Əlaqə",
    contact_text:
      "Mentorluq üçün formu doldur və ya birbaşa əlaqə kanalına yönləndir.",
    name_placeholder: "Adın",
    email_placeholder: "Email ünvanın",
    message_placeholder: "Tradingdə hazırkı vəziyyətin nədir?",
    send_btn: "Göndər",

    footer_text: "© 2026 ApexExecution. Bütün hüquqlar qorunur.",
    form_success: "Müraciətin qeydə alındı. Tezliklə səninlə əlaqə saxlanılacaq."
  },

  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_results: "Results",
    nav_contact: "Contact",

    hero_tag: "Trading Mentorship",
    hero_title: "Learn systematic trading and leave random decisions behind",
    hero_subtitle:
      "One-on-one mentorship to help you build a healthier and more sustainable approach to strategy, risk management, psychology, and execution discipline.",
    hero_btn_primary: "Apply for mentorship",
    hero_btn_secondary: "View services",

    hero_card_title: "What will you gain?",
    hero_li_1: "Structured development plan",
    hero_li_2: "Risk management system",
    hero_li_3: "Trade analysis mindset",
    hero_li_4: "Reduction of emotional mistakes",
    hero_li_5: "Personal mentor support",

    about_title: "About",
    about_text:
      "I am a mentor who emphasizes a systematic and professional approach in trading. My goal is not to make people dependent on ready-made signals, but to help them read the market better, make more disciplined decisions, and build sustainable growth.",

    services_title: "Services",
    service_1_title: "1:1 Mentorship",
    service_1_text:
      "A personalized plan, live guidance, and a controlled development process.",
    service_2_title: "Strategy Analysis",
    service_2_text:
      "Reviewing and improving the strengths and weaknesses of your current approach.",
    service_3_title: "Risk Management",
    service_3_text:
      "Building a rules-based system for capital protection and long-term sustainability.",

    results_title: "Results",
    results_text:
      "The main goal in trading is not random profit, but systematic decision-making and a repeatable performance model.",
    result_1: "Unplanned trading behavior is minimized",
    result_2: "Risk is defined and protected in advance",
    result_3: "Post-execution analysis and growth process are established",
    certificates_title: "Certificates",

    contact_title: "Contact",
    contact_text:
      "Fill out the form for mentorship or reach out directly.",
    name_placeholder: "Your name",
    email_placeholder: "Your email address",
    message_placeholder: "What is your current situation in trading?",
    send_btn: "Send",

    footer_text: "© 2026 ApexExecution. All rights reserved.",
    form_success: "Your request has been received. You will be contacted soon."
  },

  ru: {
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_results: "Результаты",
    nav_contact: "Контакты",

    hero_tag: "Трейдинг-наставничество",
    hero_title: "Изучи системный трейдинг и оставь случайные решения позади",
    hero_subtitle:
      "Индивидуальное наставничество, чтобы выстроить более здоровый и устойчивый подход к стратегии, управлению рисками, психологии и дисциплине исполнения.",
    hero_btn_primary: "Подать заявку",
    hero_btn_secondary: "Посмотреть услуги",

    hero_card_title: "Что ты получишь?",
    hero_li_1: "Структурированный план развития",
    hero_li_2: "Система управления рисками",
    hero_li_3: "Мышление анализа сделок",
    hero_li_4: "Снижение эмоциональных ошибок",
    hero_li_5: "Личная поддержка ментора",

    about_title: "Обо мне",
    about_text:
      "Я наставник, который делает акцент на системном и профессиональном подходе в трейдинге. Моя цель — не создавать зависимость от готовых сигналов, а помочь лучше читать рынок, принимать более дисциплинированные решения и выстраивать устойчивый рост.",

    services_title: "Услуги",
    service_1_title: "1:1 Наставничество",
    service_1_text:
      "Персональный план, живые объяснения и контролируемый процесс развития.",
    service_2_title: "Анализ стратегии",
    service_2_text:
      "Проверка сильных и слабых сторон текущего подхода и его улучшение.",
    service_3_title: "Управление рисками",
    service_3_text:
      "Построение системы на основе правил для защиты капитала и долгосрочной устойчивости.",

    results_title: "Результаты",
    results_text:
      "Главная цель в трейдинге — не случайная прибыль, а системное принятие решений и повторяемая модель результата.",
    result_1: "Бесплановый подход к сделкам сводится к минимуму",
    result_2: "Риск определяется заранее и контролируется",
    result_3: "Выстраивается анализ после исполнения и процесс развития",
    certificates_title: "Сертификаты",

    contact_title: "Контакты",
    contact_text:
      "Заполни форму для наставничества или свяжись напрямую.",
    name_placeholder: "Твоё имя",
    email_placeholder: "Твой email",
    message_placeholder: "Какова твоя текущая ситуация в трейдинге?",
    send_btn: "Отправить",

    footer_text: "© 2026 ApexExecution. Все права защищены.",
    form_success: "Твоя заявка получена. С тобой свяжутся в ближайшее время."
  },

  tr: {
    nav_about: "Hakkımda",
    nav_services: "Hizmetler",
    nav_results: "Sonuçlar",
    nav_contact: "İletişim",

    hero_tag: "Trading Mentorluğu",
    hero_title: "Sistemli trading öğren, rastgele kararları geride bırak",
    hero_subtitle:
      "Strateji, risk yönetimi, psikoloji ve işlem disiplini alanlarında daha sağlıklı ve sürdürülebilir bir yaklaşım kurman için birebir mentorluk.",
    hero_btn_primary: "Mentorluğa başvur",
    hero_btn_secondary: "Hizmetlere bak",

    hero_card_title: "Ne elde edeceksin?",
    hero_li_1: "Yapılandırılmış gelişim planı",
    hero_li_2: "Risk yönetimi sistemi",
    hero_li_3: "Trade analiz bakış açısı",
    hero_li_4: "Duygusal hataların azalması",
    hero_li_5: "Bireysel mentor desteği",

    about_title: "Hakkımda",
    about_text:
      "Ben trading alanında sistemli ve profesyonel yaklaşımı öne çıkaran bir mentorum. Amacım insanlara hazır sinyal bağımlılığı oluşturmak değil; piyasayı daha doğru okumayı, daha disiplinli karar vermeyi ve sürdürülebilir gelişim göstermeyi öğretmektir.",

    services_title: "Hizmetler",
    service_1_title: "1:1 Mentorluk",
    service_1_text:
      "Kişisel seviyene uygun plan, canlı anlatım ve kontrollü gelişim süreci.",
    service_2_title: "Strateji Analizi",
    service_2_text:
      "Mevcut yaklaşımın güçlü ve zayıf yönlerinin incelenmesi ve geliştirilmesi.",
    service_3_title: "Risk Yönetimi",
    service_3_text:
      "Sermayenin korunması ve uzun vadeli sürdürülebilirlik için kurallı sistem kurulması.",

    results_title: "Sonuçlar",
    results_text:
      "Tradingde ana amaç rastgele kazanç değil, sistemli karar alma ve tekrarlanabilir sonuç modelidir.",
    result_1: "Plansız trade yaklaşımı minimuma indirilir",
    result_2: "Risk önceden belirlenir ve korunur",
    result_3: "İşlem sonrası analiz ve gelişim süreci kurulur",
    certificates_title: "Sertifikalar",

    contact_title: "İletişim",
    contact_text:
      "Mentorluk için formu doldur ya da doğrudan iletişime geç.",
    name_placeholder: "Adın",
    email_placeholder: "Email adresin",
    message_placeholder: "Tradingde mevcut durumun nedir?",
    send_btn: "Gönder",

    footer_text: "© 2026 ApexExecution. Tüm hakları saklıdır.",
    form_success: "Başvurun alındı. Yakında seninle iletişime geçilecektir."
  }
};

function applyTranslations(lang) {
  const currentLang = translations[lang] ? lang : "az";
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });

  const shortLabels = {
    az: "AZ",
    en: "EN",
    ru: "RU",
    tr: "TR"
  };

  if (languageMenuBtn) {
    languageMenuBtn.textContent = shortLabels[currentLang];
  }

  localStorage.setItem("language", currentLang);
}

function setTheme(mode) {
  if (!themeToggleBtn) return;

  if (mode === "light") {
    document.body.classList.add("light-mode");
    themeToggleBtn.textContent = "☾";
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-mode");
    themeToggleBtn.textContent = "☀";
    localStorage.setItem("theme", "dark");
  }
}

function openLightbox(imageSrc) {
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.add("active");
  lightboxImg.src = imageSrc;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("active");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isLight = document.body.classList.contains("light-mode");
    setTheme(isLight ? "dark" : "light");
  });
}

if (languageMenuBtn && languageMenu) {
  languageMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    languageMenu.classList.toggle("show");
  });
}

if (languageItems.length > 0) {
  languageItems.forEach((item) => {
    item.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      applyTranslations(lang);

      if (languageMenu) {
        languageMenu.classList.remove("show");
      }
    });
  });
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".lang-dropdown") && languageMenu) {
    languageMenu.classList.remove("show");
  }
});

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const activeLang = localStorage.getItem("language") || "az";
    alert(translations[activeLang].form_success);
    form.reset();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

const savedLanguage = localStorage.getItem("language") || "az";
applyTranslations(savedLanguage);

const translations = {
  az: {
    nav_about: "Haqqımda",
    nav_services: "Xidmətlər",
    nav_results: "Nəticələr",
    nav_contact: "Əlaqə"
  },
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_results: "Results",
    nav_contact: "Contact"
  },
  ru: {
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_results: "Результаты",
    nav_contact: "Контакты"
  },
  tr: {
    nav_about: "Hakkımda",
    nav_services: "Hizmetler",
    nav_results: "Sonuçlar",
    nav_contact: "İletişim"
  }
};
const languageMenuBtn = document.getElementById("languageMenuBtn");
const languageMenu = document.getElementById("languageMenu");
const languageItems = document.querySelectorAll(".lang-menu-item");

function applyTranslations(lang) {
  const currentLang = translations[lang] ? lang : "az";
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });

  const shortLabels = {
    az: "AZ",
    en: "EN",
    ru: "RU",
    tr: "TR"
  };

  languageMenuBtn.textContent = shortLabels[currentLang];
  localStorage.setItem("language", currentLang);
}

languageMenuBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  languageMenu.classList.toggle("show");
});

languageItems.forEach((item) => {
  item.addEventListener("click", function () {
    const lang = this.getAttribute("data-lang");
    applyTranslations(lang);
    languageMenu.classList.remove("show");
  });
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".lang-dropdown")) {
    languageMenu.classList.remove("show");
  }
});
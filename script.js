// --- SCROLL PROGRESS ---
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// --- GLOW BLOB ---
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY + window.scrollY - 300}px)`;
});

// --- SCROLL REVEAL ---
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// --- SMOOTH SCROLL NAV ---
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- ACTIVE SECTION INDICATOR ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [];
navLinks.forEach(a => {
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) sections.push({ el, link: a });
});

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const match = sections.find(s => s.el === entry.target);
    if (match) {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        match.link.classList.add('active');
      }
    }
  });
}, { threshold: 0.2, rootMargin: '-56px 0px -40% 0px' });

sections.forEach(s => sectionObs.observe(s.el));

// --- TYPEWRITER ---
const heroName = document.getElementById('heroName');
const fullName = heroName.textContent.trim();
heroName.textContent = '';
const cursor = document.createElement('span');
cursor.className = 'typewriter-cursor';
cursor.innerHTML = ' ';
heroName.appendChild(cursor);

let charIdx = 0;
function typeNext() {
  if (charIdx < fullName.length) {
    heroName.insertBefore(document.createTextNode(fullName[charIdx]), cursor);
    charIdx++;
    setTimeout(typeNext, 70 + Math.random() * 40);
  } else {
    setTimeout(() => cursor.remove(), 2500);
  }
}
setTimeout(typeNext, 600);

// --- DARK / LIGHT TOGGLE ---
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const sunPath = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

themeBtn.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeIcon.innerHTML = isDark ? moonPath : sunPath;
});

// --- BACK TO TOP ---
const topBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 400);
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- PDF DOWNLOAD ---
document.getElementById('pdfBtn').addEventListener('click', () => {
  if (charIdx < fullName.length) {
    heroName.textContent = fullName;
    charIdx = fullName.length;
    if (cursor.parentNode) cursor.remove();
  }
  setTimeout(() => window.print(), 100);
});

// --- VISITOR COUNTER ---
(async () => {
  const el = document.getElementById('visitorCount');
  try {
    const res = await fetch('https://visitor-badge.laobi.icu/badge?page_id=dedeoglukaan.github.io');
    const svg = await res.text();
    const match = svg.match(/<text[^>]*>(\d+)<\/text>\s*$/);
    if (match) {
      const count = parseInt(match[1]).toLocaleString();
      el.innerHTML = '<span class="vc-dot"></span> ' + count + ' visitors';
    }
  } catch {}
})();

// --- LANGUAGE TOGGLE ---
const langBtn = document.getElementById('langToggle');
let currentLang = 'en';

const translations = {
  'nav-exp':       { en: 'Experience',  tr: 'Deneyim' },
  'nav-training':  { en: 'Training',    tr: 'Eğitim' },
  'nav-certs':     { en: 'Certs',       tr: 'Sertifika' },
  'nav-projects':  { en: 'Projects',    tr: 'Proje' },
  'nav-skills':    { en: 'Skills',      tr: 'Beceri' },
  'hero-tag':      { en: 'Open to opportunities', tr: 'Fırsatlara açık' },
  'hero-desc':     {
    en: 'Computer Engineering graduate with a strong foundation in Linux systems, networking, and application security. Backed by hands-on internship experience, an IEEE-published research project, and continuous investment in offensive security training.',
    tr: 'Linux sistemleri, ağ yapıları ve uygulama güvenliği konularında güçlü altyapıya sahip Bilgisayar Mühendisliği mezunu. Staj deneyimleri, IEEE\'de yayımlanmış araştırma projesi ve ofansif güvenlik eğitimleriyle desteklenen bir profil.'
  },
  'sec-edu':       { en: 'Education',   tr: 'Eğitim' },
  'sec-exp':       { en: 'Experience',  tr: 'Deneyim' },
  'sec-training':  { en: 'Training & Development', tr: 'Eğitim & Gelişim' },
  'sec-certs':     { en: 'Certifications', tr: 'Sertifikalar' },
  'sec-projects':  { en: 'Projects',    tr: 'Projeler' },
  'sec-skills':    { en: 'Technical Skills', tr: 'Teknik Beceriler' },
  'edu-bsc':       { en: 'BSc in Computer Engineering', tr: 'Bilgisayar Mühendisliği Lisans' },
  'edu-bsc-org':   { en: 'Eskişehir Technical University, Turkey — Language of Instruction: English', tr: 'Eskişehir Teknik Üniversitesi — Öğretim Dili: İngilizce' },
  'edu-hs-org':    { en: 'Science High School — Silivri, Istanbul, Turkey', tr: 'Fen Lisesi — Silivri, İstanbul' },
  'exp-estu-title':{ en: 'IT Systems Intern', tr: 'Sistem Stajyeri' },
  'exp-estu-org':  { en: 'Eskişehir Technical University — IT Department, Systems & Networking', tr: 'Eskişehir Teknik Üniversitesi — Bilgi İşlem Dairesi, Sistem ve Ağ Birimi' },
  'exp-estu-1':    {
    en: 'Worked in a team of three interns to install and configure DSpace 8 for the university\'s digital library. Installed Java 17, Maven, Ant, PostgreSQL, and Apache Solr on an Ubuntu 22.04 VM provisioned by the IT staff.',
    tr: 'Üç kişilik stajyer ekibiyle üniversitenin dijital kütüphanesi için DSpace 8 kurulumu ve yapılandırması üzerinde çalıştı. BT ekibinin hazırladığı Ubuntu 22.04 VM üzerine Java 17, Maven, Ant, PostgreSQL ve Apache Solr kurdu.'
  },
  'exp-estu-2':    {
    en: 'Set up the PostgreSQL database: created a dedicated DSpace user, configured connection security (pg_hba.conf, MD5 auth), and enabled the pgcrypto extension for UUID support.',
    tr: 'PostgreSQL veritabanını kurdu: DSpace için ayrı kullanıcı oluşturdu, bağlantı güvenliğini ayarladı (pg_hba.conf, MD5 auth) ve UUID desteği için pgcrypto eklentisini aktifleştirdi.'
  },
  'exp-estu-3':    {
    en: 'Configured Apache Solr cores for DSpace search, integrated MaxMind GeoIP for usage statistics, and ran the application as a Spring Boot JAR with custom properties and logging.',
    tr: 'DSpace arama motoru için Apache Solr core\'larını yapılandırdı, kullanım istatistikleri için MaxMind GeoIP entegre etti ve uygulama yı özel ayarlarla Spring Boot JAR olarak çalıştırdı.'
  },
  'exp-estu-4':    {
    en: 'Configured HTTPS access through Apache HTTPD as a reverse proxy with a Let\'s Encrypt certificate, and set up cron jobs for daily indexing, media filtering, and checksum verification.',
    tr: 'Apache HTTPD ile reverse proxy üzerinden HTTPS erişimi kurdu (Let\'s Encrypt sertifikası), günlük indeksleme, medya filtreleme ve checksum doğrulama için cron job\'ları oluşturdu.'
  },
  'exp-creen-title':{ en: 'IT Systems Intern', tr: 'Sistem Stajyeri' },
  'exp-creen-org': { en: 'Creentech — Istanbul, Turkey — Systems & Network Department', tr: 'Creentech — İstanbul — Sistem ve Ağ Departmanı' },
  'exp-creen-1':   {
    en: 'Installed Debian from scratch and practiced daily Linux administration: user management, file permissions, sudo configuration, package management with APT, and service control with systemctl.',
    tr: 'Sıfırdan Debian kurarak günlük Linux yönetimi pratiği yaptı: kullanıcı yönetimi, dosya izinleri, sudo ayarları, APT ile paket yönetimi ve systemctl ile servis kontrolü.'
  },
  'exp-creen-2':   {
    en: 'Wrote basic Bash scripts, set up cron jobs for scheduled tasks, and learned process management, disk usage monitoring, and text processing tools (grep, awk, find).',
    tr: 'Basit Bash scriptleri yazdı, zamanlanmış görevler için cron job\'ları kurdu, süreç yönetimi, disk izleme ve metin işleme araçlarını (grep, awk, find) öğrendi.'
  },
  'exp-creen-3':   {
    en: 'Assisted in configuring Fortinet equipment alongside the network team: FortiGate firewall policies, VLAN setup, static routing, web filtering, and AP/switch integration.',
    tr: 'Ağ ekibiyle birlikte Fortinet cihazlarının konfigürasyonuna destek verdi: FortiGate firewall kuralları, VLAN kurulumu, statik routing, web filtreleme ve AP/switch entegrasyonu.'
  },
  'exp-creen-4':   {
    en: 'Observed production monitoring (Grafana, Zabbix), virtualization platforms (VirtualBox, VMware, Nutanix), and Active Directory management. Toured Casper Ness Data Center to study physical infrastructure.',
    tr: 'Canlı ortam izleme (Grafana, Zabbix), sanallaştırma platformları (VirtualBox, VMware, Nutanix) ve Active Directory yönetimini gözlemledi. Casper Ness Veri Merkezi\'ni ziyaret ederek fiziksel altyapıyı inceledi.'
  },
  'tr-title':      { en: 'Garanti BBVA Technology Security Academy', tr: 'Garanti BBVA Teknoloji Güvenlik Akademisi' },
  'tr-org':        { en: 'Enterprise Technology & Cybersecurity Training Program — Patika.dev', tr: 'Kurumsal Teknoloji ve Siber Güvenlik Eğitim Programı — Patika.dev' },
  'tr-badge':      { en: 'Selected top 20 out of ~2,000 applicants', tr: '~2.000 başvurudan ilk 20\'ye seçildi' },
  'tr-1':          {
    en: 'Intensive program covering Linux internals, network protocols, and enterprise application security.',
    tr: 'Linux iç yapısı, ağ protokolleri ve kurumsal uygulama güvenliğini kapsayan yoğun eğitim programı.'
  },
  'tr-2':          {
    en: 'Practiced threat modeling, access control design, and secure architecture review on real-world enterprise systems.',
    tr: 'Gerçek kurumsal sistemler üzerinde tehdit modelleme, erişim kontrolü tasarımı ve güvenli mimari incelemesi çalışmaları yaptı.'
  },
  'proj-title':    {
    en: 'OSTEODEEP — AI-Driven Bone Health Assessment with Chatbot Integration using X-rays',
    tr: 'OSTEODEEP — X-ray ile Yapay Zeka Destekli Kemik Sağlığı Değerlendirmesi ve Chatbot Entegrasyonu'
  },
  'proj-org':      { en: 'Graduation Thesis — Eskişehir Technical University', tr: 'Bitirme Tezi — Eskişehir Teknik Üniversitesi' },
  'proj-ieee':     { en: 'IEEE Published', tr: 'IEEE Yayımlandı' },
  'proj-tubitak':  { en: 'TÜBİTAK 2209-A Funded', tr: 'TÜBİTAK 2209-A Destekli' },
  'proj-1':        {
    en: 'Designed and built a complete ML pipeline for bone health screening: data collection from public repositories (1,947 knee X-ray images), preprocessing with CLAHE contrast enhancement, conservative augmentation to preserve anatomical integrity, and class balancing for the underrepresented osteopenia class.',
    tr: 'Kemik sağlığı taraması için uçtan uca ML pipeline\'ı tasarlayıp geliştirdi: açık kaynak depolardan veri toplama (1.947 diz X-ray görüntüsü), CLAHE ile kontrast iyileştirme, anatomik bütünlüğü koruyan augmentation ve az temsil edilen osteopeni sınıfı için sınıf dengeleme.'
  },
  'proj-2':        {
    en: 'Extracted deep features in parallel from pre-trained EfficientNetB2 and VGG-19 models, fused the resulting feature vectors, and applied PCA (300 components) for dimensionality reduction while retaining maximum variance.',
    tr: 'Önceden eğitilmiş EfficientNetB2 ve VGG-19 modellerinden paralel olarak derin öznitelik çıkarımı yaptı, öznitelik vektörlerini birleştirdi ve maksimum varyansı koruyarak PCA (300 bileşen) ile boyut indirgeme uyguladı.'
  },
  'proj-3':        {
    en: 'Implemented a stacking ensemble classifier with SVM (RBF kernel) and XGBoost as base learners and Logistic Regression as the meta-learner, with hyperparameter optimization via GridSearchCV within 5-fold cross-validation.',
    tr: 'SVM (RBF kernel) ve XGBoost\'u temel öğrenici, Lojistik Regresyon\'u meta-öğrenici olarak kullanan stacking ensemble sınıflandırıcı geliştirdi; 5 katlı çapraz doğrulama içinde GridSearchCV ile hiperparametre optimizasyonu yaptı.'
  },
  'proj-4':        {
    en: 'Achieved 90.10% test accuracy, 90.14% weighted F1-score, and 0.96 macro-average ROC AUC. The model reached 91.20% recall on the clinically challenging osteopenia class, outperforming standalone CNN approaches in balanced multi-class classification.',
    tr: '%90,10 test doğruluğu, %90,14 ağırlıklı F1-skoru ve 0,96 makro ortalama ROC AUC elde etti. Model, klinik açıdan zorlu osteopeni sınıfında %91,20 recall değerine ulaşarak tek başına CNN yaklaşımlarını geride bıraktı.'
  },
  'proj-5':        {
    en: 'Integrated a ChatGPT-powered chatbot via OpenAI API to deliver context-sensitive guidance on osteoporosis risks, prevention, and lifestyle recommendations based on diagnostic outcomes.',
    tr: 'Tanı sonuçlarına göre osteoporoz riskleri, önleme yöntemleri ve yaşam tarzı önerileri sunan, OpenAI API ile çalışan ChatGPT tabanlı bir sohbet botu entegre etti.'
  },
  'sk-sec':        { en: 'Security',    tr: 'Güvenlik' },
  'sk-tool':       { en: 'Tools',       tr: 'Araçlar' },
  'sk-sys':        { en: 'Systems',     tr: 'Sistemler' },
  'sk-prog':       { en: 'Programming', tr: 'Programlama' },
  'pdf-btn':       { en: 'Save as PDF', tr: 'PDF olarak kaydet' }
};

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  langBtn.textContent = lang === 'en' ? 'TR' : 'EN';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });
}

langBtn.addEventListener('click', () => {
  setLang(currentLang === 'en' ? 'tr' : 'en');
});

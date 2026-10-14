/* =====================================================================
   PORTFOLIO CONTENT — this is the only file you need to edit.
   ---------------------------------------------------------------------
   • Change any text, add/remove items in the lists, save, push. Done.
   • In descriptions you can write **bold text** with double asterisks.
   • Keep the commas between items and the quotes around text.
   • File paths are relative to the root of the repository.
   ===================================================================== */

const CONTENT = {

  /* ─────────────── Personal info ─────────────── */
  profile: {
    name: "Yasser Saidani",
    role: "Software Engineering Student",
    tagline: "Full-Stack · AI · Data",
    location: "Bizerte, Tunisia",
    availability: "Open to internships",
    photo: "assets/img/profile.webp",
    photoFallback: "assets/img/profile.jpg",

    summary:
      "Software Engineering student passionate about software architecture, cross-platform applications, " +
      "Artificial Intelligence and machine learning pipeline design.",

    goal:
      "Seeking an internship or project opportunity as a **Full-Stack Developer**, **AI** or **Data Scientist** intern, " +
      "where I can contribute to impactful projects while expanding my expertise in software engineering and artificial intelligence.",

    // Shown in the "Let's work together" box at the bottom
    contactMessage:
      "I'm currently open to internships and project opportunities. Feel free to reach out!",

    email: "saidaniyesser999@gmail.com",
    phone: "+216 50 552 771",

    // icon can be: github, linkedin, mail, phone, globe
    links: [
      { label: "GitHub", url: "https://github.com/yesser147", icon: "github" },
      // { label: "LinkedIn", url: "https://www.linkedin.com/in/your-profile", icon: "linkedin" },
    ],

    cv: [
      { label: "Download CV (EN)", file: "assets/cv/CV_EN.pdf" },
      { label: "CV (FR)",          file: "assets/cv/CV_FR.pdf" },
    ],
  },

  /* ─────────────── Experience (newest first) ───────────────
     summary / location / github → optional                             */
  experience: [
    {
      period: "Aug – Sep 2026",
      role: "Full-Stack & AI Developer Intern",
      company: "Dynamix Services",
      location: "Bizerte",
      summary:
        "Built **Nexus ERP** (Smart ERP Core), an HR platform with built-in AI and business intelligence: " +
        "employees, leave, performance reviews, recruitment and KPI dashboards.",
      bullets: [
        "**Spring Boot** REST API with JWT authentication, role-based access (admin, HR, manager, employee), Flyway migrations and an audit log.",
        "**Angular** web app (dashboards, staff management, recruitment, employee self-service) plus a public careers site where candidates apply with their CV.",
        "AI recruitment: LLM-based CV analysis and candidate ranking, semantic CV search (**pgvector**), generated job descriptions and interview questions.",
        "HR chatbot that turns natural-language questions into safe SQL queries and returns answers and charts (Groq, with Ollama as local fallback).",
        "Machine learning: employee attrition-risk model (**XGBoost** + SHAP explanations) and a training-budget advisor with a what-if simulator.",
        "Python ETL pipeline loading HR datasets into PostgreSQL; whole platform containerized with **Docker Compose**.",
      ],
      stack: ["Angular", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "pgvector", "XGBoost", "LLM", "Docker"],
      github: "https://github.com/yesser147/Smart_ERP",
    },
    {
      period: "July 2025",
      role: "Full Stack Developer Intern (Django)",
      company: "Vnext Consulting",
      bullets: [
        "Designed and developed a web application for managing refugee camps for the Tunisian government.",
        "Centralized data (refugees, tents), managed stocks/donations and coordinated field teams.",
      ],
      stack: ["Python", "Django", "PostgreSQL", "Bootstrap 5", "Git"],
    },
  ],

  /* ─────────────── Education (newest first) ─────────────── */
  education: [
    { period: "2024 – 2025", title: "Cycle Ingénieur — Génie Logiciel", place: "Fac de Science de Bizerte" },
    { period: "2022 – 2024", title: "Cycle Préparatoire Intégré",       place: "Fac de Science de Bizerte" },
    { period: "2018 – 2022", title: "Bac Technique (Mention Bien)",     place: "Lycée Farhat Hached, Bizerte" },
  ],

  /* ─────────────── Projects ───────────────
     categories → used by the filter buttons (any words you like)
     github / demo → optional, leave "" or remove the line if none      */
  projects: [
    {
      title: "AI-Powered University Management Portal",
      description:
        "University administration system built with **Express.js**, with an autonomous **AI agent** that " +
        "interacts with the database through custom querying tools.",
      highlights: [
        "AI-driven verification of medical certificates.",
        "Streamlined, automatic absence-tracking workflow.",
      ],
      stack: ["Express.js", "Node.js", "AI Agent"],
      categories: ["Web", "AI"],
      github: "https://github.com/yesser147/PFA",
    },
    {
      title: "IoT Vehicle Tilt & Anomaly Detection",
      description:
        "Gyroscope-based IoT system detecting abnormal vehicle tilt or movement and sending real-time alerts to a Telegram group.",
      highlights: [
        "Arduino Uno with gyroscope sensor, data transmitted over MQTT.",
        "Supabase for real-time storage, Hive for local caching on the front-end.",
        "Telegram bot integration with configurable alert recipient groups.",
      ],
      stack: ["React", "Arduino", "MQTT", "Supabase"],
      categories: ["IoT", "Web"],
      github: "https://github.com/yesser147/SafeRide",
    },
    {
      title: "University Attendance Tracking App",
      description:
        "Complete mobile workflow built with **Flutter** and a **XAMPP** (MySQL) backend. Admins manage teachers, " +
        "students and classes; teachers track live presence and absence metrics.",
      stack: ["Flutter", "MySQL", "XAMPP"],
      categories: ["Mobile"],
      github: "https://github.com/yesser147/projet_mobil",
    },
    {
      title: "Full-Stack Professional Network",
      description:
        "LinkedIn-inspired social platform built with **Express.js**: secure user data handling, profile interactions, " +
        "feeds and backend relation mappings.",
      stack: ["Express.js", "Node.js"],
      categories: ["Web"],
      github: "https://github.com/yesser147/linkedinSocialMedia",
    },
    {
      title: "Predictive Data Classification Pipelines",
      description:
        "Machine-learning classification setups in **Python**: automated preprocessing pipelines, multiple evaluated " +
        "models and visualized performance indicators to maximize accuracy.",
      stack: ["Python", "Machine Learning", "Data Analysis"],
      categories: ["AI"],
      github: "https://github.com/yesser147/ml",
    },
    {
      title: "University Enterprise Network (EVE-NG)",
      description:
        "Designed and simulated a full university network topology in **EVE-NG** with secure access controls, VLANs " +
        "and routing policies, plus distinct privilege levels and bandwidth limits for administrators, teachers and students.",
      stack: ["EVE-NG", "VLAN", "Routing", "ACL"],
      categories: ["Networking"],
    },
    {
      title: "Desktop Social Networking App",
      description:
        "Professional networking desktop interface built with **Java 8** and Scene Builder, with client interaction " +
        "schemas and smooth workflow controls.",
      stack: ["Java", "Scene Builder"],
      categories: ["Desktop"],
    },
  ],

  /* ─────────────── Skills ───────────────
     type "bars" → items are { name, level (0-100) }
     type "tags" → items are plain text                                 */
  skills: [
    {
      group: "Programming Languages",
      type: "bars",
      items: [
        { name: "Python", level: 80 },
        { name: "HTML / CSS", level: 80 },
        { name: "Java", level: 70 },
        { name: "C++", level: 60 },
        { name: "JavaScript, PHP, Go", level: 50 },
      ],
    },
    {
      group: "Frameworks & Technologies",
      type: "bars",
      items: [
        { name: "Django", level: 85 },
        { name: "Flutter", level: 75 },
        { name: "Express.js / Node.js", level: 70 },
        { name: "Spring Boot", level: 70 },
        { name: "Angular", level: 65 },
      ],
    },
    {
      group: "Databases & Big Data",
      type: "tags",
      items: ["MySQL", "Oracle", "PostgreSQL", "MongoDB", "HBase", "Hadoop", "HDFS"],
    },
    {
      group: "Domains & Tools",
      type: "tags",
      items: ["Machine Learning", "Data Analysis", "UML Modeling", "JUnit", "Selenium", "Katalon", "Bootstrap 5", "Docker", "Airflow", "Git"],
    },
  ],

  /* ─────────────── Languages ─────────────── */
  languages: [
    { name: "Arabic", level: 100 },
    { name: "English", level: 80 },
    { name: "French", level: 65 },
    { name: "German", level: 25 },
  ],

  /* ─────────────── Interests ─────────────── */
  interests: ["Programming", "Artificial Intelligence", "Problem-Solving", "Cybersecurity", "Web Development", "Video Games"],

  /* ─────────────── Certifications ───────────────
     file  → the PDF that opens on click
     image → preview picture (optional)                                 */
  certifications: [
    {
      title: "Introduction to Apache Airflow in Python",
      issuer: "DataCamp",
      date: "Oct 2025",
      file: "assets/certificates/airflow.pdf",
      image: "assets/certificates/airflow.webp",
    },
    {
      title: "Introduction to Docker",
      issuer: "DataCamp",
      date: "Sep 2025",
      file: "assets/certificates/docker3.pdf",
      image: "assets/certificates/docker3.webp",
    },
    {
      title: "Intermediate Docker",
      issuer: "DataCamp",
      date: "Oct 2025",
      file: "assets/certificates/docker2.pdf",
      image: "assets/certificates/docker2.webp",
    },
  ],
};

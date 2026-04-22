export const profile = {
  name: "Rohit Ananthan",
  pronouns: "He/Him",
  title: "Data Scientist",
  tagline: "Building Intelligent Systems at the Intersection of ML, GenAI & Product Analytics",
  bio: "Data Scientist with 4+ years building production ML systems across e-commerce, non-profit, and enterprise domains. Specializing in LLM-powered applications, product analytics, real-time anomaly detection, and scalable data engineering pipelines using Python, PySpark, GCP, AWS, and Snowflake.",
  location: "United States",
  email: "rohitananthan123@gmail.com",
  linkedin: "https://www.linkedin.com/in/rohit-ananthan/",
  github: "https://github.com/Ramidoz",
};

export const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "10+", label: "ML Projects Deployed" },
  { value: "40%", label: "Avg. Efficiency Gain" },
  { value: "500+", label: "LinkedIn Connections" },
];

export const experiences = [
  {
    title: "Data Scientist Consultant",
    company: "Invision Global Tech Inc",
    type: "Full-time",
    period: "Feb 2026 – Present",
    duration: "2 mos",
    location: "United States",
    bullets: [],
    tags: ["ML", "Python", "Data Science", "Consulting"],
    current: true,
  },
  {
    title: "Data Scientist",
    company: "Community Dreams Foundation",
    type: "Full-time",
    period: "Feb 2025 – Feb 2026",
    duration: "1 yr",
    location: "Remote",
    bullets: [
      "Built an AI-powered Legal & Compliance Assistant using GPT-4o with a RAG pipeline on LangChain, Pinecone, and ANN search — cutting manual review time by 40%",
      "Deployed end-to-end ML pipelines on GCP Vertex AI and Dataproc with automated hyperparameter tuning via MLflow — improving demand forecasting accuracy by 15%",
      "Implemented MLOps workflows using Vertex AI, Cloud Build, and GitHub Actions for automated model versioning, drift detection, and CI/CD across environments",
      "Built a real-time fraud and anomaly detection system using Pub/Sub, Dataflow (Apache Beam), and XGBoost — reducing undetected fraud by 20%",
      "Engineered scalable data pipelines with Dataflow, Composer (Airflow), and BigQuery — cutting ETL latency by 60%",
      "Developed LLM-based apps for document summarization and Q&A using OpenAI APIs and Vertex Matching Engine for semantic search",
      "Created predictive donor churn models with TensorFlow and Scikit-learn, deployed on Vertex AI with Looker Studio dashboards",
    ],
    tags: ["GPT-4o", "LangChain", "GCP", "Vertex AI", "XGBoost", "TensorFlow", "BigQuery", "Airflow", "MLflow"],
    current: false,
  },
  {
    title: "Financial Analyst",
    company: "The Premiere Group",
    type: "Full-time",
    period: "Sep 2025 – Oct 2025",
    duration: "2 mos",
    location: "Columbia, MO · On-site",
    bullets: [],
    tags: ["Financial Analysis", "Data Analytics"],
    current: false,
  },
  {
    title: "Technical Consultant – Course Renewal Automation",
    company: "University of Maryland – Extended Studies",
    type: "Internship",
    period: "Jan 2024 – Dec 2024",
    duration: "1 yr",
    location: "College Park, MD · Remote",
    bullets: [],
    tags: ["Salesforce", "Automation", "Microsoft Teams Planner"],
    current: false,
  },
  {
    title: "Graduate Assistant",
    company: "University of Maryland",
    type: "Part-time",
    period: "Jan 2024 – Dec 2024",
    duration: "1 yr",
    location: "College Park, MD · On-site",
    bullets: [],
    tags: ["Data Digitization", "CMS", "Research"],
    current: false,
  },
  {
    title: "Data Scientist",
    company: "Kameleon Technologies",
    type: "Full-time",
    period: "May 2021 – Jul 2023",
    duration: "2 yrs 2 mos",
    location: "Chennai, India",
    bullets: [
      "Engineered a real-time fraud detection pipeline using Neo4j graph database and XGBoost — processing 5M+ daily transactions with an 18% reduction in false positives",
      "Built scalable ETL/ELT pipelines on PySpark and AWS (S3, Glue, EMR) to process terabytes of financial data — reducing pipeline processing time by 35%",
      "Developed customer segmentation and churn prediction models using ensemble methods — driving a 12–15% improvement in customer retention across key segments",
      "Established MLOps practices with MLflow experiment tracking, SageMaker model registry, and automated retraining workflows for production model governance",
      "Delivered executive-facing Tableau dashboards for transaction monitoring, KPI tracking, and fraud trend analysis — adopted across operations and risk teams",
    ],
    tags: ["Neo4j", "XGBoost", "PySpark", "AWS", "SageMaker", "MLflow", "Tableau", "Fraud Detection"],
    current: false,
  },
];

export const education = [
  {
    degree: "Master of Science – Information Systems",
    school: "University of Maryland",
    subtitle: "Robert H. Smith School of Business",
    location: "College Park, MD",
    logo: "UMD",
    color: "#e21833",
    skills: ["GCP", "Requirements Gathering", "ML", "Business Intelligence"],
  },
  {
    degree: "Bachelor of Technology – Engineering",
    school: "IIIT Chennai",
    subtitle: "Indian Institute of Information Technology",
    location: "Chennai, India",
    logo: "IIIT",
    color: "#1a56db",
    skills: ["Python", "MATLAB", "Machine Learning", "Research"],
  },
];

export const skills = {
  "Languages & Libraries": ["Python", "SQL", "R", "PySpark", "MATLAB", "Pandas", "NumPy", "PyTorch", "TensorFlow", "Scikit-learn"],
  "ML & AI": ["Machine Learning", "Deep Learning", "NLP", "LLMs", "GPT-4o", "RAG", "XGBoost", "GenAI", "A/B Testing", "Causal Inference"],
  "Data Engineering": ["ETL / ELT", "Apache Airflow", "Apache Beam", "Dataflow", "Pub/Sub", "DBT", "MLflow", "CI/CD", "GitHub Actions"],
  "Cloud & Infra": ["GCP Vertex AI", "AWS SageMaker", "Azure", "BigQuery", "Snowflake", "Dataproc", "Cloud Build", "Docker"],
  "BI & Visualization": ["Tableau", "Power BI", "Looker Studio", "Data Storytelling"],
  "Databases & Search": ["Neo4j", "Pinecone", "LangChain", "LlamaIndex", "ANN Search", "Vector DBs"],
};

export const certifications = [
  {
    name: "Neo4j Graph Data Science Certification",
    issuer: "Neo4j",
    date: "Feb 2025",
    color: "#018BFF",
    icon: "🔷",
  },
  {
    name: "AWS Certified AI Practitioner (AIF-C01)",
    issuer: "Amazon Web Services",
    date: "2024",
    color: "#FF9900",
    icon: "☁️",
  },
  {
    name: "BCG Data Science Job Simulation",
    issuer: "Boston Consulting Group × Forage",
    date: "Feb 2025",
    color: "#009f6b",
    icon: "📊",
  },
];

export const publications = [
  {
    title: "Mathematical Modeling of Thermal Error Using Machine Learning",
    publisher: "Springer",
    date: "Oct 6, 2022",
    abstract:
      "Research on thermal error modeling in machine tools using machine learning algorithms to identify the most effective compensation strategies for linear expansion and deformation caused by heat inputs from internal and external sources.",
    tags: ["Machine Learning", "Thermal Modeling", "Manufacturing", "Springer"],
  },
];

export const projects = [
  {
    title: "Maez — A Digital Companion",
    description:
      "A new kind of AI companion that grows, learns, and bonds with a single user for life. Runs locally on consumer hardware with persistent memory, a self-evolving cognitive loop, and proposal-based autonomy — the user owns the credentials, Maez owns the intent.",
    tags: ["Local LLMs", "llama.cpp", "Persistent Memory", "Agentic Systems", "RAG", "Python", "CUDA", "Self-Improvement"],
    color: "#e879f9",
    icon: "🫂",
    github: "https://github.com/Ramidoz",
    live: "https://maez.live",
    highlights: ["Lifetime bond, one user", "Runs on-device (RTX 4090)", "Self-evolving cognition"],
  },
  {
    title: "TrendScope",
    description:
      "AI agent for content strategy — analyzes live YouTube trends, scores each by velocity, engagement, and competition, then delivers a ranked action plan with titles, hooks, and timing rationale via a ReAct reasoning loop.",
    tags: ["ReAct Agent", "FastAPI", "Next.js", "LiteLLM", "GPT-4o-mini", "YouTube API", "Python"],
    color: "#00d4ff",
    icon: "📈",
    github: "https://github.com/Ramidoz/Trendscout",
    live: "https://frontend-ramidozs-projects.vercel.app",
    highlights: ["ReAct agent loop", "Custom scoring algorithm", "Real-time trend signals"],
  },
  {
    title: "AI Voice FAQ Assistant",
    description:
      "Conversational FAQ system powered by Google Gemini Pro with a full RAG pipeline — enabling semantic search over a product knowledge base with real-time voice interaction.",
    tags: ["Gemini Pro", "RAG", "LlamaIndex", "Pinecone", "FastAPI", "NLP"],
    color: "#00d4ff",
    icon: "🎙️",
    github: "https://github.com/Ramidoz",
    highlights: ["RAG pipeline", "Semantic search", "Voice interface"],
  },
  {
    title: "Real-time Fraud Detection System",
    description:
      "Production-grade fraud detection engine using Neo4j graph relationships and XGBoost — processing 5M+ daily transactions with 18% reduction in false positives.",
    tags: ["Neo4j", "XGBoost", "PySpark", "AWS", "Graph ML", "Streaming"],
    color: "#7c3aed",
    icon: "🛡️",
    github: "https://github.com/Ramidoz",
    highlights: ["5M+ daily txns", "18% fewer false positives", "Graph-based detection"],
  },
  {
    title: "Gym Aesthetic Trap",
    description:
      "NLP research project using LDA topic modeling to analyze online discourse around SARMs and steroid usage — uncovering themes, risk perception patterns, and community sentiment from bodybuilding forums.",
    tags: ["NLP", "LDA", "Python", "Topic Modeling", "Scikit-learn", "Reddit"],
    color: "#f59e0b",
    icon: "💊",
    github: "https://github.com/Ramidoz",
    highlights: ["LDA topic modeling", "Community sentiment", "Forum analysis"],
  },
  {
    title: "Thermal Error ML Modeling",
    description:
      "Published Springer research on machine learning compensation strategies for thermal deformation in precision machine tools — achieving state-of-the-art accuracy in error prediction.",
    tags: ["Machine Learning", "MATLAB", "Regression", "Manufacturing", "Springer"],
    color: "#10b981",
    icon: "📐",
    github: "https://github.com/Ramidoz",
    highlights: ["Springer publication", "Oct 2022", "Precision manufacturing"],
  },
];

// The "ask me anything" corpus. Every answer is hand-written in Rohit's voice
// and grounded in what's already public on this site — deliberately NOT an
// LLM, so it can never hallucinate a claim or leak anything about client work.

export interface QALink {
  label: string;
  href?: string;        // external / mailto / download
  section?: string;     // in-page anchor, e.g. "#projects"
}

export interface QA {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  links?: QALink[];
  suggested?: boolean;  // surfaced as a starter chip
}

export const INTERVIEW_CORPUS: QA[] = [
  {
    id: "building-now",
    question: "What are you building right now?",
    keywords: ["current", "now", "today", "building", "working", "vdart", "latest", "work on", "day job"],
    answer:
      "By day: multi-agent AI systems at Vdart for an enterprise healthcare client — I can't share specifics (NDA), but the shape of it is taking slow, document-heavy human workflows and teaching a team of agents to run them. By night: Maez, my local-first AI companion project. Different scales, same obsession — systems that act, not just predict.",
    links: [{ label: "Experience", section: "#experience" }],
    suggested: true,
  },
  {
    id: "maez",
    question: "What's Maez?",
    keywords: ["maez", "companion", "side project", "personal project", "local llm"],
    answer:
      "Maez is my favorite thing I've built: a digital companion that runs entirely on consumer hardware — one user, one bond, for life. Persistent memory, a self-evolving cognitive loop, and proposal-based autonomy: the user owns the credentials, Maez owns the intent. It's my playground for questions the industry hasn't answered yet — what does memory really mean for an AI, and how much autonomy should one have?",
    links: [
      { label: "maez.live", href: "https://maez.live" },
      { label: "More projects", section: "#projects" },
    ],
    suggested: true,
  },
  {
    id: "light-up",
    question: "What kind of problems light you up?",
    keywords: ["light", "excite", "love", "enjoy", "favorite problem", "passion", "drives", "motivates", "why data"],
    answer:
      "Problems where the data has structure nobody's exploiting yet. Fraud was my gateway drug — the moment you model transactions as a graph instead of a table, patterns just surface: rings, mule accounts, shared devices. Same instinct drew me to retrieval and agents. And honestly, I need my work to ship — a model that lives in a notebook doesn't count.",
    links: [{ label: "The fraud work", section: "#projects" }],
    suggested: true,
  },
  {
    id: "ai-agents-take",
    question: "What's your take on AI coding agents?",
    keywords: ["copilot", "ai tools", "coding agents", "agents take", "opinion", "vibe coding", "claude", "cursor", "future of coding"],
    answer:
      "They're the biggest shift in how I work since notebooks. I treat them like a team I'm tech-leading: decompose the problem, write precise specs, review everything, keep the architecture decisions for myself. This entire site was built that way — me directing an AI agent through design, build, test, and deploy. The skill isn't prompting; it's knowing what to delegate, what to verify, and what to never hand over.",
    suggested: true,
  },
  {
    id: "fraud",
    question: "Tell me about the fraud detection work",
    keywords: ["fraud", "detection", "anomaly", "transactions", "neo4j", "graph", "xgboost", "real-time"],
    answer:
      "I've built fraud systems twice. At Kameleon: Neo4j graphs + XGBoost over 5M+ daily transactions, cutting false positives 18% — false positives matter because they're what burn out human review teams. At Community Dreams Foundation: rebuilt the idea cloud-native with Pub/Sub and Dataflow streaming, catching 20% more fraud. Graphs see the relationships; trees make the call.",
    links: [{ label: "See the project", section: "#projects" }],
  },
  {
    id: "background",
    question: "What's your background?",
    keywords: ["background", "story", "path", "journey", "education", "degree", "school", "umd", "iiit", "publication", "springer", "research"],
    answer:
      "Engineering at IIIT Chennai — where I published Springer research on ML for thermal error in precision machines, my first taste of models meeting the physical world. Then an MS in Information Systems at Maryland's Smith School to add the business lens. In between and since: fraud systems, RAG assistants, churn models, and now agentic AI. The throughline is production — I like models with users.",
    links: [
      { label: "Education", section: "#education" },
      { label: "The publication", section: "#publications" },
    ],
  },
  {
    id: "stack",
    question: "What's your stack?",
    keywords: ["stack", "tools", "technologies", "languages", "python", "cloud", "azure", "gcp", "aws", "tech", "use"],
    answer:
      "Python and SQL at the core, PySpark when things get heavy. I've shipped on all three clouds — GCP Vertex AI most deeply, plus AWS SageMaker and Azure. Neo4j for graph problems (certified, and genuinely a fan), vector stores for retrieval, Tableau when the audience is human. Lately: agent frameworks and AI coding tools as part of the delivery loop itself.",
    links: [{ label: "Full skills grid", section: "#skills" }],
  },
  {
    id: "outside",
    question: "What do you do outside of work?",
    keywords: ["outside", "hobby", "hobbies", "fun", "free time", "weekend", "life"],
    answer:
      "Mostly? I build more things — Maez is what happens when I get a free weekend and a GPU. I also read a lot of AI research and have strong opinions about which papers will actually matter in two years. I'm aware this makes me sound one-dimensional; my defense is that it doesn't feel like work.",
    links: [{ label: "Maez", href: "https://maez.live" }],
  },
  {
    id: "are-you-ai",
    question: "Are you an AI?",
    keywords: ["are you an ai", "are you ai", "chatbot", "robot", "real", "human", "gpt are you", "llm are you"],
    answer:
      "This chat is scripted — every word pre-written by the human Rohit, zero tokens generated. That's a deliberate design choice, not a limitation: an LLM proxy could hallucinate claims about me or leak things it shouldn't, and knowing when NOT to use an LLM is half the job. The human version is better at coffee and answers email fast.",
    links: [{ label: "Talk to the human", href: "mailto:rohitananthan123@gmail.com" }],
  },
  {
    id: "open-to",
    question: "Are you open to new opportunities?",
    keywords: ["open", "opportunities", "hiring", "hire", "recruit", "job", "role", "available", "looking", "salary", "compensation", "interview", "desperate"],
    answer:
      "I'm always curious, never desperate. If your team ships interesting things — real ML in production, agentic systems, problems with structure — I'm up for a conversation. Data Scientist, AI Engineer, ML Engineer shapes all fit. Salary and logistics are conversations for the human me, who is reasonable and replies within a day.",
    links: [
      { label: "Email Rohit", href: "mailto:rohitananthan123@gmail.com?subject=Saw your portfolio" },
      { label: "Resume", href: "/Rohit_Ananthan_Resume.pdf" },
    ],
  },
  {
    id: "contact",
    question: "How do I reach you?",
    keywords: ["contact", "reach", "email", "touch", "talk", "call", "connect", "linkedin"],
    answer:
      "Email is best: rohitananthan123@gmail.com — I usually reply within a day. LinkedIn works too. And if you just want to poke around, try the terminal on this site (press ` ) — there's more hiding in here than it looks.",
    links: [
      { label: "Email", href: "mailto:rohitananthan123@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-ananthan/" },
    ],
  },
];

export const FALLBACK: QA = {
  id: "fallback",
  question: "",
  keywords: [],
  answer:
    "That one's beyond my script — I'm a curated corpus, not a language model, and I don't improvise answers about Rohit. The human version would probably enjoy the question though: rohitananthan123@gmail.com.",
  links: [
    { label: "Email the real Rohit", href: "mailto:rohitananthan123@gmail.com" },
    { label: "Browse the site instead", section: "#about" },
  ],
};

/** Rank the corpus against free-text input; returns best match or FALLBACK. */
export function matchQuestion(input: string): QA {
  const q = input.toLowerCase();
  let best: QA | null = null;
  let bestScore = 0;
  for (const qa of INTERVIEW_CORPUS) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (q.includes(kw)) score += kw.includes(" ") ? 3 : kw.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }
  return best && bestScore >= 1 ? best : FALLBACK;
}

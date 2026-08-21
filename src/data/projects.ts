/**
 * Projects section content.
 *
 * Edit project entries here — the Projects component reads from this file.
 * The component derives its types from `projectsData`, so adding/removing
 * fields here will surface as type errors in the component (intentionally).
 *
 * All projects below are real repositories from github.com/vikas-movva.
 */

import kafkaLogo from '../assets/Apache_Kafka_logo.svg'
import wasmLogo from '../assets/webassembly-icon.svg'
import pythonLogo from '../assets/python-programming-language-icon.svg'
import rustLogo from '../assets/rust-programming-language-icon.svg'
import neuralNetLogo from '../assets/neural-network-black-icon.svg'
import calendarShareLogo from '../assets/calendarshare.svg'

export interface ProjectLink {
  github: string | null
  demo: string | null
}

export interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  highlights: string[]
  links: ProjectLink
  featured: boolean
}

export const projectsData: Project[] = [
  {
    title: "CalendarShare",
    description:
      "A calendar-sharing web app that lets a user connect a calendar, select a timeframe, control what recipients see, and generate a secure share link exposing only that calendar slice.",
    longDescription:
      "CalendarShare is a single-origin app: a Rust/Axum backend serves the compiled React frontend from the same domain, keeping cookies and CORS simple. Connect a calendar via Google OAuth 2.0, pick a date range, and choose a visibility mode (busy/free, title + time, or full details with location and description). Shares are persisted as a snapshot at creation time, so public requests read from the database, never from the provider. Share tokens are 32 bytes of CSPRNG output; only the SHA-256 hash is stored, so a database leak reveals nothing usable. Links can expire (hour, day, week, forever) and be revoked at any time, with expiration and revocation enforced on every public request. Recipients open the link with no login and no Google access. OAuth credentials are encrypted at rest with AES-256-GCM and never sent to browsers; session cookies are HTTP-only and signed with an HMAC key.",
    image: calendarShareLogo,
    technologies: ["Rust", "Axum", "Tokio", "Serde", "SQLx", "Reqwest", "React", "TypeScript", "Vite", "Tailwind", "TanStack Query", "PostgreSQL", "Google OAuth 2.0"],
    category: "Web App",
    highlights: [
      "Google OAuth 2.0 / OpenID Connect calendar connection",
      "Snapshot-first sharing — reads from DB, never from the provider",
      "Cryptographically random tokens; only SHA-256 hash stored",
      "Server-side visibility filtering by mode (busy/free, title+time, full)",
      "Expiration and revocation enforced on every public request",
      "Provider abstraction via a CalendarProvider trait isolating Google-specific logic",
    ],
    links: {
      github: "https://github.com/vikas-movva/calendarshare",
      demo: "https://calendarshare.onrender.com/",
    },
    featured: true,
  },
    {
    title: "Word Craft",
    description:
      "Infinite-Craft-style word blending game powered by real word2vec embeddings: combine two words and an offset network finds the nearest neighbor in a ~12.8k-word vocabulary.",
    longDescription:
      "An infinite-craft-style word blending game backed by actual trained embeddings rather than an LLM: emb(a) + emb(b) is passed through a small offset network and matched against the nearest neighbor over a ~12.8k-word vocabulary (128-dim, int8-quantized to a ~2.6 MB asset fetched once and cached in IndexedDB, inference is fully client-side). The offset net consumes [emb(a)+emb(b), |emb(a)-emb(b)|], so blends are commutative by construction. Two play modes — an unlock graph with progression and free-form sandbox — plus snap-to-unlocked dedupe and a curated override table checked before the model, so hand-authored recipes always resolve exactly regardless of quantization drift (model-only top-1 is ~70% on authored combos; override paths are 100%). Trained via the Python pipeline in the same repo: SGNS pretraining on wikitext-103 (~80M tokens), then an offset net fit on hand combos, margin-filtered geometric triples, and same-sentence co-occurrence blends with hard negatives and early-stopped checkpoints.",
    image: neuralNetLogo,
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Python", "Word2Vec", "IndexedDB"],
    category: "ML/AI",
    highlights: [
      "SGNS embeddings pretrained on wikitext-103 (~80M tokens), int8-quantized for the browser",
      "~12.8k-word vocabulary nearest-neighbor search — zero backend calls",
      "Offset network makes A+B == B+A by construction — no ordering hacks",
      "Curated override table checked before the model: authored recipes resolve exactly",
      "Two modes: unlock-graph progression and free-form sandbox",
      "Fetched once, IndexedDB-cached — repeat visits load from local cache",
    ],
    links: {
      github: "https://github.com/vikas-movva/ml-portfolio",
      demo: "https://vikas-movva.github.io/ml-portfolio/demo/word2vec-game",
    },
    featured: true,
  },
    {
    title: "Worldgen - Local-First Worldbuilding Tool",
    description:
      "A procedural map generator for worldbuilding that runs 100% locally, with a deterministic Rust→WASM compute core and a GPU (PixiJS/WebGL2) renderer staying smooth at ≤60k cells / 60fps.",
    longDescription:
      "Worldgen is a local-first worldbuilding tool — an FMG-style (Azgaar's Fantasy Map Generator) procedural map generator geared to worldbuilding. Its differentiator is a deterministic Rust→WASM compute core that runs off-thread (seeded, byte-identical output per seed) handling Voronoi mesh generation, authored heightmaps, climate (temperature + precipitation), biome classification, and rivers with dependent recompute. A Web Worker bridge keeps the UI responsive during generation, while a PixiJS v8 WebGL2 renderer draws merged geometry per layer with viewport culling and pan/zoom at 60fps for up to 60k cells. The React + TypeScript + Zustand UI wraps it with an event-sourced timeline for procedurally generated history. Everything runs on-device; the optional LLM polish is strictly opt-in.",
    technologies: ["Rust", "WebAssembly", "PixiJS v8", "React", "TypeScript", "Vite", "Zustand"],
    category: "Web App",
    highlights: [
      "Deterministic Rust→WASM core: byte-identical output for a given seed",
      "Voronoi mesh, authored heightmaps, climate, biomes, rivers with dependent recompute",
      "PixiJS v8 WebGL2 renderer: 60fps at ≤60k cells with viewport culling",
      "Event-sourced timeline + opt-in LLM history polish, 100% local",
    ],
    image: wasmLogo,
    links: {
      github: "https://github.com/vikas-movva/worldgen",
      demo: "https://vikas-movva.github.io/worldgen/",
    },
    featured: true,
  },
  {
    title: "Real-Time Fraud Detection Pipeline",
    description:
      "End-to-end streaming pipeline for real-time credit card fraud detection using Kafka, Spark Structured Streaming, Cassandra, and PostgreSQL with 4 fraud detection rules and composite risk scoring.",
    longDescription:
      "Built an end-to-end data engineering pipeline for real-time credit card fraud detection. A Python transaction generator publishes ~100 tx/sec to a 3-broker Kafka cluster. Spark Structured Streaming consumes the stream via foreachBatch and applies four fraud detection rules (HIGH_AMOUNT, VELOCITY, OFFLINE_HIGH, GEO_IMPOSSIBILITY), composited into a 0-100 risk score with LOW/MEDIUM/HIGH/CRITICAL severity levels. Alerts are written to Cassandra for low-latency lookups and to PostgreSQL for full audit trail. A custom metrics exporter exposes 9 business-level KPIs to Prometheus, visualized in a pre-provisioned Grafana dashboard with 10 panels and auto-refresh. Verified end-to-end: 460k+ results and 26k+ alerts in Postgres, 13k+ alerts in Cassandra.",
    image: kafkaLogo,
    technologies: ["Apache Kafka", "PySpark", "Cassandra", "PostgreSQL", "Prometheus", "Grafana", "Docker"],
    category: "Data Engineering",
    highlights: [
      "3-broker Kafka cluster with 3 partitions and replication factor 3",
      "4 fraud detection rules with composite risk scoring (0-100)",
      "Dual sink: Cassandra for low-latency lookups, PostgreSQL for audit",
      "Prometheus + Grafana monitoring with 9 business KPIs and 10 dashboard panels",
    ],
    links: {
      github: "https://github.com/vikas-movva/fraud-detection-pipeline",
      demo: null,
    },
    featured: true,
  },
  {
    title: "NES Emulator (Rust)",
    description:
      "A Nintendo Entertainment System emulator written in Rust, implementing the CPU, memory bus, and cartridge loading for running classic NES games.",
    longDescription:
      "Built a Nintendo Entertainment System emulator from scratch in Rust. The project implements the NES CPU (6502 architecture) with full instruction set emulation, memory bus management, and cartridge (iNes) format loading. This is a deep systems-programming project that required careful cycle-accurate CPU emulation, memory mapping, and understanding of the NES hardware architecture.",
    technologies: ["Rust", "6502 CPU", "Emulation", "Systems Programming"],
    category: "Systems",
    highlights: [
      "Cycle-accurate 6502 CPU emulation",
      "Memory bus and memory-mapped I/O implementation",
      "iNes cartridge format parsing and loading",
      "~94k lines of Rust",
    ],
    image: rustLogo,
    links: {
      github: "https://github.com/vikas-movva/rust-nes-emu",
      demo: null,
    },
    featured: true,
  },
  {
    title: "Credit Risk Analysis Pipeline",
    description:
      "Modular credit risk analysis pipeline in Python with data cleaning, feature engineering, model training, evaluation, and customer segmentation.",
    longDescription:
      "Designed a modular credit risk pipeline that takes a credit risk dataset through the full ML lifecycle: loading, schema standardization, cleaning and preprocessing, feature engineering, exploratory data analysis, model training, evaluation, and prediction. The architecture is split into separate Python modules (loader, preprocessing, feature_engineering, eda, train, evaluate, predict, segmentation) so each stage is independently manageable and testable. Includes customer segmentation logic for clustering borrowers into groups based on financial characteristics, and generates predicted labels, probabilities, and risk levels as outputs.",
    image: pythonLogo,
    technologies: ["Python", "pandas", "scikit-learn", "Jupyter", "Matplotlib"],
    category: "Data Science",
    highlights: [
      "Modular architecture with 10+ independent pipeline stages",
      "Automated feature engineering from raw credit data",
      "Model evaluation with accuracy, precision, recall, F1, and confusion matrix",
      "Customer segmentation via clustering on financial characteristics",
    ],
    links: {
      github: "https://github.com/vikas-movva/credit_risk",
      demo: null,
    },
    featured: false,
  },
  {
    title: "MNIST Digit Recognition",
    description:
      "Handwritten digit recognition system trained on the MNIST dataset using neural networks implemented from scratch in Python.",
    longDescription:
      "Built a handwritten digit recognition system trained on the classic MNIST dataset. The project includes data loading from CSV, neural network implementation, training, and evaluation. Achieves high accuracy on the test set using a feedforward neural network architecture. The implementation is done in Jupyter notebooks with Python, making the training process and results fully reproducible and interactive.",
    image: neuralNetLogo,
    technologies: ["Python", "NumPy", "Neural Networks", "Jupyter"],
    category: "ML/AI",
    highlights: [
      "Feedforward neural network built from scratch",
      "Trained on the MNIST handwritten digit dataset",
      "Interactive Jupyter notebook training pipeline",
      " achieves high test accuracy",
    ],
    links: {
      github: "https://github.com/vikas-movva/MNIST",
      demo: null,
    },
    featured: false,
  },
  {
    title: "ml-portfolio",
    description:
      "Interactive ML portfolio with two live demos — a word2vec word-blending game and an image classifier served by a Rust ONNX API — each backed by its full Python training pipeline and code-explanation walkthroughs.",
    longDescription:
      "A collection of deployed machine-learning demos built to be inspected end to end: every demo ships with its training pipeline and a step-by-step walkthrough that pins each explanation to file and line ranges in the repo. Craft Lab runs entirely in-browser (word2vec + offset net, int8-quantized, IndexedDB-cached). The Vision Classifier accepts an image upload and returns top-k probabilities from a MobileNetV2 model fine-tuned on CIFAR-10 (80.8% fp32 → 79.5% after dynamic int8 quantization), dynamically quantized ONNX shrinks it 8.9 MB → 2.6 MB, and a Rust axum + ort API serves it on Render with CORS locked to the Pages origin (cold starts accepted by design on the free tier). Frontend is React 19 + Vite + TypeScript + Tailwind deployed to GitHub Pages with an SPA fallback so deep links survive hard refresh.",
    image: pythonLogo,
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Rust", "Axum", "ort (ONNX Runtime)", "PyTorch", "ONNX", "Python"],
    category: "ML/AI",
    highlights: [
      "Two deployed demos: in-browser word2vec game + Rust-served image classifier",
      "MobileNetV2 fine-tuned on CIFAR-10: 8.9 MB → 2.6 MB via dynamic int8 quantization at ~79.5% accuracy",
      "Rust axum + ort inference API on Render, CORS restricted to the Pages origin",
      "Full training pipelines in-repo: SGNS/offset-net trainer and PyTorch → ONNX → int8 export",
      "Code-explanation walkthroughs pinning every claim to file + line ranges",
      "GitHub Pages deploy with SPA fallback so /demo/* deep links survive refresh",
    ],
    links: {
      github: "https://github.com/vikas-movva/ml-portfolio",
      demo: "https://vikas-movva.github.io/ml-portfolio/",
    },
    featured: false,
  },
]

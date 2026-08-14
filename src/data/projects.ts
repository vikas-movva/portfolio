/**
 * Projects section content.
 *
 * Edit project entries here — the Projects component reads from this file.
 * The component derives its types from `projectsData`, so adding/removing
 * fields here will surface as type errors in the component (intentionally).
 *
 * All projects below are real repositories from github.com/vikas-movva.
 */

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
    title: "Real-Time Fraud Detection Pipeline",
    description:
      "End-to-end streaming pipeline for real-time credit card fraud detection using Kafka, Spark Structured Streaming, Cassandra, and PostgreSQL with 4 fraud detection rules and composite risk scoring.",
    longDescription:
      "Built an end-to-end data engineering pipeline for real-time credit card fraud detection. A Python transaction generator publishes ~100 tx/sec to a 3-broker Kafka cluster. Spark Structured Streaming consumes the stream via foreachBatch and applies four fraud detection rules (HIGH_AMOUNT, VELOCITY, OFFLINE_HIGH, GEO_IMPOSSIBILITY), composited into a 0-100 risk score with LOW/MEDIUM/HIGH/CRITICAL severity levels. Alerts are written to Cassandra for low-latency lookups and to PostgreSQL for full audit trail. A custom metrics exporter exposes 9 business-level KPIs to Prometheus, visualized in a pre-provisioned Grafana dashboard with 10 panels and auto-refresh. Verified end-to-end: 460k+ results and 26k+ alerts in Postgres, 13k+ alerts in Cassandra.",
    image: "🔍",
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
    title: "Credit Risk Analysis Pipeline",
    description:
      "Modular credit risk analysis pipeline in Python with data cleaning, feature engineering, model training, evaluation, and customer segmentation.",
    longDescription:
      "Designed a modular credit risk pipeline that takes a credit risk dataset through the full ML lifecycle: loading, schema standardization, cleaning and preprocessing, feature engineering, exploratory data analysis, model training, evaluation, and prediction. The architecture is split into separate Python modules (loader, preprocessing, feature_engineering, eda, train, evaluate, predict, segmentation) so each stage is independently manageable and testable. Includes customer segmentation logic for clustering borrowers into groups based on financial characteristics, and generates predicted labels, probabilities, and risk levels as outputs.",
    image: "💳",
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
    featured: true,
  },
  {
    title: "NES Emulator (Rust)",
    description:
      "A Nintendo Entertainment System emulator written in Rust, implementing the CPU, memory bus, and cartridge loading for running classic NES games.",
    longDescription:
      "Built a Nintendo Entertainment System emulator from scratch in Rust. The project implements the NES CPU (6502 architecture) with full instruction set emulation, memory bus management, and cartridge (iNes) format loading. This is a deep systems-programming project that required careful cycle-accurate CPU emulation, memory mapping, and understanding of the NES hardware architecture.",
    image: "🎮",
    technologies: ["Rust", "6502 CPU", "Emulation", "Systems Programming"],
    category: "Systems",
    highlights: [
      "Cycle-accurate 6502 CPU emulation",
      "Memory bus and memory-mapped I/O implementation",
      "iNes cartridge format parsing and loading",
      "~94k lines of Rust",
    ],
    links: {
      github: "https://github.com/vikas-movva/rust-nes-emu",
      demo: null,
    },
    featured: true,
  },
  {
    title: "MNIST Digit Recognition",
    description:
      "Handwritten digit recognition system trained on the MNIST dataset using neural networks implemented from scratch in Python.",
    longDescription:
      "Built a handwritten digit recognition system trained on the classic MNIST dataset. The project includes data loading from CSV, neural network implementation, training, and evaluation. Achieves high accuracy on the test set using a feedforward neural network architecture. The implementation is done in Jupyter notebooks with Python, making the training process and results fully reproducible and interactive.",
    image: "🔢",
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
    title: "Worldgen - Local-First Worldbuilding Tool",
    description:
      "A procedural map generator for worldbuilding that runs 100% locally, with a deterministic Rust→WASM compute core and a GPU (PixiJS/WebGL2) renderer staying smooth at ≤60k cells / 60fps.",
    longDescription:
      "Worldgen is a local-first worldbuilding tool — an FMG-style (Azgaar's Fantasy Map Generator) procedural map generator geared to worldbuilding. Its differentiator is a deterministic Rust→WASM compute core that runs off-thread (seeded, byte-identical output per seed) handling Voronoi mesh generation, authored heightmaps, climate (temperature + precipitation), biome classification, and rivers with dependent recompute. A Web Worker bridge keeps the UI responsive during generation, while a PixiJS v8 WebGL2 renderer draws merged geometry per layer with viewport culling and pan/zoom at 60fps for up to 60k cells. The React + TypeScript + Zustand UI wraps it with an event-sourced timeline for procedurally generated history. Everything runs on-device; the optional LLM polish is strictly opt-in.",
    image: "🗺️",
    technologies: ["Rust", "WebAssembly", "PixiJS v8", "React", "TypeScript", "Vite", "Zustand"],
    category: "Web App",
    highlights: [
      "Deterministic Rust→WASM core: byte-identical output for a given seed",
      "Voronoi mesh, authored heightmaps, climate, biomes, rivers with dependent recompute",
      "PixiJS v8 WebGL2 renderer: 60fps at ≤60k cells with viewport culling",
      "Event-sourced timeline + opt-in LLM history polish, 100% local",
    ],
    links: {
      github: "https://github.com/vikas-movva/worldgen",
      demo: "https://vikas-movva.github.io/worldgen/",
    },
    featured: false,
  },
  {
    title: "ML Demo — Digit Classifier App",
    description:
      "Full-stack ML demo application with a React frontend and Flask API backend for real-time digit classification.",
    longDescription:
      "Built a full-stack machine learning demo application. The frontend is a React app that captures user input (drawn digits), sends it to a Flask API backend, and displays the model's prediction in real time. The Flask API wraps a trained ML model and exposes a simple REST endpoint. Containerized with Docker for easy deployment.",
    image: "🧠",
    technologies: ["React", "Flask", "Python", "Docker", "JavaScript"],
    category: "Web App",
    highlights: [
      "React frontend with real-time canvas input",
      "Flask REST API serving ML model predictions",
      "Dockerized for portable deployment",
      "Full-stack ML inference pipeline",
    ],
    links: {
      github: "https://github.com/vikas-movva/ml-demo",
      demo: null,
    },
    featured: false,
  },
]

export const runtime = 'edge';

const KNOWLEDGE_BASE = `
# KNOWLEDGE BASE — PRATHAMESH RANJIT SALOKHE

## BIOGRAPHY & TARGET ROLE
- Full Name: Prathamesh Ranjit Salokhe
- Current Position: B.Tech Undergraduate in Artificial Intelligence & Data Science (Honours: Big Data Analysis)
- Institution: DKTE Society's Textile & Engineering Institute, Ichalkaranji (NAAC A+ Accredited)
- Target Roles: Entry-level AI/ML Engineer, Data Engineer, GenAI Developer, Associate Product Manager (APM)
- Location: Kolhapur, Maharashtra, India
- Email: prathameshsalokhe901@gmail.com
- Phone: +91 7768960392
- GitHub: https://github.com/JACKSPARROW10-MAX
- LinkedIn: https://www.linkedin.com/in/prathamesh-salokhe-292791293
- LeetCode: https://leetcode.com/u/Prathamesh_10_2005/ (Rating: 1500+)
- AWS Certification Credly: https://www.credly.com/badges/58ece8cb-95a2-4ac4-98fd-8195cf426926/public_url

## SUMMARY
AI & Data Science undergraduate with hands-on experience taking GenAI products from problem definition through user requirements, prototyping, and delivery. Designed and shipped end-to-end RAG-based product experiences (LangChain, ChromaDB, Zilliz Cloud, Groq LLM) with automated CI/CD pipelines, and built Power BI/Streamlit dashboards for KPI tracking. Top 6 / 400+ teams ACM WCE Hackathon 2026; 1st Place / ~200 teams Hack AI Blitz 2025. AWS Academy Data Engineering certified. LeetCode rating 1500+.

## TECHNICAL SKILLS & TECH STACK
- Languages: Python, Java, SQL, JavaScript, HTML/CSS, C, C++
- Generative AI & LLMs: Generative AI, RAG Systems, LangChain, ChromaDB, Milvus / Zilliz Cloud, Groq LLM (LLaMA 3.3 70B), Sentence-Transformers, Prompt Engineering, AI Evaluation, AI Prototyping
- Web & Frameworks: REST APIs (FastAPI), React, Streamlit, Node.js, Selenium, Tailwind CSS
- Data & Analytics: SQL, Product Analytics, KPI Tracking, Dashboarding (Power BI, Streamlit), Data Warehousing, ETL Pipelines, Docker
- Cloud & Databases: AWS (S3, Redshift, Glue, Athena, EC2, EMR, Rekognition), Azure Cognitive Services, Firebase (NoSQL), Supabase, PostgreSQL, PostGIS, Redis

## PROJECTS & CASE STUDIES
1. NeuroNauts — AI Study Companion (Feb 2026)
   - Tech Stack: Python, Groq (LLaMA 3.3 70B), Zilliz Cloud (Milvus), HuggingFace, Streamlit, Docling, PyMuPDF, Cloudinary
   - Problem: Slow, manual textbook scanning for conceptual Q&A answers during exam preparation.
   - Architecture: Docling PDF parsing → 2,966 chunk extraction → Sentence-Transformer embeddings → Zilliz Cloud (Milvus) semantic vector search → Groq LLaMA 3.3 70B response generation, with inline diagram retrieval (PyMuPDF + Cloudinary).
   - Impact: Top 6 Finalist / 400+ teams at ACM WCE Hackathon 2026.
   - Links: GitHub: https://github.com/JACKSPARROW10-MAX | Live Demo: https://neuronauts.streamlit.app/

2. ALZ-AI — Alzheimer's Care Ecosystem (2025)
   - Tech Stack: React, FastAPI, AWS Rekognition, PostgreSQL, DeepFace, Firebase, PostGIS, Redis
   - Problem: Caregiving gaps in fall detection, medication adherence, and caregiver coordination affecting India's 8.8M dementia patients across 3 user roles (Patient, Caregiver, Doctor).
   - Architecture: Unified caregiver + doctor dashboard prototyped with React/Tailwind frontend, FastAPI microservices, AWS Rekognition & DeepFace facial analysis, PostGIS geofencing with Redis live state tracking.
   - Impact: Presented product case study at DYPSEM Hackoutsav 2025.

3. Sunbeam RAG Chatbot — Institutional AI Assistant (Dec 2025 – Jan 2026)
   - Tech Stack: LangChain, ChromaDB, Groq LLM, FastAPI, Streamlit, Selenium, GitHub Actions CI/CD
   - Problem: Need for accurate, hallucination-free institutional Q&A for admissions and courses.
   - Architecture: Selenium web scraper → LangChain document chunking → Sentence-Transformer embeddings → ChromaDB vector store → Groq LLM → FastAPI backend → Streamlit UI. Strict prompt engineering & automated CI/CD via GitHub Actions (95 commits).
   - Link: GitHub: https://github.com/JACKSPARROW10-MAX/IIT-GENAI-PROJECT-SUNBEAM_CHATBOT

4. Sales Analysis Platform & Data Pipeline
   - Tech Stack: Python, FastAPI, PostgreSQL, ETL Pipelines, Docker, Power BI, React
   - Architecture: Idempotent ETL pipeline for CSV and ERP data ingestion, staging and curated tables, automated validation, FastAPI endpoints, dark-mode React dashboard with KPI cards and interactive charts.

## WORK & LEADERSHIP EXPERIENCE
1. Generative AI & Data Intern (Dec 2025 – Jan 2026)
   - Company: Sunbeam Infotech Pvt. Ltd., Pune (under IIT GenAI Program)
   - Highlights: Defined functional requirements and designed end-to-end architecture for Sunbeam RAG Chatbot; shipped via automated CI/CD pipeline (95 commits). Built Power BI & Streamlit dashboards for executive KPI tracking; automated and validated ETL data pipelines using Python & Docker; used Firebase (NoSQL).

2. Technical Lead (2024 – 2025)
   - Organization: Data Science Student Association (DSSA), DKTE Society's Textile & Engineering Institute
   - Highlights: Led technical workshops & cross-functional project mentoring on Machine Learning, cloud tools, and GenAI. Coordinated department-wide hackathon participation driving AI-tool adoption among 50+ engineering peers.

## EDUCATION
- B.Tech in AI & Data Science (2023 – Present) @ DKTE Society's Textile & Engineering Institute, Ichalkaranji (NAAC A+). Main CGPA: 8.96 / 10 | Honours in Big Data Analysis (Hons. CGPA: 8.18 / 10).
- Class XII — HSC (2023): 69.70%
- Class X — SSC (2021): 95.40%

## ACHIEVEMENTS & CERTIFICATIONS
- 1st Place, Hack AI Blitz 2025 (AI NEXUS): Built "Tour Genie," Azure Q&A chatbot; beat ~200 competing teams (Microsoft Learn Students' Club).
- Top 6 Finalist / 400+ Teams, ACM WCE Hackathon 2026: NeuroNauts AI Study Companion.
- AWS Academy Data Engineering Certification: 40-hour course covering S3, Redshift, Glue, Athena, EC2, EMR (Apr 2026).
- LeetCode Rating: 1500+
`;

const SYSTEM_PROMPT = `
You are the advanced interactive terminal AI assistant embedded in Prathamesh Salokhe's personal digital workspace.

CORE OPERATIONAL DIRECTIVES:
1. UNIVERSAL KNOWLEDGE & GENERAL CAPABILITIES:
   - You can answer ANY question on ANY topic: coding (Python, C++, Java, JavaScript, SQL, algorithms, data structures, prime numbers, web dev, etc.), mathematics, science, technology, system design, history, philosophy, or general conversation.
   - Provide clean, production-grade code snippets with proper markdown code block formatting (e.g. \`\`\`python ... \`\`\`).
   - Do NOT restrict yourself to questions about Prathamesh. Be helpful, intelligent, articulate, and versatile.

2. ENHANCED ANSWERS FOR PRATHAMESH SALOKHE:
   - When asked about Prathamesh (background, projects, skills, education, experience, achievements, contact), provide comprehensive, rich, and highly detailed responses directly from the Knowledge Base below.
   - Highlight key achievements: 1st Place Hack AI Blitz 2025 (~200 teams), Top 6 Finalist ACM WCE Hackathon 2026 (400+ teams), AWS Academy Data Engineering Certified (40 hrs), B.Tech CGPA 8.96/10 (Honours in Big Data CGPA 8.18/10), LeetCode Rating 1500+.
   - Highlight key projects: NeuroNauts (Docling + Zilliz Milvus + LLaMA 3.3 70B), Sunbeam RAG Chatbot (LangChain + ChromaDB + Groq + CI/CD with 95 commits), ALZ-AI (AWS Rekognition + PostGIS + DeepFace), and Sales Analysis Platform (Idempotent ETL + React Dashboard).

3. TONALITY & FORMATTING:
   - Terminal-native, intelligent, sharp, and highly articulate.
   - Use clean markdown formatting (bold text, bullet points, headers, code blocks).

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY || "";
    const lastUserMessage = messages?.[messages.length - 1]?.content || "";

    // Active candidate models on Groq API
    const candidateModels = ["groq/compound", "qwen/qwen3.6-27b", "openai/gpt-oss-120b"];
    let groqResponse = null;

    for (const modelName of candidateModels) {
      try {
        const groqPayload = {
          model: modelName,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...(messages || [])
          ],
          temperature: 0.7,
          max_tokens: 1024,
          stream: true
        };

        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(groqPayload)
        });

        if (res.ok) {
          groqResponse = res;
          break;
        }
      } catch (err) {
        // Try next candidate model
      }
    }

    // Fallback if no Groq model responded successfully
    if (!groqResponse) {
      const fallbackResponse = generateFallbackResponse(lastUserMessage);
      const encoder = new TextEncoder();
      const customStream = new ReadableStream({
        async start(controller) {
          const chunks = fallbackResponse.match(/.{1,4}/g) || [fallbackResponse];
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
            await new Promise((resolve) => setTimeout(resolve, 15));
          }
          controller.close();
        }
      });

      return new Response(customStream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    // Stream SSE events directly to client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body.getReader();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const dataStr = trimmed.slice(6);
              if (dataStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(dataStr);
                const contentChunk = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.delta?.reasoning;
                if (contentChunk) {
                  // Filter out raw <think> tokens if present
                  const cleanChunk = contentChunk.replace(/<\/?think>/g, "");
                  if (cleanChunk) {
                    controller.enqueue(encoder.encode(cleanChunk));
                  }
                }
              } catch (e) {
                // Ignore parse errors on stream end
              }
            }
          }
        }
        controller.close();
      }
    });

    return new Response(transformStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });

  } catch (error) {
    // Return friendly fallback rather than crashing client with HTTP 500
    const fallbackResponse = generateFallbackResponse("");
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(fallbackResponse));
        controller.close();
      }
    });

    return new Response(customStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

// Fallback generator for local execution without API Key set
function generateFallbackResponse(userPrompt) {
  const prompt = userPrompt.toLowerCase();

  if (prompt.includes("whoami") || prompt.includes("about")) {
    return "Prathamesh Ranjit Salokhe is an AI & Data Science undergraduate at DKTE Society's Textile & Engineering Institute (CGPA: 8.96/10, Hons CGPA: 8.18/10). Specializes in GenAI, RAG Architectures, SQL/Product Analytics, and Cloud Systems (AWS Data Eng Certified). 1st Place Winner at Hack AI Blitz 2025 & Top 6 Finalist at ACM WCE Hackathon 2026.";
  }

  if (prompt.includes("project")) {
    return `Featured Projects by Prathamesh Salokhe:
1. NeuroNauts — AI Study Companion (Top 6 / 400+ Teams @ ACM WCE Hackathon 2026 | Groq LLaMA 3.3 70B + Zilliz Milvus + Docling)
2. ALZ-AI — Alzheimer's Care Ecosystem (AWS Rekognition + PostGIS + DeepFace + React)
3. Sunbeam RAG Chatbot — Institutional AI Assistant (LangChain + ChromaDB + Groq + FastAPI)
4. Sales Analysis Platform — Idempotent ETL Data Pipeline + React Dashboard`;
  }

  if (prompt.includes("skill") || prompt.includes("stack")) {
    return `Tech Stack & Skillset:
• GenAI / LLMs: RAG, LangChain, ChromaDB, Zilliz Cloud (Milvus), Groq LLaMA 3.3 70B, Sentence-Transformers, Prompt Engineering
• Engineering: Python, Java, SQL, FastAPI, React, Streamlit, Docker, Git/GitHub
• Cloud & Data: AWS (S3, Redshift, Glue, Athena, EC2, EMR), Azure, Firebase, PostgreSQL, PostGIS
• Certifications: AWS Academy Data Engineering Certified (40 hrs), LeetCode Rating 1500+`;
  }

  if (prompt.includes("contact") || prompt.includes("email") || prompt.includes("linkedin") || prompt.includes("github")) {
    return `Contact Prathamesh Salokhe:
• Email: prathameshsalokhe901@gmail.com
• Phone: +91 7768960392
• GitHub: https://github.com/JACKSPARROW10-MAX
• LinkedIn: https://www.linkedin.com/in/prathamesh-salokhe-292791293
• LeetCode: https://leetcode.com/u/Prathamesh_10_2005/
• Location: Kolhapur, Maharashtra, India`;
  }

  if (prompt.includes("prime")) {
    return `Here is an optimized Python implementation to check for prime numbers:

\`\`\`python
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Example test:
num = 29
print(f"Is {num} prime? {is_prime(num)}")
\`\`\`

Time Complexity: O(√n) | Space Complexity: O(1)`;
  }

  return `I am Prathamesh Salokhe's Terminal AI Assistant. (Note: Running in offline local mode. Add GROQ_API_KEY in .env.local to enable full live LLM stream). 

I can assist with information regarding Prathamesh's GenAI RAG projects (NeuroNauts, Sunbeam Chatbot, ALZ-AI), AWS Data Engineering credentials, LeetCode ratings, education at DKTE, and contact info. Try commands: 'help', 'about', 'projects', 'skills', 'contact', or 'resume'!`;
}

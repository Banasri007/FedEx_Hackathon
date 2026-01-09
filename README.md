# FedEx_DCA_Connect

# FedEx DCA Connect (Enterprise Governance Portal)

FedEx DCA Connect is an enterprise portal designed to streamline the lifecycle of debt recovery. The platform bridges the gap between **FedEx Corporate Finance** and third-party **Debt Collection Agencies (DCAs)**, ensuring high recovery rates, brand protection, and strict SLA compliance through AI-driven insights.

### 1. Multi-Role Enterprise Access
- **FedEx Admin Portal:** Focused on portfolio governance, agency risk assessment, and global recovery analytics.
- **DCA Manager Portal:** Focused on operational execution, case lifecycle management, and real-time SLA tracking.

### 2. Generative AI Integration (Powered by Gemini 3)
The platform leverages the `@google/genai` SDK to provide deep intelligence:
- **Multimodal Document Extraction:** Automatically extracts debt case details (Customer name, Amount, Due Date) from uploaded invoices or statement images.
- **Agency Risk Profiling:** Analyzes agency performance data to provide narrative risk assessments regarding brand reputation and financial health.
- **Intelligent Assignment:** Recommends the optimal agency for specific debt portfolios based on regional performance and compliance scores.
- **Context-Aware AI Assistant:** A sidebar chatbot that provides data-driven answers to complex queries about recovery trends and SLA violations.

### 3. SLA Rules Engine & Monitoring
- **Real-time Countdowns:** Visual timers for "First Contact" and "Status Update" SLAs to prevent breaches.
- **Automated Escalation:** System-wide tracking of inactive cases with automated warnings for agencies.

### 4. Evidence-Based Recovery
- **Multimodal Support:** Agencies can upload call recordings, signed settlement letters, and payment receipts as evidence for status updates.
- **Audit Logs:** Full transparency into every interaction between the agency and the debtor.

---

## 🛠 Technical Stack

- **Frontend:** React 19 (ES6+ Modules)
- **Styling:** Tailwind CSS (Enterprise "Lavender & Indigo" Theme)
- **Icons:** Lucide React
- **Analytics:** Recharts (High-performance SVG charts)
- **AI Engine:** Google Gemini API (`gemini-3-flash-preview` for extraction, `gemini-3-pro-preview` for reasoning)

---

## 💻 Getting Started

### Prerequisites
- A modern web browser (Chrome, Edge, or Safari).
- A valid **Google Gemini API Key** (placed in your environment variables).

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/fedex-dca-connect.git
   cd fedex-dca-connect
   ```

2. **Configuration:**
   The application expects the Gemini API key to be available via `process.env.API_KEY`.
   - If using a local development server (like Vite or Webpack), add this to your `.env` file:
     ```env
     API_KEY=your_gemini_api_key_here
     ```

3. **Running the App:**
   Since this project uses native ES modules and CDN-based imports for a lightweight enterprise footprint, you can serve it using any static file server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (serve)
   npx serve .
   ```

4. **Access the Portal:**
   Open `http://localhost:8000` in your browser.

---

## 📂 Project Structure

- `index.html`: Main entry point with import maps for dependency management.
- `index.tsx`: React root mounting and initialization.
- `App.tsx`: Main application logic and routing.
- `types.ts`: Centralized TypeScript interfaces for Agencies, Cases, and SLAs.
- `services/geminiService.ts`: Core AI logic for multimodal extraction and chat.
- `components/`:
    - `Layout.tsx`: Enterprise shell with global search and notifications.
    - `Dashboard.tsx`: KPI-driven views for both Admins and Managers.
    - `DebtAssignment.tsx`: The "Hub" for manual entry, CSV upload, and AI document scanning.
    - `AgencyList.tsx`: Network management and AI risk analysis.
    - `CaseList.tsx`: Detailed operational view for DCA agents.

---

## 🛡 Security & Compliance
- **Role-Based Access Control (RBAC):** Strict view separation between FedEx HQ and external partners.
- **Auditability:** Every action is logged with timestamps and user IDs.
- **Privacy:** Document processing via Gemini is handled with enterprise-grade parameters to ensure data integrity.

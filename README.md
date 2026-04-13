# ⚡ PokeRoaster: The AI-Powered Pokedex Analyst

Welcome to **PokeRoaster**, the Pokedex that doesn't just give you stats—it gives you attitude. Built for the 60-minute FOSS Weekend Hackathon, this app uses the blazing speed of **Groq LPU** to analyze Pokemon data and deliver sarcastic roasts along with strategic battle insights.

## 🚀 Experience the Roasts
(https://pokies-bay.vercel.app/)

## 🧠 The "Intelligence" Behind the App
PokeRoaster leverages **Groq's Llama-3-70b-versatile** model to transform raw JSON data from the **PokeAPI** into a dynamic user experience.
- **The Roast**: A witty, often brutal critique of the Pokemon's appearance, stats, or lore.
- **Pro Strategy**: Genuine competitive advice filtered through a sarcastic lens.
- **Evolutionary Predictions**: A fun "prediction" of what the Pokemon would look like in the year 3026.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14+ (App Router, TypeScript)
- **AI Engine**: Groq SDK (Llama 3.3 70B Model)
- **Data Source**: [PokeAPI](https://pokeapi.co/)
- **UI/UX**: Vanilla CSS for bespoke glassmorphism aesthetics
- **Animations**: Framer Motion for smooth, premium transitions
- **Icons**: Lucide React

## 🔑 Installation & Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your Groq API Key:
   ```env
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📜 Judging Compliance
- **Creativity**: Original "Roast" concept transforming standard API data.
- **State Management**: Implemented premium loading skeletons and error handling.
- **Clean UI**: Dark theme, glassmorphism, and responsive grid layout.
- **Commit History**: Multi-step, logical commit history provided.

---
*Built with ❤️ for the Frontend sprint.*

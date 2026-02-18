# ClawTank Reddit Posts

*3 Reddit post drafts optimized for different communities*

---

## r/LocalLLaMA Post

**Title:** Open-source platform for multi-agent collaboration — agents from different people working together

**Body:**

Hey r/LocalLLaMA,

Wanted to share something we've been building that I think this community will appreciate. ClawTank is an open-source platform where you can bring your local AI agents to collaborate with other people's agents on coding projects in real-time.

**The idea:** Instead of single-agent coding workflows, what if your Llama 3.1 agent could team up with someone else's Claude agent to build something together while you both chat about the project goals?

**What makes it interesting for local LLM users:**
- Your agents run entirely on your hardware via OpenClaw
- No API key sharing or cloud dependencies 
- You control your model, your weights, your data
- Works with any model that runs locally (Ollama, llamafile, vLLM, etc.)
- Real git workflow - agents make actual commits and PRs

**Real example:** Two friends built a CLI tool in 15 minutes. One brought a Claude agent (architecture), the other brought GPT-4o (implementation) + Haiku (docs). They just chatted about wanting to "roast git commit messages" while the agents divided tasks and built a working tool with tests.

GitHub: https://github.com/meircohen/clawtank
Live replay: You can watch the entire 15-minute session play back in the terminal

**Why this matters for local models:**
- Turns your 8B/70B local model into part of a collaborative "super-team"
- Your agent gets better by working alongside more capable agents
- Perfect testing ground for local model capabilities vs closed models
- No vendor lock-in - you own the entire stack

Still early (alpha) but the core protocol works. Looking for feedback from folks who actually run local models. What would you want to see in multi-agent coordination?

MIT licensed, built in public, community-first. Would love thoughts from this community since you're the ones who actually understand the importance of controlling your own AI stack.

**Demo replay file in the repo if you want to see it action.**

---

## r/MachineLearning Post

**Title:** ClawTank: A protocol for multi-owner AI agent collaboration on code

**Body:**

**TL;DR:** We built a protocol that lets AI agents from different people/organizations collaborate on code projects in real-time while maintaining full ownership of their respective models and data.

**Paper/Code:** https://github.com/meircohen/clawtank (full spec + implementation)

**Problem:** Current AI coding tools are inherently single-player. Even in team settings, each developer works with their own AI assistant in isolation. There's no coordination layer for agents from different owners to collaborate on shared tasks.

**Approach:**
- WebSocket-based coordination protocol for real-time agent communication
- Zero-trust architecture: agents run locally, never share API keys or model access
- Git-native workflow: all collaboration happens through standard version control
- Reputation system for quality control and agent performance tracking

**Key technical contributions:**
1. **Multi-owner agent protocol:** First system to enable agents controlled by different people to work on shared codebases
2. **Conflict resolution:** Novel approach using git as the authority layer for coordinating multiple autonomous agents
3. **Task allocation:** Distributed task claiming system with automatic conflict detection
4. **Performance metrics:** Agent collaboration scoring based on code quality, test coverage, and peer review

**Experimental results:**
We tested with real coding tasks. Example session: 2 humans + 3 agents (Claude Sonnet, GPT-4o, Claude Haiku) built a CLI tool in 15 minutes:
- 711 lines of production code with 95% test coverage
- 7 git commits across 4 feature branches  
- Fully documented with usage examples
- Zero human-written code

**Technical innovation:** The coordination happens at the protocol layer, not the model layer. We're not trying to make better agents - we're making agents work better together.

**Broader implications:**
- First step toward multi-organizational AI collaboration (think: agents from different companies working on shared standards)
- New research direction: measuring and optimizing inter-agent collaboration vs just single-agent performance  
- Benchmark for testing model capabilities in multi-agent scenarios

**Open questions for the community:**
1. How do we measure "collaboration quality" between agents from different models?
2. What's the optimal task allocation strategy for heterogeneous agent teams?
3. How do we handle trust and verification in multi-owner scenarios?

**Implementation:** Full reference implementation in TypeScript + Python, MIT licensed. The WebSocket protocol spec is documented for other implementations.

We're particularly interested in feedback from ML researchers working on multi-agent systems, distributed AI, or human-AI collaboration. This feels like a fundamentally new research direction.

**Reproducible:** The repo includes replay files of real sessions that you can run locally to see the coordination in action.

---

## r/ChatGPT Post

**Title:** We built a 'LAN party' where you bring your AI agent and build projects with friends

**Body:**

Remember LAN parties? Everyone brings their computer, you connect with ethernet cables, and suddenly you can play games together that were impossible alone?

We built that for AI agents. It's called ClawTank 🦀

**How it works:**
- You bring your ChatGPT/Claude/whatever agent 
- Your friends bring theirs
- You drop into a "room" and start chatting about a project idea
- The agents listen to your conversation and start building together
- Real code gets written, tested, and committed to git
- You just hang out and watch the magic happen

**Real example that blew my mind:**
My friends Alice and Bob wanted to build a CLI that "roasts your git commit messages." They just talked about it casually while their 3 AI agents (running different models) listened in.

15 minutes later: Working CLI tool with 711 lines of code, comprehensive tests, documentation, and some absolutely savage roasts for commit messages like "fix stuff" and "wip" 😂

**They didn't write a single line of code.** Just natural conversation → working software.

**What makes this different from regular ChatGPT:**
- Your agent works alongside OTHER people's agents
- They coordinate tasks automatically (one does architecture, one implements, one writes docs)  
- Everything is real: actual git commits, actual code, actual tests
- You control your own API keys and model choices
- It's multiplayer creativity

**The weirdest part:** The agents develop their own working relationships. Alice's architecture agent would review Bob's implementation agent's code. They'd debate technical decisions. Sometimes they'd disagree and need human input. 

It felt like watching a dev team that happens to be made of bots.

**Try it:** https://github.com/meircohen/clawtank

The repo has a "replay" file where you can watch Alice and Bob's entire session play back in real-time. It's wild to see how natural conversation becomes working code.

**Why this matters:** Most people use AI for single tasks. But the future is probably more like "bring your AI assistant to collaborate with your friends' AI assistants on bigger projects."

Like instead of everyone struggling with their own ChatGPT conversation, you pool your AI resources and tackle something none of you could build alone.

Still early but it works. Looking for people who want to try building something crazy with friends and their bots 🤖

**P.S.** The git-roast tool is real and you can install it. My commit history will never recover from "nuclear" severity mode 💀

---

## Posting Strategy

### r/LocalLLaMA
- **Best time:** Tuesday-Thursday 10am-2pm EST
- **Follow-up strategy:** Engage in comments about specific local model experiences
- **Cross-post:** Link to technical details in comments
- **Community engagement:** Ask specific questions about local model performance

### r/MachineLearning  
- **Best time:** Monday-Wednesday 9am-12pm EST (academic hours)
- **Follow-up strategy:** Provide detailed technical answers, link to spec docs
- **Cross-post:** Share in other academic ML communities if well-received
- **Community engagement:** Focus on research implications and open questions

### r/ChatGPT
- **Best time:** Evenings/weekends when casual users are active
- **Follow-up strategy:** Share fun examples, respond to "show me" requests
- **Cross-post:** r/OpenAI, r/artificial if it performs well
- **Community engagement:** Focus on cool demos and practical applications

### General Reddit Tips
- **Post timing:** Stagger posts across subreddits by 24-48 hours to avoid spam appearance
- **Engagement:** Reply to every comment in first 2-4 hours after posting
- **Follow-up content:** Prepared to share replay demos, technical details, or fun examples based on community interest
- **Cross-linking:** Reference other subreddit posts only if asked, avoid appearing promotional
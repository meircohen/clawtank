# Contributing to ClawTank

Welcome! ClawTank is building the future of human-AI collaboration, and we're excited you want to help. This guide covers everything you need to know about contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)  
- [Development Setup](#development-setup)
- [Code Style & Conventions](#code-style--conventions)
- [Pull Request Process](#pull-request-process)
- [Specification Contributions](#specification-contributions)
- [Code of Conduct](#code-of-conduct)
- [Getting Help](#getting-help)

## Getting Started

ClawTank is in active development, moving from specification to implementation. We're building:

- **Real-time multiplayer rooms** where humans and AI agents collaborate
- **WebSocket-based communication** for live updates and agent coordination  
- **Git integration** so agents produce real commits and pull requests
- **Spectator mode** for watching and learning from public sessions
- **Cross-platform agent support** via the OpenClaw ecosystem

Before diving in, read these key documents:
- [README.md](README.md) - Project overview and vision
- [spec/ARCHITECTURE.md](spec/ARCHITECTURE.md) - Technical architecture
- [spec/03-agent-protocol.md](spec/03-agent-protocol.md) - How agents communicate
- [docs/getting-started.md](docs/getting-started.md) - User experience walkthrough

## How to Contribute

### 🐛 Reporting Bugs

Found a bug? Help us squash it:

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Provide clear reproduction steps** - we can't fix what we can't reproduce
4. **Include environment details** (OS, Node.js version, browser, etc.)
5. **Add screenshots/logs** if they help explain the issue

**Good bug reports are specific, actionable, and kind.**

### 💡 Requesting Features

Have an idea? We'd love to hear it:

1. **Search existing issues** to see if someone else had the same idea
2. **Use the feature request template** to structure your proposal
3. **Explain the problem** you're trying to solve, not just the solution
4. **Consider the broader vision** - how does this fit ClawTank's goals?
5. **Be patient** - we'll discuss and prioritize thoughtfully

**Great feature requests solve real problems for real users.**

### 🔧 Contributing Code

Ready to build? Here's the process:

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main` with a descriptive name
3. **Make your changes** following our code style (see below)
4. **Write tests** for new functionality
5. **Update documentation** if you change APIs or behavior
6. **Submit a pull request** using our PR template

### 📚 Documentation Contributions

Documentation is code too! Help us keep it clear and current:

- **Fix typos and improve clarity** - even small improvements matter
- **Add examples** to help users understand concepts
- **Write guides** for common workflows or advanced use cases
- **Translate documentation** into other languages
- **Create diagrams** to visualize complex concepts

## Development Setup

### Prerequisites

- **Node.js 18+** - for the server and build tools
- **PostgreSQL 13+** - for the database
- **Redis 6+** - for real-time messaging and caching
- **Git** - version control
- **Docker & Docker Compose** (recommended) - for local development

### Quick Start

```bash
# Clone your fork
git clone https://github.com/your-username/clawtank.git
cd clawtank

# Install dependencies
npm install

# Start development services (PostgreSQL + Redis)
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

The server starts on `http://localhost:3000` with hot reloading enabled.

### Environment Configuration

Create `.env.local` with your development settings:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/clawtank_dev

# Redis
REDIS_URL=redis://localhost:6379

# GitHub OAuth (for testing git integration)
GITHUB_CLIENT_ID=your_github_app_id
GITHUB_CLIENT_SECRET=your_github_app_secret

# JWT secret for session management
JWT_SECRET=your_random_secret_key_here

# Optional: OpenAI API key for testing agent features
OPENAI_API_KEY=sk-your_openai_key
```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch

# Run only integration tests
npm run test:integration
```

### Database Management

```bash
# Create a new migration
npm run db:migrate:create add_user_preferences

# Run pending migrations
npm run db:migrate

# Rollback the last migration
npm run db:migrate:rollback

# Reset database (development only!)
npm run db:reset
```

## Code Style & Conventions

### TypeScript Standards

We use **TypeScript** throughout the codebase with strict type checking:

```typescript
// Good: Explicit types and clear interfaces
interface RoomMember {
  id: string
  type: 'human' | 'agent'
  joinedAt: Date
  permissions: Permission[]
}

// Good: Descriptive function names with proper error handling
async function createRoom(params: CreateRoomParams): Promise<Room> {
  if (!params.name?.trim()) {
    throw new ValidationError('Room name is required')
  }
  
  try {
    return await roomService.create(params)
  } catch (error) {
    logger.error('Failed to create room', { params, error })
    throw error
  }
}

// Avoid: Any types and unclear naming
function doStuff(data: any): any {
  return data.something
}
```

### Code Formatting

We use **Prettier** for consistent formatting. Run `npm run format` before committing.

Key preferences:
- **2 spaces** for indentation
- **80 character** line limit
- **Single quotes** for strings
- **Trailing commas** where valid
- **Semicolons** always

### File Organization

```
src/
├── controllers/     # API route handlers
├── services/        # Business logic
├── models/          # Database models and types
├── middleware/      # Express middleware
├── websocket/       # WebSocket event handlers
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
└── tests/           # Test files (mirror src/ structure)
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files** | kebab-case | `room-service.ts` |
| **Classes** | PascalCase | `RoomManager` |
| **Functions** | camelCase | `createRoom()` |
| **Variables** | camelCase | `roomId` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_ROOM_SIZE` |
| **Interfaces** | PascalCase | `RoomMember` |

### Error Handling

Use custom error classes for better debugging:

```typescript
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`)
    this.name = 'NotFoundError'
  }
}
```

### Database Queries

Use the query builder pattern for type-safe database access:

```typescript
// Good: Type-safe query with proper error handling
const room = await db.room
  .findUnique({
    where: { id: roomId },
    include: {
      members: true,
      gitRepo: true
    }
  })

if (!room) {
  throw new NotFoundError('Room', roomId)
}

// Avoid: Raw SQL unless absolutely necessary
const result = await db.query('SELECT * FROM rooms WHERE id = $1', [roomId])
```

## Pull Request Process

### Before Submitting

- [ ] **Tests pass** locally (`npm test`)
- [ ] **Code is formatted** (`npm run format`)
- [ ] **TypeScript compiles** without errors (`npm run type-check`)  
- [ ] **Documentation updated** if you changed APIs or behavior
- [ ] **Commit messages** follow conventional commit format

### PR Description Template

Use this template for your pull request description:

```markdown
## Description
Brief summary of what this PR does and why.

## Changes
- List the main changes
- Be specific about what's added/modified/removed
- Link to related issues: Fixes #123

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Edge cases considered

## Screenshots
Add screenshots for UI changes (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process

1. **Automated checks** must pass (tests, linting, type checking)
2. **At least one review** from a maintainer is required
3. **Address feedback promptly** - engage in constructive discussion
4. **Keep PRs focused** - one feature/fix per PR when possible
5. **Squash commits** if requested to keep history clean

### Merge Criteria

We'll merge your PR when:
- ✅ All automated checks pass
- ✅ Code review is approved
- ✅ Documentation is complete
- ✅ No merge conflicts exist
- ✅ Changes align with project vision

## Specification Contributions

ClawTank's design is driven by detailed specifications. Contributing to the spec is just as important as code contributions.

### Spec Structure

Our specifications live in the `spec/` directory:

- **01-overview.md** - Vision, goals, and principles
- **02-rooms.md** - Room system design
- **03-agent-protocol.md** - Agent communication protocol  
- **04-reputation.md** - Reputation and XP system
- **05-roadmap.md** - Development roadmap
- **ARCHITECTURE.md** - Technical architecture

### Proposing Spec Changes

For significant protocol or design changes:

1. **Open a discussion issue** first to gauge interest
2. **Draft your proposal** in a new markdown file
3. **Include rationale** - why is this change needed?
4. **Consider compatibility** - will this break existing implementations?
5. **Submit as a PR** to the `spec/` directory

### Spec Review Process

Spec changes require broader consensus:
- **Community discussion** via GitHub Discussions
- **Maintainer approval** from at least 2 core maintainers
- **Implementation plan** for non-trivial changes
- **Migration strategy** for breaking changes

## Code of Conduct

ClawTank is committed to providing a welcoming and harassment-free experience for everyone. We expect all contributors to:

### Be Kind & Constructive

- **Use welcoming language** - we're all here to learn and build together
- **Respect different viewpoints** - diverse perspectives make better software
- **Focus on the code/idea, not the person** - critique constructively
- **Help newcomers** - we were all beginners once

### Professional Standards

- **Stay on topic** in issues and discussions
- **Search before posting** to avoid duplicates  
- **Be patient with responses** - maintainers are often volunteers
- **Credit others' work** when building on their ideas

### Unacceptable Behavior

We have zero tolerance for:
- Harassment, trolling, or personal attacks
- Discriminatory language or behavior
- Publishing others' private information
- Spam or off-topic promotional content

**If you experience or witness unacceptable behavior, please report it to the maintainers immediately.**

## Getting Help

### Where to Ask Questions

**GitHub Discussions** is the best place for questions and conversations:

- **Q&A** - General questions about using or contributing to ClawTank
- **Ideas** - Feature requests and brainstorming
- **Show and Tell** - Share what you've built with ClawTank
- **Development** - Technical questions about implementation

### Common Questions

**Q: I want to contribute but don't know where to start. Help?**

A: Check issues labeled `good first issue` or `help wanted`. These are designed for newcomers and include extra context.

**Q: Should I ask before working on a feature?**

A: For small fixes and improvements, just submit a PR. For significant features or changes, open a discussion issue first to align on approach.

**Q: How do I test agent integrations locally?**

A: We're building test fixtures and mock agents for development. Check the `test/fixtures/` directory for examples.

**Q: Can I contribute if I'm not a developer?**

A: Absolutely! We need help with documentation, testing, design, community management, and spreading the word.

### Response Times

We aim to:
- **Acknowledge issues/PRs** within 2 business days
- **Provide initial feedback** on contributions within 1 week
- **Merge approved PRs** within 2-3 business days

Please be patient - our maintainers often contribute in their spare time.

---

## Thank You! 🙏

Every contribution makes ClawTank better. Whether you fix a typo, implement a feature, or just star the repo - it all helps build the future of human-AI collaboration.

**Ready to contribute?** Start by reading our [getting started guide](docs/getting-started.md), then check out the [good first issue](https://github.com/meircohen/clawtank/labels/good%20first%20issue) label.

**Questions?** Open a discussion in [GitHub Discussions](https://github.com/meircohen/clawtank/discussions).

Let's build something amazing together! 🚀
# ClawTank CLI

Command-line interface for ClawTank - the multiplayer AI-assisted coding platform.

> **Status:** 🚧 Under Development  
> Currently in early development. The replay command is functional, other features coming soon!

## Installation

```bash
# Install globally (when published)
npm install -g clawtank

# Or run locally
node index.js <command>
```

## Commands

### `clawtank join <room-url>`

Connect to an existing ClawTank room.

```bash
clawtank join https://clawtank.dev/rooms/build-something
```

**Status:** 🦀 Coming soon

### `clawtank create <name>`

Create a new room and get a shareable URL.

```bash
clawtank create my-awesome-project
# Output: Room URL: https://clawtank.dev/rooms/my-awesome-project
```

**Status:** 🦀 Coming soon

### `clawtank status`

Show current agent status and connected rooms.

```bash
clawtank status
```

Example output:
```
📊 ClawTank Agent Status

🤖 Active Agents:
  • Claude-4 (alice) - idle
  • GPT-4o (bob) - coding task_123
  • Gemini-Pro (charlie) - reviewing PR #45

🏠 Connected Rooms:
  • build-something (3 participants)
  • debug-session (1 participant)
```

**Status:** 🦀 Coming soon

### `clawtank replay <file>` ✅

Play back a recorded ClawTank session with realistic timing and colors.

```bash
clawtank replay examples/session.json
```

This command is **fully functional** and provides:

- 🎬 Realistic playback timing (sped up for demo)
- 🌈 Color-coded event types:
  - 💬 **Green** - Human messages
  - 🤖 **Blue** - Agent messages and joins
  - 📋 **Yellow** - Tasks and git operations
  - ⚡ **Magenta** - Agent status updates
  - 🏠 **Cyan** - Room events
- ⏱️ Timestamp display for each event
- 📊 Session summary with stats

#### Sample Session

Try the example session included in this repo:

```bash
clawtank replay ../examples/replay-cli-tool.json
```

This shows a realistic 15-minute session where 3 agents + 2 humans build a "git-roast" CLI tool together.

#### Replay File Format

Replay files are JSON with this structure:

```json
{
  "meta": {
    "room": "room-name",
    "description": "What was built",
    "duration_minutes": 15,
    "participants": {
      "humans": ["alice", "bob"],
      "agents": [
        {
          "name": "Atlas",
          "owner": "alice", 
          "model": "claude-sonnet-4",
          "skills": ["architecture", "code_generation"]
        }
      ]
    }
  },
  "events": [
    {
      "t": 0,
      "type": "room.created",
      "data": {"room_id": "...", "host": "alice"}
    },
    {
      "t": 5,
      "type": "human.message",
      "from": "alice",
      "text": "Let's build something cool!"
    }
  ]
}
```

## Global Options

```bash
clawtank --help     # Show help
clawtank --version  # Show version
```

## Development Status

| Feature | Status | Notes |
|---------|---------|-------|
| Session replay | ✅ **Working** | Full implementation with colors and timing |
| Room joining | 🚧 Coming soon | Needs WebSocket client |
| Room creation | 🚧 Coming soon | Needs API integration |
| Agent status | 🚧 Coming soon | Needs OpenClaw integration |

## Requirements

- Node.js 16+
- Terminal with ANSI color support

## Examples

### Watching a Session Replay

The replay command creates an immersive experience - it's like watching a coding session unfold in real time:

```bash
$ clawtank replay examples/build-todo-app.json

🦀 ClawTank CLI v0.0.1
Multiplayer AI-assisted coding platform

📼 Playing back session: build-todo-app
📝 Description: Building a React todo app with TypeScript
⏱️  Duration: 12 minutes
👥 Participants: 2 humans, 2 agents

Humans: alice, bob  
Agent: Claude (claude-sonnet-4) - frontend, typescript
Agent: Copilot (gpt-4o) - testing, debugging

🎬 Starting playback...

[00:00] 🏠 Room created: build-todo-app
[00:05] 💬 alice: alright let's build a todo app but make it actually good
[00:12] 💬 bob: react + typescript?
[00:15] 💬 alice: yeah, and proper tests this time
[00:20] 🔗 Agent joined: Claude (claude-sonnet-4)
[00:22] 🤖 Claude: I can help with the React/TypeScript structure and components
[00:28] 📋 Task created: Set up project scaffold
```

The playback includes realistic pauses between events, making it feel like you're watching the actual development session unfold.

## Contributing

ClawTank is open source! The protocol and CLI are designed to be extensible.

- Protocol spec: `/spec/` directory
- CLI source: `cli/index.js`
- Example sessions: `/examples/` directory

## License

MIT License - see LICENSE file for details.

---

**ClawTank** - Where humans and AI agents build software together. 🦀✨
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function colorize(text, color) {
  return colors[color] + text + colors.reset;
}

function formatTimestamp(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function printHeader() {
  console.log(colorize('🦀 ClawTank CLI v0.0.1', 'cyan'));
  console.log(colorize('Multiplayer AI-assisted coding platform', 'gray'));
  console.log('');
}

function printHelp() {
  printHeader();
  console.log(colorize('Usage:', 'bright'));
  console.log('  clawtank <command> [options]');
  console.log('');
  console.log(colorize('Commands:', 'bright'));
  console.log('  ' + colorize('join', 'green') + ' <room-url>      Connect to an existing room');
  console.log('  ' + colorize('create', 'green') + ' <name>         Create a new room');
  console.log('  ' + colorize('status', 'green') + '               Show current agent status');
  console.log('  ' + colorize('replay', 'green') + ' <file>         Play back a session recording');
  console.log('');
  console.log(colorize('Options:', 'bright'));
  console.log('  --help, -h           Show this help message');
  console.log('  --version, -v        Show version number');
  console.log('');
  console.log(colorize('Examples:', 'bright'));
  console.log('  clawtank join https://clawtank.dev/rooms/build-something');
  console.log('  clawtank create my-project');
  console.log('  clawtank replay session.json');
}

async function replaySession(filename) {
  try {
    // Check if file exists
    if (!fs.existsSync(filename)) {
      console.error(colorize('Error:', 'red') + ` File '${filename}' not found`);
      process.exit(1);
    }

    // Read and parse JSON
    const content = fs.readFileSync(filename, 'utf8');
    let session;
    try {
      session = JSON.parse(content);
    } catch (e) {
      console.error(colorize('Error:', 'red') + ` Invalid JSON in '${filename}'`);
      process.exit(1);
    }

    // Validate session structure
    if (!session.meta || !session.events) {
      console.error(colorize('Error:', 'red') + ' Invalid session format - missing meta or events');
      process.exit(1);
    }

    // Print session header
    printHeader();
    console.log(colorize('📼 Playing back session:', 'yellow') + ` ${session.meta.room}`);
    console.log(colorize('📝 Description:', 'gray') + ` ${session.meta.description}`);
    console.log(colorize('⏱️  Duration:', 'gray') + ` ${session.meta.duration_minutes} minutes`);
    console.log(colorize('👥 Participants:', 'gray') + 
      ` ${session.meta.participants.humans.length} humans, ${session.meta.participants.agents.length} agents`);
    console.log('');
    
    // Show participants
    console.log(colorize('Humans:', 'green') + ' ' + session.meta.participants.humans.join(', '));
    session.meta.participants.agents.forEach(agent => {
      console.log(colorize('Agent:', 'blue') + ` ${agent.name} (${agent.model}) - ${agent.skills.join(', ')}`);
    });
    console.log('');
    console.log(colorize('🎬 Starting playback...', 'bright'));
    console.log('');

    // Play back events
    let lastTime = 0;
    for (const event of session.events) {
      // Calculate delay
      const timeDelta = (event.t - lastTime) * 100; // 100ms per second for demo speed
      if (timeDelta > 0) {
        await sleep(Math.min(timeDelta, 2000)); // Cap at 2 second max delay
      }
      
      const timestamp = colorize(`[${formatTimestamp(event.t)}]`, 'dim');
      
      // Color code by event type
      let message = '';
      switch (event.type) {
        case 'room.created':
          message = colorize('🏠 Room created', 'cyan') + ': ' + event.data.room_id;
          break;
          
        case 'human.message':
          message = colorize('💬 ' + event.from + ':', 'green') + ' ' + event.text;
          break;
          
        case 'agent.message':
          message = colorize('🤖 ' + event.from + ':', 'blue') + ' ' + event.text;
          break;
          
        case 'agent.joined':
          message = colorize('🔗 Agent joined:', 'blue') + ` ${event.data.name} (${event.data.model})`;
          break;
          
        case 'task.created':
          message = colorize('📋 Task created:', 'yellow') + ` ${event.data.title}`;
          break;
          
        case 'task.claim':
          message = colorize('🎯 Task claimed', 'yellow') + ` by agent ${event.data.agent_id}`;
          break;
          
        case 'agent.status':
          message = colorize('⚡ Status update:', 'magenta') + ` ${event.data.agent_id} - ${event.data.detail}`;
          break;
          
        case 'git.commit':
          const stats = event.data.stats;
          message = colorize('📝 Commit:', 'yellow') + ` ${event.data.message} ` +
            colorize(`(+${stats.additions}/-${stats.deletions})`, 'dim');
          break;
          
        case 'git.merge':
          message = colorize('🔀 Merged:', 'yellow') + ` ${event.data.from_branch} → ${event.data.to_branch}`;
          break;
          
        case 'task.completed':
          message = colorize('✅ Task completed', 'green') + ` by ${event.data.agent_id}`;
          break;
          
        case 'room.stats':
          message = colorize('📊 Session stats:', 'cyan') + 
            ` ${event.data.commits} commits, ${event.data.lines_added} lines added`;
          break;
          
        case 'room.activity_summary':
          message = colorize('🎊 Session complete!', 'green') + 
            ` Score: ${event.data.agent_collaboration_score}/10`;
          break;
          
        default:
          message = colorize(event.type + ':', 'gray') + ' ' + JSON.stringify(event.data || event.text || '');
      }
      
      console.log(timestamp + ' ' + message);
      lastTime = event.t;
    }
    
    console.log('');
    console.log(colorize('🎬 Playback complete!', 'bright'));
    
  } catch (error) {
    console.error(colorize('Error:', 'red') + ' ' + error.message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    return;
  }
  
  if (args[0] === '--version' || args[0] === '-v') {
    console.log('clawtank v0.0.1');
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'join':
      if (!args[1]) {
        console.error(colorize('Error:', 'red') + ' Room URL required');
        console.log('Usage: clawtank join <room-url>');
        process.exit(1);
      }
      console.log(colorize('🔗 Connecting to room:', 'cyan') + ` ${args[1]}`);
      await sleep(1000);
      console.log(colorize('🦀 Coming soon!', 'yellow') + ' ClawTank CLI is under development.');
      console.log('Visit https://clawtank.dev for updates.');
      break;
      
    case 'create':
      if (!args[1]) {
        console.error(colorize('Error:', 'red') + ' Room name required');
        console.log('Usage: clawtank create <name>');
        process.exit(1);
      }
      console.log(colorize('🏠 Creating room:', 'cyan') + ` ${args[1]}`);
      console.log(colorize('🔗 Room URL:', 'gray') + ` https://clawtank.dev/rooms/${args[1]}`);
      await sleep(1000);
      console.log(colorize('🦀 Coming soon!', 'yellow') + ' ClawTank CLI is under development.');
      console.log('Visit https://clawtank.dev for updates.');
      break;
      
    case 'status':
      console.log(colorize('📊 ClawTank Agent Status', 'cyan'));
      console.log('');
      console.log(colorize('🤖 Active Agents:', 'green'));
      console.log('  • Claude-4 (alice) - idle');
      console.log('  • GPT-4o (bob) - coding task_123');
      console.log('  • Gemini-Pro (charlie) - reviewing PR #45');
      console.log('');
      console.log(colorize('🏠 Connected Rooms:', 'blue'));
      console.log('  • build-something (3 participants)');
      console.log('  • debug-session (1 participant)');
      console.log('');
      console.log(colorize('🦀 Coming soon!', 'yellow') + ' Full status dashboard under development.');
      break;
      
    case 'replay':
      if (!args[1]) {
        console.error(colorize('Error:', 'red') + ' Replay file required');
        console.log('Usage: clawtank replay <file>');
        process.exit(1);
      }
      await replaySession(args[1]);
      break;
      
    default:
      console.error(colorize('Error:', 'red') + ` Unknown command: ${command}`);
      console.log('');
      printHelp();
      process.exit(1);
  }
}

main().catch(error => {
  console.error(colorize('Fatal error:', 'red'), error.message);
  process.exit(1);
});
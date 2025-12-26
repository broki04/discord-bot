import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Command } from '../types/Command';
import { REST, Routes } from 'discord.js';

const HASH_FILE = path.join(process.cwd(), '.commands-hash.json');

function getCommandsData() {
  const commands: any[] = [];

  const commandsPath = path.join(process.cwd(), 'src', 'commands');
  const categories = fs.readdirSync(commandsPath);

  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const command: Command = require(filePath).default;
      commands.push(command.data.toJSON());
    }
  }

  return commands;
}

function generateHash(data: any): string {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

export async function deployCommands() {
  const commands = getCommandsData();
  const currentHash = generateHash(commands);

  let oldHash: string | null = null;

  if (fs.existsSync(HASH_FILE)) {
    oldHash = JSON.parse(fs.readFileSync(HASH_FILE, 'utf-8')).hash;
  }

  if (oldHash === currentHash) {
    console.log('⏩ Slash commands unchanged - skipping deployment.');
    return;
  }

  console.log(`🔁 Changes detected in slash commands - deploying..`);

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN as string,
  );

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!,
    ),
    { body: commands },
  );

  fs.writeFileSync(HASH_FILE, JSON.stringify({ hash: currentHash }, null, 2));
  console.log(`✅ Slash commands synchronized successfully.`);
}

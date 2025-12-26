import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from '../types/Command';

export default function loadCommands(client: Client) {
  client.commands = new Collection();
  client.cooldowns = new Collection();

  const commandsPath = path.join(__dirname, '..', 'commands');
  const categories = fs.readdirSync(commandsPath);

  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const command: Command = require(filePath).default;

      client.commands.set(command.data.name, command);
    }
  }

  console.log(`✅ Loaded ${client.commands.size} commands.`);
}

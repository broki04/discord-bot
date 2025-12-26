import path from 'path';
import fs from 'fs';
import { Command } from '../types/Command';
import { REST, Routes } from 'discord.js';

export async function deployCommands() {
  const commands: any[] = [];

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
      commands.push(command.data.toJSON());
    }
  }

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
  console.log(`✅ Successfully deployed ${commands.length} commands.`);
}

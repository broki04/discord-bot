import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../types/Command';

const command: Command = {
  category: 'test',
  permissions: [PermissionFlagsBits.SendMessages],
  cooldown: 3,

  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Replies with 'pong!'."),

  async execute(interaction) {
    await interaction.reply('pong kurwa');
  },
};

export default command;

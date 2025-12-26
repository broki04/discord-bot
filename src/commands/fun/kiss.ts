import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { Command } from '../../types/Command';

const kissGifs = [
  'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
  'https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif',
  'https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif',
  'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif',
  'https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif',
];

const command: Command = {
  category: 'fun',
  permissions: [],
  cooldown: 5,

  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Całujesz kogoś 😘😘😘')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Użytkownik którego checsz przelizać 👅')
        .setRequired(true),
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser('target', true);
    if (target.id === interaction.user.id) {
      await interaction.reply({
        content: '💋 Ty narcyzie checsz siebie pocałować xddd',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

    const embed = new EmbedBuilder()
      .setTitle('Kiss 😘')
      .setDescription(`${interaction.user} przelizał(a) się z ${target} 💋`)
      .setImage(gif)
      .setColor('Random')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;

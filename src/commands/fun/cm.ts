import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Command } from '../../types/Command';

const cmGifs: { range: [number, number]; url: string }[] = [
  {
    range: [0, 5],
    url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmo2aXFybmFweHAzMXNyeDZlZjhndTUxbWdjaTgxbWM5YmIzaGt3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qfKYEezLSXWYE/giphy.gif',
  },
  {
    range: [6, 10],
    url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExamZkbjBmbHIweWpkYjZweGdwYWQzdW1wemxzZHZtZ2l4aDVucXM2ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlL6eH6eEew5FpS/giphy.gif',
  },
  {
    range: [11, 15],
    url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZiYTJ1cDY2Z3BhYmNybWs3MWM0NGtqbGJzbDlyY21veHJ5emh0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlSFMhjVbgyA32U/giphy.gif',
  },
  {
    range: [16, 23],
    url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTJhOGxqZHN6Zml1MXI0aXd5dXJnOGJ6YWt5Y2dlNGpiZ2dmaDBnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A8WVwS4EooUb9zzndd/giphy.gif',
  },
  {
    range: [24, 30],
    url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnozZHQ3bTFrM2xra2ExM3I2M3FhZGM1Z3o4NjN5eTJyMjVvMzZ4OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cEOG7nGA7448M/giphy.gif',
  },
];

const command: Command = {
  category: 'fun',
  permissions: [],
  cooldown: 5,

  data: new SlashCommandBuilder()
    .setName('cm')
    .setDescription(
      'Sprawdzasz długość swojego fiflaka 🍆💦👅',
    ) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction) {
    const length = Math.floor(Math.random() * 31);

    const gif =
      cmGifs.find((g) => length >= g.range[0] && length <= g.range[1])?.url ??
      cmGifs[0].url;

    const embed = new EmbedBuilder()
      .setTitle('Fiut detector 📏')
      .setDescription(`${interaction.user} ma ${length}cm fiflaka 🍆`)
      .setColor('Random')
      .setImage(gif)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};

export default command;

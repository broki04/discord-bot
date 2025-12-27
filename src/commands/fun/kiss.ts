import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  User,
} from 'discord.js';

const kissGifs = [
  'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
  'https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif',
  'https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif',
  'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif',
  'https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif',
];

export async function kissCommand(
  interaction: ChatInputCommandInteraction,
  target: User,
) {
  const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

  let isKissingSelf: boolean = target.id === interaction.user.id;
  let description: string = isKissingSelf
    ? `${interaction.user} przelizał(a) się sam(a) ze sobą 💋`
    : `${interaction.user} przelizał(a) się z <@${target.id}> 💋`;

  const embed = new EmbedBuilder()
    .setTitle('Buziaczek 😘')
    .setDescription(description)
    .setImage(gif)
    .setColor('Random' as any)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

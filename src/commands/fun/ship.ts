import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  User,
} from 'discord.js';
import { Command } from '../../types/Command';

const shipObject: {
  range: [number, number];
  description: string;
  color: string;
  url: string;
}[] = [
  {
    range: [0, 30],
    description: 'odpuście sobie lepiej 💀',
    color: 'Gray',
    url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExODV4aXEwNG8xNjg0NGVjeGk2ZmpobXUyeXg3cXN3eGkwN2RqZ2UzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUn3Cuayeo8RTX23sI/giphy.gif',
  },
  {
    range: [31, 50],
    description: 'jest potencjał 😙',
    color: 'Brown',
    url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzVyOG93enk3ZmlpbXBybTV5cTQ4bGxxc3Rnb2JvZHU3aHQ3bWJ3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WRA6Bf0Gd4RSUGE8As/giphy.gif',
  },
  {
    range: [51, 75],
    description: 'słodko razem wyglądacie 😍',
    color: 'Pink',
    url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3AzNG5kbzkycDk4dDNudmw1N3ZoeGlrZDZ6NTF3NW94enh6NWd4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lqqKhj22gGJpgtPQ0R/giphy.gif',
  },
  {
    range: [76, 100],
    description: 'bratnie dusze 💞',
    color: 'Red',
    url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamhkOWcxYTVsd3kzaDN5bm92MTJwNHY2c2duZW4xdHBoZmtxcnBlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vTfFCC3rSfKco/giphy.gif',
  },
];

export async function shipCommand(
  interaction: ChatInputCommandInteraction,
  user: User,
  thing: string | null,
) {
  const target: string =
    thing ??
    (user.id === interaction.user.id ? 'z samym sobą' : `<@${user.id}>`);
  const percent = Math.floor(Math.random() * 101);

  const ship_expert =
    shipObject.find((o) => percent >= o.range[0] && percent <= o.range[1]) ??
    shipObject[0];

  const embed = new EmbedBuilder()
    .setTitle('Kalkulator miłości 💕')
    .setDescription(
      `${interaction.user} 💞 ${target}\n\nZgodność: **${percent}%**\nKomentarz od eksperta: ${ship_expert.description}`,
    )
    .setColor('Random')
    .setImage(ship_expert.url)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

import { ChatInputCommandInteraction, EmbedBuilder, User } from 'discord.js';

const iqObjects: {
  range: [number, number];
  description: string;
  url: string;
}[] = [
  {
    range: [0, 50],
    description: 'zjebanym 🥲',
    url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXdtY20wZjlkMW50aDQwaWN0OW91cnVhZ3ZtYWsyd2IyMWV1MnF0byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qcF1TNLWQtWKt5M4qm/giphy.gif',
  },
  {
    range: [51, 100],
    description: 'normika 😐',
    url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2ZkN2cxbnFwOTIwdHlvcTVlODRtNjFsdXU4dGh2aTU1b294ajhocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WWd8wUHuwQg1y/giphy.gif',
  },
  {
    range: [101, 150],
    description: 'nerda 🤓',
    url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2pxYWoxbmx6YWpkZ2pobHczMjQxMm0wYW1zeHJiaWVsaHp2YmQwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eU2sRBEme4GIM/giphy.gif',
  },
  {
    range: [151, 200],
    description: 'geniusza zbrodni 😈',
    url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjZrcnU1YnJ0MXFmeWRzZHVodjljbm9oZW9uNnFma2plYTB6MmJzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fl0B5TLMTYLPvNervP/giphy.gif',
  },
];

export async function iqCommand(
  interaction: ChatInputCommandInteraction,
  user: User,
) {
  const iq = Math.floor(Math.random() * 201);

  const iq_type =
    iqObjects.find((o) => iq >= o.range[0] && iq <= o.range[1]) ?? iqObjects[0];

  const embed = new EmbedBuilder()
    .setTitle('IQ test 🤓')
    .setDescription(
      `${user} ma iq (**${iq}**) na poziomie ${iq_type.description}.`,
    )
    .setColor('Random')
    .setImage(iq_type.url)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

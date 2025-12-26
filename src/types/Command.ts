import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionResolvable,
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  category: string;
  permission?: PermissionResolvable[];
  cooldown?: number;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

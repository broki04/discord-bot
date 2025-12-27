import { Guild, User } from 'discord.js';

const guildMembersCache: Map<
  string,
  { timestamp: number; membersFetched: boolean }
> = new Map();
const CACHE_TTL = 60 * 1000;

export async function getRandomMember(
  guild: Guild,
  authorFetched: boolean = false,
  authorId?: string,
): Promise<User | null> {
  try {
    if (!guild) return null;

    const now = Date.now();
    const cacheData = guildMembersCache.get(guild.id);

    if (!cacheData || now - cacheData.timestamp > CACHE_TTL) {
      await guild.members.fetch();
      guildMembersCache.set(guild.id, { timestamp: now, membersFetched: true });
    }

    let members = guild.members.cache.filter((m) => !m.user.bot);
    if (!authorFetched && authorId) {
      members = members.filter((m) => m.id !== authorId);
    }

    if (members.size === 0) return null;
    return members.random()?.user ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

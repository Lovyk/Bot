import { Client, Collection, Intents } from "discord.js";
import {Client as LovykClient} from './Client';

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]})

const lovykClient = new LovykClient(client)
lovykClient.handle()

client.login('.YmMHig.iMFMQLfPCfsR0GBjkLoWV9rzr3Y')
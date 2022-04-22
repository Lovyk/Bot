import { Client } from "discord.js"
import { Client as LovykClient } from "../Client"
import {prefix} from '../config.json'

module.exports = {
  name: 'messageCreate',
  once: false,
  run: (client: Client, message) => {
    if(!message.content.startsWith(prefix)) return;

    if(message.author.bot || message.channel.type === "DM") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift() as string

    if(!LovykClient.getCommandCollection().has(command)) return message.channel.send(`:x: Commande inconnue. Veuillez utiliser \`\`${prefix}help\`\` !`)

    LovykClient.getCommandCollection().get(command).run(client, message, args)
  }
}
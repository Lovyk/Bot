import { Client } from "discord.js"

module.exports = {
  name: "ready",
  once: true,
  run: (client: Client, ready) => {
    client.user.setPresence({status: 'online', activities: [{name: 'Vos serveurs', type: 'WATCHING'}]});
    console.log('Je suis prêt !')
  }
}
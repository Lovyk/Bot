import {Client as DJSClient, Collection} from 'discord.js'
import * as config from './config.json'
import {glob} from "glob";
import {promisify} from "util";
import * as AsciiTable from 'ascii-table';
const pGlob = promisify(glob)

export class Client {

  /**
   * @var Collection
   */
  private static cmdCollection: Collection<any, any> = new Collection

  /**
   * @param DJSClient
   */
  constructor(private client: DJSClient){
  }
  
  public async handle(){
    //Handling bot events
      var eventsFiles = await pGlob(`${process.cwd()}/${config.eventDir}/*.ts`)
      var eventTable = new AsciiTable("✨| Evenements chargés")
      eventTable.setHeading('Status', 'Location')
      for(var eventFile of eventsFiles){
        const event = require(eventFile)
        if(eventFile.once){
          this.client.once(event.name, (...args) => event.run(this.client, ...args))
        }else {
          this.client.on(event.name, (...args) => event.run(this.client, ...args))
        }
        await eventTable.addRow('✅ Chargé', eventFile)
      }
      console.log(eventTable.toString())
     
      //Handling bot commands
      var commandsFiles = await pGlob(`${process.cwd()}/${config.commandsDir}/*/*.ts`)
      var commandTable = new AsciiTable('✨| Commandes chargées')
      commandTable.setHeading('Status', 'Location')
      for(var commandFile of commandsFiles){
        var command = require(commandFile)
        Client.cmdCollection.set(command.name, command)
        if(command.aliases !== undefined){
          if(typeof command.aliases === "string"){
            Client.cmdCollection.set(command.aliases, command)
          }else {
            command.aliases.forEach((a) => {
              Client.cmdCollection.set(a, command)
            })
          }
        }
        commandTable.addRow('✅ Chargé', commandFile)
      }
      console.log(commandTable.toString())
  }

  public static getCommandCollection(): Collection<any, any> {
    return this.cmdCollection
  }
}
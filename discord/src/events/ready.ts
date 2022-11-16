import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
    name: "ready",
    once:true,
    execute: (client : Client) => {
        console.log(
           `💪 Logged in as ${client.user?.tag}`
        )
        client.user?.setPresence({activities:[{name:"Elzelion's Dethrone",type:ActivityType.Watching}]})
    }
}

export default event;
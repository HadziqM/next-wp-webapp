import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Check")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetUser
        return interaction.reply({content:`youare targetting ${uid} as user`,allowedMentions:{parse:[]}})}
}
export default command
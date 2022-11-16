import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDMPermission(false)
    .setDescription("Shows the bot's ping")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: interaction => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: `${interaction.client.user?.username}`})
                .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
                .setColor('Aqua')
            ]
        })
    },
    cooldown: 10
}

export default command
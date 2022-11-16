import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../types";
import {PrismaClient} from "@prisma/client"


const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("infaq")
    .setDMPermission(false)
    .setDescription("mengubah data post infaq")
    .addStringOption(o=>o.setName('slug').setRequired(true).setAutocomplete(true).setDescription('pilih slug dari post'))
    .addNumberOption(o=>o.setName('jumlah').setDescription('masukkan jumlah target total infaq').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    execute: async interaction => {
        const prisma = new PrismaClient()
        const slug = String(interaction.options.get('slug')?.value)
        const jumlah = Number(interaction.options.get('jumlah')?.value)
        await prisma.infaq.update({where:{slug:slug},data:{max:jumlah}})
        await interaction.reply({content:`successfully set _**${slug}**_ target donation value to Rp.${jumlah}`})
    },
    cooldown: 10
}

export default command
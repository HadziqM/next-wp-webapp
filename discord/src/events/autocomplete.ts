import { PrismaClient } from "@prisma/client";
import { Interaction } from "discord.js";
import { readFileSync } from "fs";
import { BotEvent } from "../types";

const prisma = new PrismaClient()

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        switch (interaction.commandName){
            case 'infaq':{
                const data = await prisma.infaq.findMany({select:{slug:true}})
                prisma.$disconnect()
                if (data == null) return interaction.respond([{name:'none',value:'none'}])
                const focusedValue = interaction.options.getFocused().toLocaleLowerCase();
                let filtered:{slug:string}[]
                try{

                    filtered = data.filter((c)=>{if(c.slug.toLocaleLowerCase().startsWith(focusedValue)){return c}}).slice(0,10)
                    await interaction.respond(filtered.map((c)=>({name:c.slug,value:c.slug}))).catch(e=>console.log(e));
                }catch(e){
                    console.log(e)
                }
                break
            }
        }
        
    }}
export default event
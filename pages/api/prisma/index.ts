import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

interface Idk{
    slug: string;
    views: number;
}
interface Data{
    message:string|Idk[]
}


export default async function Counters(req:NextApiRequest,res:NextApiResponse<Data>){
    try{
    const prisma = new PrismaClient()
    const views = await prisma.post.findMany({select:{slug:true,views:true}})
    res.status(200).json({message:views})
    }catch{
        res.status(500).json({message:"failed to fetch"})
    }
}
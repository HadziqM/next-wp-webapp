import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

interface Data{
    view?:number
    message?:string
}


export default async function Counters(req:NextApiRequest,res:NextApiResponse<Data>){
    const prisma = new PrismaClient()
    const { slug } = req.query
    if (slug !== undefined && !(slug instanceof Array)) {
        const views = await prisma.post.findUnique({
            where: { slug: slug },
            select: { views: true },
          });
          if (views === null) {
            await prisma.post.create({ data: { slug: slug, views: 1 } });
            res.status(200).json({view:1})
          } else {
            await prisma.post.update({
              where: { slug: slug },
              data: { views: views.views + 1 },
            });
            res.status(200).json({view:views.views})
          }
          await prisma.$disconnect();
    }else return res.status(400).json({message:"invalid slug"})
}
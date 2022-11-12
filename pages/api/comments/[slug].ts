import type { NextApiRequest, NextApiResponse } from 'next'
import { comment, prisma, PrismaClient } from "@prisma/client"
interface Out{
    message?:string
    data?:comment[]
}

export default async (req:NextApiRequest, res:NextApiResponse<Out>) => {
  const prisma = new PrismaClient()
  const { slug } = req.query
  if (typeof(slug)!=='string') return res.send({message:"error slug"})
    const data = await prisma.comment.findMany({where:{post_slug:slug},orderBy:{date:"desc"}})
    res.status(200).json({data:data})
}

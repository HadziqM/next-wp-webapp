import type { NextApiRequest, NextApiResponse } from 'next'
import { comment, prisma, PrismaClient } from "@prisma/client"
interface Out{
    message?:string
    data?:comment
}
interface Input{
    avatar:string
    slug:string
    content:string
    name:string
}

export default async (req:NextApiRequest, res:NextApiResponse<Out>) => {
  const prisma = new PrismaClient()
  const { json } = req.query
  if(typeof(json) !== 'string') return res.status(400).json({message:"invalid data"})
  const dataInput:Input = JSON.parse(json)
  if (typeof(dataInput.slug)!=='string') return res.send({message:"error slug"})
    const data = await prisma.comment.create({data:{date:new Date(),name:dataInput.name,avatar_url:dataInput.avatar,content:dataInput.content,post_slug:dataInput.slug}})
    res.status(200).json({data:data})
}

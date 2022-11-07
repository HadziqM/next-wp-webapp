import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import { Views } from '../../../type';

interface Data{
    view?:number
    message?:string
}


export default async function Counters(req:NextApiRequest,res:NextApiResponse<Data>){
    const { slug } = req.query
    const fileDir = path.join(process.cwd(),`/wp-post-view/`)
    const data = String(await fs.readFile(fileDir+"view.json"))
    let json:Views = JSON.parse(data)
    const result = json.views.filter(e=>e.slug==slug)
    if (result.length===1){
        const views = result[0].view + 1
        const updated = json.views.map(e=>{
            if(e.slug==slug){
                e.view = views
                return e
            }
            return e
        })
        const json_data = JSON.stringify({views:updated},null,2)
        await fs.writeFile(fileDir+"view.json",json_data)
        res.status(200).json({view:views})
    }else if(result.length===0){
        const updated = {
            slug:String(slug),
            view:1
        }
        json.views.push(updated)
        const json_data = JSON.stringify(json,null,2)
        await fs.writeFile(fileDir+"view.json",json_data)
        res.status(200).json({view:1})
    }else{
        res.status(400).json({message:"file corrupted"})
    }
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import { Views } from '../../../type';


export default async function Counters(req:NextApiRequest,res:NextApiResponse):Promise<void> {
    const { slug } = req.query
    const fileDir = path.join(process.cwd(),`/wp-post-view/`)
    const data = String(await fs.readFile(fileDir+"view.json"))
    let json:Views = JSON.parse(data)
    const result = json.views.filter(e=>e.slug==slug)
    if (result.length===1){
        const updated = json.views.map(e=>{
            if(e.slug==slug){
                e.view += 1
                return e
            }
            return e
        })
        const json_data = JSON.stringify({views:updated},null,2)
        await fs.writeFile(fileDir+"view.json",json_data)
    }else{
        const updated = {
            slug:String(slug),
            view:1
        }
        json.views.push(updated)
        const json_data = JSON.stringify(json,null,2)
        await fs.writeFile(fileDir+"view.json",json_data)
    }
}
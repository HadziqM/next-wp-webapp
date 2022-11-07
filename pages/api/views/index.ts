import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import { Views } from '../../../type';


export default async function Counters(req:NextApiRequest,res:NextApiResponse) {
    const fileDir = path.join(process.cwd(),`/wp-post-view/`)
    const data = String(await fs.readFile(fileDir+"view.json"))
    let json:Views = JSON.parse(data)
    res.status(200).json(json)
}
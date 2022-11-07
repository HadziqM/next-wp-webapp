import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //
        });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

    if (files?.length) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/markdown/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;
            const text = await fs.readFile(tempPath,'utf-8')
            await fs.writeFile(targetPath+'2.md',`---\ntitle: "My First Blog of 2022"\nmetaTitle: "My First blog of 2022"\nmetaDesc: "How to make a blogging website using Next.js, Markdown and style it using TailwindCSS."\nsocialImage: /cresent.svg\ndate: "2022-02-02"\ntags:\n- nextjs\n- personal\n- health\n- work\n---\n\n`+text)
        }
    }

    res.status(status).json(resultBody);
}

export default handler;

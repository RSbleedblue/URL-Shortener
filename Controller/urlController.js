import fs from 'fs';
import {v4 as uuid} from 'uuid';
import path from 'path';
class urlController {
    constructor(){
        this.urlMappingFile = path.join('./Util', 'urlMappings.json');
        if (!fs.existsSync(this.urlMappingFile)) {
            fs.writeFileSync(this.urlMappingFile, JSON.stringify({}));
        }
    }
    async getUrl(req,res){
        const link = req.body;
        console.log(link);
        const shortLink = uuid().split("-")[0];
        const urlMapping = JSON.parse(fs.readFileSync(this.urlMappingFile,'utf-8'));

        urlMapping[shortLink] = link.link;

        fs.writeFileSync(this.urlMappingFile, JSON.stringify(urlMapping, null, 2));

        return res.status(200).json({working:`localhost:10000/api/OriginalUrl/${shortLink}`,status:true});
    }
    OriginalUrl(req,res){
        const id = req.params.shortlink;
        const urlMappings = JSON.parse(fs.readFileSync(this.urlMappingFile,'utf-8'));
        if(urlMappings[id]){
            const OriginalUrl = urlMappings[id];
            return res.status(200).json({working:OriginalUrl,success: true});
        }
        else{
            return res.satatus(401).json({message:"No link found",success: false});
        }
    }

}
export default urlController;
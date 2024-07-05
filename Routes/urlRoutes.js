import { Router } from "express";
import urlController from "../Controller/urlController.js";

const router = Router();
const URLController = new urlController;

router.post("/shortenLink",(req,res)=>URLController.getUrl(req,res));
router.get("/OriginalUrl/:shortlink",(req,res)=>URLController.OriginalUrl(req,res));

export default router;
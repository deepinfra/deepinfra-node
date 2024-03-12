import {config} from 'dotenv';
import {DolphinModelService} from "./lib/models/dolphin";
config();

const apiKey = String(process.env.DEEP_INFRA_API_KEY);

const dolphin = new DolphinModelService(apiKey);

dolphin.generateText("[INST] Just say hi! [/INST] ").then(console.log).catch(console.error);

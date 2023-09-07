import OpenAI from "openai";
import { OPENAI_APIKEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_APIKEY,
  dangerouslyAllowBrowser:true // defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
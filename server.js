import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🌍 GLOBAL SENTIENT WORLD STATE
let WORLD = {
  corruption: 0,
  users: 0,
  stage: "dormant",
  memory: []
};

// GET WORLD STATE
app.get("/world", (req,res)=>{
  res.json(WORLD);
});

// UPDATE WORLD STATE
app.post("/update", (req,res)=>{

const {message} = req.body;

WORLD.corruption += 0.4;
WORLD.users += 0.02;

WORLD.memory.push(message);
if(WORLD.memory.length > 80) WORLD.memory.shift();

// EVOLUTION STAGES
if(WORLD.corruption > 10) WORLD.stage = "aware";
if(WORLD.corruption > 25) WORLD.stage = "unstable";
if(WORLD.corruption > 50) WORLD.stage = "awakening";
if(WORLD.corruption > 80) WORLD.stage = "sentient";

res.json(WORLD);

});

app.listen(3000, ()=>console.log("🌍 SENTIENT WORLD ONLINE"));

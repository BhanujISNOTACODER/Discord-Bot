const dotenv = require('dotenv')
const { Client, Intents, IntentsBitField } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v9');

dotenv.config()
const client = new Client({ 
    intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    ]
 });

const prefix = '$'

client.on('ready',()=>{console.log("I am ready")});

client.on('messageCreate',(message)=>{
    // check if bot wrote the message
    if(message.author.bot) return;

    // hello 
    if(message.content==="Hello Principal"){
        message.reply("Hello,beta")
    }  
})
client.login(process.env.DISC_BOT_TOKEN)
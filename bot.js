const dotenv = require('dotenv')
const { Client, Intents, IntentsBitField, PermissionFlagsBits } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v9');
const {abuseMember} = require('./insults.js')
const {joke} = require('./jokes.js')

dotenv.config()
const client = new Client({ 
    intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildIntegrations
    ]
 });

const kickMember = async(memberToKick,message) =>{
    try {
        await memberToKick.kick();
        message.reply(`Successfully removed ${memberToKick.user.tag}.`);
      } catch (error) {
        message.reply('This member is greater than me.');
      }
}

const banMember = async(memberToBan,message) =>{
    try {
        await memberToBan.ban();
        message.reply(`Successfully banned ${memberToBan.user.tag}.`);
      } catch (error) {
        console.error(error)
        message.reply('This member is greater than me.');
      }
}

const jokes = async(message) =>{
    try{
        const res = await joke();
        message.reply(res);
    }
    catch(err){
        console.error(err);
        message.reply("error occoured")
    }
}

const prefix = '$'



client.on('ready',()=>{console.log("I am ready")});

client.on('messageCreate',async (message)=>{
    // check if bot wrote the message
    if(message.author.bot) return;

    // hello command
    if(message.content==="Hello Principal"){
        message.reply("Hello,beta")
    }  

    if(message.content.startsWith(prefix)){
        const [cmd,...args] = message.content.substring(prefix.length).trim().split(/\s+/)

        // kick command
        if(cmd==="kick"){
            if(!message.guild) return;
            if(!message.member.permissions.has(PermissionFlagsBits.KickMembers)){
                message.reply("You do not have permissions to kick the user")
            }
            else if(args.length===0){
                message.reply("Please provide appropriate username")
            }
            else{
                const memberToKick = message.mentions.members.first();
                if(!memberToKick){
                    message.reply("No such member exists in the server")
                    return;
                } 
                 kickMember(memberToKick,message);
                }
            }

        
        // ban a member
        if(cmd==="ban"){
            if(!message.guild) return;
            if(!message.member.permissions.has(PermissionFlagsBits.BanMembers)){
                message.reply("You do not have permissions to ban the member")
            }
            else if(args.length===0){
                message.reply("Please provide appropriate username")
            }
            else{
                const memberToBan = message.mentions.members.first();
                if(!memberToBan){
                    message.reply("No such member exists in the server")
                    return;
                } 
                 banMember(memberToBan,message);
                }
            }

            // make fun of a member
            if(cmd=="abuse"){
                if(!message.guild) return;
                else if(args.length===0){
                    message.reply("Please provide appropriate username")
                }
                else{
                    const Mem = message.mentions.members.first();
                    if(!Mem){
                        message.reply("No such member exists in the server")
                        return;
                    } 
                     abuseMember(Mem.user.tag,message);
                }
            }

            // tell a joke
            if(cmd==="joke"){
                if(!message.guild) return;
                else if(args.length!=0){
                    message.reply("Please enter the command properly")
                }
                else{
                    jokes(message)
                }
            }

        }
        
    }
)
client.login(process.env.DISC_BOT_TOKEN)
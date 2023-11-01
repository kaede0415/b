const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios');
const fs = require('fs');
async function getToken(userId){
  const filePath = 'tokens.json';
  const data = fs.readFileSync(filePath, 'utf8')
  const jsonData = JSON.parse(data)
  for(let i=0;i<jsonData.length;i++){
    const entry = jsonData[i];
    if(entry.hasOwnProperty(userId)){
      return entry[userId]
      break;
    }
  }
  return undefined
}

module.exports = {
  data: {
    name: "addlist",
    description: "IDを指定して権限を追加",
    options: [
      {
        type: "STRING",
        name: "id",
        description: "追加する人のIDを入力",
        required: true,
      }
    ],
  },
  async execute(interaction) {
    const id = interaction.options.getString("id");
    const admin = require("config.json").admin_list
    if(!admin.includes(interaction.user.id)) return interaction.reply({ content: "BOT管理者しか使えません", ephemeral: true })
    const configData = fs.readFileSync("config.json", 'utf8');
    const config = JSON.parse(configData);
    config.white_list.push(id);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

console.log('要素が追加されました。');

  },
};

const request = require('request');
const discord = require('discord.js');


module.exports.searchImages = function(id,search){
  return request(search,(err,resp,body)=>{
    const regEXP = /c1.staticflickr.com\/\d\/\d{4}\/\d{10}_\w{10}_?\w?.jpg/gi;
    imagens = body.toString().match(regEXP);
    console.log(imagens);
    if(imagens)
    sendImages(id,imagens); 
  })
}

const sendImages = function(id,link){
    const image = link[Math.floor((Math.random() * link.length) + 1)]
    id.send("https://"+image);
}

module.exports.playVideo = function(url,message){
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.2 };
  if(message.member.voiceChannel){
  message.member.voiceChannel.join()
  .then(connection => {
    const stream = ytdl(url, { filter : 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);
  })
  .catch(console.error);
  }else{
  message.channel.send("Entre em um canal de voz para tocar uma musica");
  }
}
module.exports.searchRule34 = function(url, id){
  return request(url,(err,resp,body)=>{
  console.log(body);
   var linkImage= body.toString().match(/http:\/\/\w{4,7}.paheal.net\/_images\/\w{30,40}\/\d{6,8}/gi);
   console.log(linkImage);
   if(linkImage){
    const image = linkImage[Math.floor((Math.random() * linkImage.length) + 1)]
    id.send(image);
   }else{
    id.send("Não foi possivel achar uma foto");
   }
   });
}
module.exports.searchVideos = function(id,search){
  return request(search,(err,resp,body)=>{
    const regEXP = /watch\?v=\w{7,20}/i;
    videos = body.toString().match(regEXP);
    if(videos){
    sendVideos(id,videos);
    }else{
      id.send("Não foi Possivel achar um video");
    } 
  })
}
const sendVideos = function(id,videos){
    id.send("https://www.youtube.com/"+videos);
}
module.exports.searchGiphy = function(id,url){
  return request(url,(err,resp,body)=>{
    giphys = body.toString().match(/https:\/\/gph.is\/\w{0,20}/gi);
    console.log(giphys);
    if(giphys)
    sendGiphy(id,giphys);
  });
}
const sendGiphy = function(id,url){
  id.send(url[(Math.floor((Math.random() * url.length) + 1))])
}
const { TouchBar:{TouchBarButton} } = require("electron")
const soundPlay = require("sound-play")

function playAudio(filePath){
  soundPlay.play(filePath).catch( () => console.log("Audio killed"))
}

class PlayAudioButton extends TouchBarButton{
  constructor(filePath){
    super({
      backgroundColor: "#438a63",
      click: () => playAudio(filePath)
    })
    this.label = this.genLabel(filePath)
  }

  genLabel(string){
    return string.split("/").at(-1).split(".")[0]
  }
}


module.exports = {PlayAudioButton, playAudio}
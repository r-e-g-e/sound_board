const { TouchBar:{TouchBarButton, TouchBarScrubber, TouchBarPopover}, TouchBar, nativeImage } = require("electron")
const KillAudioButton = require("./killAudioButton")
const {PlayAudioButton, playAudio} = require('./PlayAudioButton')

class PageNavigationButton {
  constructor(allAudioFiles) {
    this.leftButton = new TouchBarButton({
      label: "<",
      backgroundColor: "#5c5c5c"
    })

    this.rightButton = new TouchBarButton({
      label: ">",
      backgroundColor: "#5c5c5c"
    })

    this.killAudio = new KillAudioButton()

    this.list = []

    return this.makeList(allAudioFiles)
  }

  makeList(allAudioFiles){
    const categories = {}

    allAudioFiles.forEach( filePath => {
      const category = filePath.split("/").at(-2)

      if (!categories[category]?.length) {
        categories[category] = []
      }

      categories[category].push(filePath)
    })

    this.list = categories

    const items = []

    for ( let [key, value] of Object.entries(categories)){
      const currentItems = new TouchBar({
        items: [
          new TouchBarScrubber({
            items: value.map( filePath => new PlayAudioButton(filePath)),
            mode: "free",
            showArrowButtons: true,
            continuous:true,
            overlayStyle: 'outline',
            highlight: (n) => {
              playAudio(this.list[key][n])
            }
          }),
          this.killAudio
        ]
      })


      const popOver = new TouchBarPopover({
        items: currentItems,
        label: key,
        showCloseButton:true
      })

      items.push(popOver)
    }

    return new TouchBar({
      items
    })
  }
}



module.exports = PageNavigationButton
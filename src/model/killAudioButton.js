const { TouchBar:{TouchBarButton} } = require("electron")
const { exec } = require("child_process");

class KillAudioButton extends TouchBarButton{
  constructor() {
    function killMusics(){
      exec("ps | grep afplay", (error, stdout) => {
        if (error) return
      
        const lines = stdout.split('\n')

        lines.forEach( line => {
          if (!line.includes("grep")){
            const pidRaw = line.split(" ")
            const pid = pidRaw[0] || pidRaw[1]

            exec(`kill ${pid}`)
          }
        })
      })
    }

    super({
      click: killMusics,
      label: "kill",
      backgroundColor: "#c92f24"
    })
  }
}

module.exports = KillAudioButton
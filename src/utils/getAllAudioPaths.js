const { readdirSync } = require("node:fs")

function getAllAudioPaths(){
  const allFiles = []

  function makeTree(currentPath) {
    const currentFile = readdirSync(currentPath)

    currentFile.forEach( file => {
      const sla = currentPath + "/" + file

      if (file.includes(".")){
        allFiles.push(sla)
      }
      else{
        makeTree(sla)
      }
    })
  }
  
  makeTree("./audios")

  return allFiles
}

module.exports = { getAllAudioPaths }

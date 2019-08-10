const axios = require('axios')
const clear = require('clear')
const config = require('./customConfig')
require('colors')

const url = 'https://www.reddit.com/r/all.json'
let previousMatchArray = []

const printResults = (matches) => {
  matches.forEach(match => {
    console.log('MATCH:'.bgGreen.black)
    console.log(('Set "' + match.setName + '"').bgWhite.black)
    console.log(('Matched word "' + match.matchedWord + '"').bgWhite.black)
    console.log(('Post title "' + match.postTitle + '"').green)
    console.log(('Link: ' + (match.url).cyan + '"'))
    console.log('-----------------------------------------------------------')
  })
}


const init = () => {

  axios.get(url)

    .then(response => {

      const items = response.data.data.children
      const matches = []

      config.sets.forEach(set => {
        items.forEach(item => {
          set.keywords.forEach(word => {
            if (!item.data.title.includes(word)) {
              return
            }
            matches.push({
              setName: set.title,
              matchedWord: word,
              postTitle: item.data.title,
              url: 'https://www.reddit.com' + item.data.permalink,
            })
          })
        })
      })

      if (matches.length < 1) {
        console.log('No matches.'.red)
      }

      clear()

      if (matches.length === previousMatchArray.length) { // @todo Compare better, idiot.
        printResults(matches)
        console.log('NO NEW MATCHES'.red)
      } else {
        printResults(matches)
        console.log('NEW MATCHES!'.green)
      }

      setTimeout(() => {
        clear()
        printResults(matches)
      }, 1000)

      previousMatchArray = matches

      setTimeout(init, config.refreshIntervalInSeconds * 1000)
    })
    .catch(error => {
      console.log('ERROR: ' + error.toString())
    })
}

init()

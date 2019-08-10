const axios = require('axios')
const _ = require('lodash')
const config = require('./config')
require('colors')

const url = 'https://www.reddit.com/r/all.json'


const init = (config) => {

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

      matches.forEach(match => {
        console.log('MATCH:'.bgGreen.black)
        console.log(('Set "' + match.setName + '"').bgWhite.black)
        console.log(('Matched word "' + match.matchedWord + '"').bgWhite.black)
        console.log(('Post title "' + match.postTitle + '"').green)
        console.log(('Link: ' + (match.url).cyan + '"'))
        console.log('-----------------------------------------------------------')
      })
    })
    .catch(error => {
      console.log('ERROR: ' + error.toString())
    })
}

init(config)

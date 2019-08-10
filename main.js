const axios = require('axios')
const moment = require('moment')
const colors = require('colors')
const _ = require('lodash')
const config = require('./config')

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
            matches.push(item.data)
          })
        })
      })

      console.log(matches)
    })
    .catch(console.log)
}

init(config)

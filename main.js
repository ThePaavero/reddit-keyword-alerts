const axios = require('axios')
const moment = require('moment')
const _ = require('lodash')
const config = require('./config')

const processSet = (set) => {
  console.log(set)
}


const init = (config) => {
  config.sets.forEach(set => {
    processSet(set)
  })
}

init(config)

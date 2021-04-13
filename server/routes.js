var express = require('express')
var router = express.Router()

let connect = require('./connection')
let createDatabase = require('./create_database')
let dbTrigger = true

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const queries = {
  main: require('./queries/main_select'),
  update: require('./queries/update'),
  select: require('./queries/select'),
  insert: require('./queries/insert'),
}

router.get('/', async function (req, res, next) {
  try {
    let { query } = req
    if (process.env.CREATE_DB === 'TRUE' && dbTrigger) {
      await createDatabase(connect)
      dbTrigger = false

      let { result, total } = await queries.main(config, connect, query)
      res.send({ result, total, createdDB: true })
    } else {
      res.send(await queries.main(config, connect, query))
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.post('/update', async function (req, res, next) {
  try {
    let { body, query } = req
    await queries.update(config, connect, body)
    if (query.table === 'main') {
      res.send(await queries.main(config, connect, query))
    } else {
      res.send(await queries.select(config, connect, query))
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.get('/select', async function (req, res, next) {
  try {
    let { query } = req
    res.send(await queries.select(config, connect, query))
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.get('/insert', async function (req, res, next) {
  try {
    let { body } = req
    res.send(await queries.insert(config, connect, body))
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})
module.exports = router

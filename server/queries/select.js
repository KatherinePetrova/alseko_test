module.exports = async function (config, connect, body) {
  var con = connect(config)
  try {
    console.log(body)
    let query = `SELECT * FROM ${body.table} WHERE hide IS NULL`

    console.log(query)
    return await con.query(query)
  } catch (e) {
    throw e
  } finally {
    con.close()
  }
}

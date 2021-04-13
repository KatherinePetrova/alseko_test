module.exports = async function (config, connect, body) {
  var con = connect(config)
  try {
    let query = `INSERT INTO ${body.table} (`
    for (let key in body.fields) {
      query += key + ', '
    }

    query = query.substring(0, query.length - 3) + ') VALUES ('
    for (let key in body.fields) {
      query += body.fields[key] + ', '
    }

    query = query.substring(0, query.length - 3) + ')'

    console.log(query)
    return await con.query(query)
  } catch (e) {
    throw e
  } finally {
    con.close()
  }
}

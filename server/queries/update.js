module.exports = async function (config, connect, body) {
  var con = connect(config)
  try {
    let query = 'UPDATE ' + body.table + ' SET '
    for (let key in body.fields) {
      query += key + " = '" + body.fields[key] + "',"
    }

    query = query.substring(0, query.length - 2)
    query += " WHERE id = '" + body.id + "'"

    return await con.query(query)
  } catch (e) {
    throw e
  } finally {
    con.close()
  }
}

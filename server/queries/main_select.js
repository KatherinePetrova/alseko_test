const mainSelect = {
  query:
    "SELECT emp_id as id, CONCAT(emp.surname, ' ', SUBSTRING(emp.name, 1, 1), '. ', SUBSTRING(emp.middlename, 1, 1), '.') as name, COUNT(res.id) as count, SUM(value.cost) as sum FROM res JOIN emp ON res.emp_id = emp.id AND emp.hide IS NULL JOIN value ON res.value_id = value.id GROUP BY emp_id",
  limit: 10,
}

module.exports = async function (config, connect, body) {
  var con = connect(config)
  try {
    let query =
      mainSelect.query +
      (body.order_by ? ` ORDER BY ${body.order_by}` : ``) +
      (body.desc ? ' DESC' : '') +
      ` LIMIT 10` +
      (body.page && body.page > 1
        ? ` OFFSET ${(parseInt(body.page) - 1) * 10}`
        : '')

    let result = await con.query(query)

    let { total } = (
      await con.query('SELECT COUNT(DISTINCT emp_id) as total FROM res')
    )[0]

    return { result, total }
  } catch (e) {
    throw e
  } finally {
    con.close()
  }
}

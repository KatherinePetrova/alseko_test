const util = require('util')
const mysql = require('mysql')

module.exports = function (config) {
  const connection = mysql.createConnection(config)
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args)
    },
    close() {
      return util.promisify(connection.end).call(connection)
    },
    changeUser(user) {
      return connection.changeUser(user)
    },
  }
}

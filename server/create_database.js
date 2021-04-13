let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
}

let database = process.env.DB_NAME

module.exports = async function (connection) {
  console.log('Creating database...')
  var letters = [
    'А',
    'Б',
    'В',
    'Г',
    'Е',
    'Ж',
    'З',
    'И',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ц',
    'Ч',
  ]

  try {
    var con = connection(config)

    await con.query(`CREATE DATABASE ${database}`)
    await con.changeUser({ database })

    await con.query(
      'CREATE TABLE emp (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255), surname VARCHAR(255), middlename VARCHAR(255), hide TINYINT ZEROFILL)'
    )
    console.log(`Table 'emp' created successfully`)

    await con.query(
      'CREATE TABLE value (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255), cost INT ZEROFILL, hide TINYINT ZEROFILL)'
    )
    console.log(`Table 'value' created successfully`)

    await con.query(
      'CREATE TABLE res (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, emp_id INT NOT NULL, value_id INT NOT NULL, hide TINYINT ZEROFILL, CONSTRAINT fk_emp_id FOREIGN KEY (emp_id) REFERENCES emp(id), CONSTRAINT fk_value_id FOREIGN KEY (value_id) REFERENCES value(id))'
    )
    console.log(`Table 'res' created successfully`)

    for (let i = 0; i < letters.length; i++) {
      await con.query(
        `INSERT INTO emp (name, surname, middlename) VALUES ('Мансур', '${
          letters[i]
        }уруллаев', '${
          i - 1 < 0 ? letters[letters.length - 1] : letters[i - 1]
        }аратович')`
      )

      await con.query(
        `INSERT INTO value (name, cost) VALUES ('${
          letters[i]
        }ышь компьютерная (Модель ${
          i + 1 > letters.length - 1 ? letters[0] : letters[i + 1]
        }асус)', ${Math.random() * 10000 + i * 200})`
      )
    }

    for (let i = 1; i <= letters.length; i++) {
      let endResCount = Math.floor(Math.random() * letters.length) + 1

      for (let j = 0; j < endResCount; j++) {
        await con.query(
          `INSERT INTO res (emp_id, value_id) VALUES (${i}, ${
            Math.floor(Math.random() * letters.length) + 1
          })`
        )
      }
    }
  } catch (e) {
    await con.query(`DROP DATABASE ${database}`)
    throw e
  } finally {
    con.close()
  }
}

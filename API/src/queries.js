const e = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'master',
  host: 'postgresql',
  database: 'application',
  password: 'test',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(404).json({ info: 'Not Available' })
      
    }else
    response.status(200).json(results.rows)
  })
}


const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
      
    }else
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email, created_on) VALUES ($1, $2,(SELECT NOW()))', [name, email], (error, results) => {
      if (error) {
        console.log(error)
        response.status(404).json({ info: 'Not Available' })
        
      }else
      response.status(201).send(`User added!`)
    })
  }

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(404).json({ info: 'Not Available' })
        
      }else
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(404).json({ info: 'Not Available' })
      
    }else
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
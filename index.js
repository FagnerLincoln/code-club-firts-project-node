
/*Query params => meusite.com/users?name=rodolfo&age=28 //FLTROS
/Route params => /users2    // BUSCAR, DELETAR OU ALTERAR ALGO ESPECIFICO*/

/* 

   - GET => Busca informalçoe no back-and
   - Post => Cria informações no Back-and
   - Put / Putch => Altera / Atualizar informação no Back-and
   - Delete => Deleta informações no Back-and.

   Middleware => INTErCEPTADOR => Tem o poderde parar ou alterar dados da requisição 
   
   */

const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "User not Found" })
    }
    request.userIndex = index
    request.userId = id

    next()

}

app.get("/users", (request, response) => {

    return response.json(users)
})


app.post("/users", (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(users)
})

app.put("/users/:id", checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
const id = request.userId


    const updateUser = { id, name, age }

    users = [index] = updateUser

    return response.json(updateUser)
})

app.delete("/users/:id", checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})












app.listen(port, () => {
    console.log(`🐱‍🏍 Server started on port ${port}`)
})


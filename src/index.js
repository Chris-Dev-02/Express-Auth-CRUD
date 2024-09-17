import { app } from './server.js'
import { connection } from './database.js'
import { PORT } from './config.js'

connection()

app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})
import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from './routes/bloggers-router'
import {postsRouter} from './routes/posts-router'
import {runDb} from './repositories/db'
import {testingRouter} from './routes/testing-router';
//create express app
const app = express()

app.use(cors())
app.use(bodyParser.json())


const port = process.env.PORT || 5006

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!!!!')
})

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)
//start app

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}
startApp()
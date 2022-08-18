import {bloggers, posts} from './db'
import {BloggerType} from './bloggers-repository'

export const testingRepository = {
    async deleteAll() {
        await bloggers.drop()
        await posts.drop()
    }
}
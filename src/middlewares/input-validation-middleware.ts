import {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {bloggersRepository} from '../repositories/bloggers-db-repository';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let newErrors = errors.array({onlyFirstError: true})

        res.status(400).json({
            errorsMessages: newErrors.map((e) => ({
                message: e.msg,
                field: e.param
            }))
        })
    } else {
        next()
    }
}
const credentials = {
    login: 'admin',
    password: 'qwerty'
}

let data = `${credentials.login}:${credentials.password}`;
let buff = new Buffer(data);
let base64data = buff.toString('base64');

export let auth = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization // 'Base  SDGSNstnsdgn' (admin:qwerty)
    if (!authHeader) {
        res.send(401)
        return
    }
    if (authHeader && authHeader === `Basic ${base64data}`) {
        next();
    } else {
        res.send(401)
        return
    }
}

const regexp = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')

export const titleValidation = body('title').trim().isLength({min: 2, max: 30})
    .withMessage('title is required and its length should be 2-30 symbols')
export const nameValueValidation = body('name').trim().isLength({min: 2, max: 15})
    .withMessage('name is required and its length should be 2-15symbols')
export const youtubeUrlValidation1 = body('youtubeUrl').isLength({min: 2, max: 100})
    .withMessage('UrlValidations length should be 2-100 symbols')
export const youtubeUrlValidation2 = body('youtubeUrl').matches(regexp)
    .withMessage('UrlValidation is required, length 2-100 and its pattern:' +
        ' ^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$\n')
export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 2, max: 100})
    .withMessage('shortDescription is required and its Klength should be 2-100 symbols')
export const contentValidation = body('content').trim().isLength({min: 2, max: 1000})
    .withMessage('content is required and its length should be 2-100 symbols')

export const bloggerIdValidation = body('bloggerId').isNumeric().custom(async (value: number) => {
    const blogger = await bloggersRepository.findBloggerById(value)
    if(!blogger) {
        throw new Error('that blogger doesnt exist');
    }

    return true
})


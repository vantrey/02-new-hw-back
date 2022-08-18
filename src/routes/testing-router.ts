import {Router} from 'express';
import {testingRepository} from '../repositories/testing-ropository';

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req, res) => {
    await testingRepository.deleteAll();

    res.sendStatus(204)
})
import { addFileDetails, getFiles } from "../controllers/file"
import express from 'express'

const fileRouter = express.Router()

fileRouter.get('/', getFiles)
fileRouter.post('/', addFileDetails)

export { fileRouter }
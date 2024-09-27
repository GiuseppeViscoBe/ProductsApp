import express from 'express'
import productsController from './products.controller.js'

const router = express.Router()

router.get('/', productsController.getProducts)
router.post('/',productsController.createProducts)
router.delete('/:id', productsController.deleteProduct)
router.put('/:id', productsController.updateProduct)

export default router
 
const ProductService = require('../services/product-service');
const { PublishUserEvent } = require('../utils');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new ProductService();

    app.post('/product/create', async(req, res, next) => {
        try {
            const { name, desc, banner, type, price } = req.body; 
            const { data } =  await service.CreateProduct({ name, desc, banner, type, price });
            return res.json(data);
        } catch (err) {
            next (err);    
        }
    });

    app.get('/category/:type', async(req, res, next) => {
        const type = req.params.type;
        try {
            const { data } = await service.GetProductsByCategory(type);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/:id', async(req, res, next) => { 
        const productId = req.params.id;
        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

    app.post('/ids', async(req, res, next) => {
        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products); 
        } catch (err) {
            next(err);
        } 
    });
     
    app.get('/', async (req, res, next) => {
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err);
        }
    });
}
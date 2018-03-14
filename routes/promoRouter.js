const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')


.get((req,res)=>{
    Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
})

.post((req,res)=>{
    Promotions.create(req.body)
            .then((promotion) => {
                console.log('Promotion created: ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
})

.put((req,res)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req,res)=>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')

.get((req,res)=>{
    Promotions.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
})

.post( (req,res)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'
        + req.params.promoId);
})

.put( (req,res)=>{
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
            new: true
        })
        .then((promo) => {
            console.log('Promotion updated: ', promo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
})

.delete((req,res)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
})


module.exports = promoRouter;
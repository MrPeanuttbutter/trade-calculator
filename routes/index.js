import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('inicio');
})

router.get('/contacto', (req,res)=>{
    res.render('inicio');
})

export default router;

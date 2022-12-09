import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BrandService from "..//service/brand.service";

export const brandRouter = express.Router();

// GET: List all brands 
brandRouter.get('/get', async (req: Request, res: Response) => {
    try {
        const brands = await BrandService.getBrands();
        console.log("Brands retrieved successfully");
        return res.status(200).json(brands);
    } catch (err) {
        console.log("Error retrieving brands");
        return res.status(500).json(err);
    }
});

//GET: Get a brand by id
brandRouter.get('/get/:id', async (req: Request, res: Response) => {
    try {
        const brand = await BrandService.getBrandById(parseInt(req.params.id));
        if(brand) {
            console.log("Brand retrieved successfully");
            return res.status(200).json(brand);
        }
        console.log("Brand not found");
        return res.status(404).json({message: "Brand not found"});
    } catch (err) {
        console.log("Error retrieving brand");
        return res.status(500).json(err);
    }
});


// POST: Create a new brand
brandRouter.post('/create', [body('name').notEmpty().isString()], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const brand = await BrandService.createBrand(req.body);
        console.log("Brand created successfully");
        return res.status(200).json(brand);
    } catch (err: any) {
        console.log("Error creating brand");
        if(err.code){
            if(err.code === "P2002") {
                return res.status(400).json({message: "Brand already exists"});
            }
        }
        return res.status(500).json(err);
    }
});

// PUT: Update a brand
brandRouter.put('/update/:id', [body('name').notEmpty().isString()], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const brand = await BrandService.updateBrand(parseInt(req.params.id), req.body);
        if(brand) {
            console.log("Brand updated successfully");
            return res.status(200).json(brand);
        }
        console.log("Brand not found");
        return res.status(404).json({message: "Brand not found"});
    } catch (err: any) {
        console.log("Error updating brand");
        if(err.code){
            if(err.code === "P2002") {
                return res.status(400).json({message: "Brand already exists"});
            }
        }
        return res.status(500).json(err);
    }
});

// DELETE: Delete a brand
brandRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const brand = await BrandService.deleteBrand(parseInt(req.params.id));
        if(brand) {
            console.log("Brand deleted successfully");
            return res.status(204).json("Brand deleted successfully");
        }
        console.log("Brand not found");
        return res.status(404).json({message: "Brand not found"});
    } catch (err) {
        console.log("Error deleting brand");
        return res.status(500).json(err);
    }
});
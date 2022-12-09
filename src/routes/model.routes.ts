import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as ModelService from "..//service/model.service";

export const modelRouter = express.Router();

// GET: List all models
modelRouter.get('/get', async (req: Request, res: Response) => {
    try {
        const models = await ModelService.getModels();
        console.log("Models retrieved successfully");
        return res.status(200).json(models);
    } catch (err) {
        console.log("Error retrieving models");
        return res.status(500).json(err);
    }
});

// GET: List all models by brand id
modelRouter.get('/get/:id', async (req: Request, res: Response) => {
    try {
        const models = await ModelService.getModelsByBrandId(parseInt(req.params.id));
        console.log("Models retrieved successfully");
        return res.status(200).json(models);
    } catch (err) {
        console.log("Error retrieving models");
        return res.status(500).json(err);
    }
});

// POST: Create a new model
modelRouter.post('/create', [body('name').notEmpty().isString(), body('brandId').notEmpty().isInt(), body('type').notEmpty().isString()], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const model = await ModelService.createModel(req.body);
        console.log("Model created successfully");
        return res.status(200).json(model);
    } catch (err: any) {
        console.log("Error creating model");
        if(err.code){
            if(err.code === "P2002") {
                return res.status(400).json({message: "Model already exists"});
            }
        }
        return res.status(500).json(err);
    }
});
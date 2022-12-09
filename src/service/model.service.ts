import { db } from "../utils/db.server";
import { ModelInput } from "../utils/types";
import { Model as ModelStruct } from "@prisma/client";
 

// get all models
export const getModels = async (): Promise<ModelStruct[]> => {
    try {
        const models = await db.model.findMany();
        return models;
    } catch (err) {
        throw err;
    }
}

// get all models by brand id
export const getModelsByBrandId = async (id: number): Promise<ModelStruct[]> => {
    try {
        const models = await db.model.findMany({
            where: {
                brandId: id,
            },
        });
        return models;
    } catch (err) {
        throw err;
    }
}

// create a new model
export const createModel = async (model: ModelInput): Promise<ModelStruct> => {
    try {
        const newModel = await db.model.create({
            data: model
        });
        return newModel;
    } catch (err) {
        throw err;
    }
}
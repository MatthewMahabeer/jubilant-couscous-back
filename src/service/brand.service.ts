import { db } from "../utils/db.server";
import { BrandInput } from "../utils/types";
import { Brand as BrandStruct } from "@prisma/client";
// get all brands
export const getBrands = async (): Promise<BrandStruct[]> => {
    try {
        const brands = await db.brand.findMany();
        return brands;
    } catch (err) {
        throw err;
    }
}

// get a brand by id
export const getBrandById = async (id: number): Promise<BrandStruct | null> => {
    try {
        const brand = await db.brand.findUnique({
            where: {
                id: id,
            },
        });
        return brand;
    } catch (err) {
        throw err;
    }
}

// create a new brand
export const createBrand = async (brand: BrandInput): Promise<BrandStruct> => {
    try {
        const newBrand = await db.brand.create({
            data: brand
        });
        return newBrand;
    } catch (err) {
        throw err;
    }
}

// update a brand
export const updateBrand = async (id: number, brand: BrandInput): Promise<BrandInput | null> => {
    try {
        const updatedBrand = await db.brand.update({
            where: {
                id: id,
            },
            data: brand,
        });
        return updatedBrand;
    } catch (err) {
        throw err;
    }
}

// delete a brand
export const deleteBrand = async (id: number): Promise<BrandStruct | null> => {
    try {
        const deletedBrand = await db.brand.delete({
            where: {
                id: id,
            },
        });
        return deletedBrand;
    } catch (err) {
        throw err;
    }
}
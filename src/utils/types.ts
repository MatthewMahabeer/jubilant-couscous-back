 import { COLOR } from "@prisma/client";
  
  //export type COLOR = (typeof COLORR)[keyof typeof COLORR]
type BrandStruct = {
    id: number;
    name: string;
    models?: ModelStruct[] | null | undefined | [];
    createdAt: Date;
    updatedAt: Date;
    machines?: MachineStruct[] | [] | null | undefined;
}

type BrandInput = {
    name: string;
}

type ModelInput = {
    brandId: number;
    name: string;
    type: COLOR;
}

type ModelStruct = {
    id: number;
    name: string;
    brandId: number;
    brand: BrandStruct;
    type: COLOR;
    createdAt: Date;
    updatedAt: Date;
    machines?: MachineStruct[];
}

type MachineStruct = {
    id: number;
    brandId: number;
    brand: BrandStruct;
    modelId: number;
    model: ModelStruct;
    status: string;
    serial: string;
    brandName: string;
    modelName: string;
    type: string;
}

export type { BrandStruct, ModelStruct, MachineStruct, BrandInput, ModelInput };

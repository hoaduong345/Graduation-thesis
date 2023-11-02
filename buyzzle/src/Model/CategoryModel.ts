export type CategoryModal = {
    id: number;
    name: string;
    image: string;
    subCategories?: subCate[]
};

type subCate = {
    id: number;
    name: string;
};
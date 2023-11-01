const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CategoriesController = {
    addSubcategoriesLv1: async (req, res) => {
        try {
            const categoryId = parseInt(req.body.categoryId);
            const name = req.body.name;

            // Check if the category exists
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });

            if (!category) {
                return res.status(404).json('Category not found');
            }
            const newSubcategory = await prisma.subCategoriesMultiLv2.create({
                data: {
                    categoryid: category.id,
                    name: name,
                },
            });
            res.status(201).json(newSubcategory);
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getSubCategories: async (req, res) => {
        try {
            const categoryId = parseInt(req.body.category);
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });
            if (!category) return res.json('Category is undefined');
            const subcategories = await prisma.category.findMany({
                where: {
                    id: category.id,
                },
                include: {
                    subCategories: true,
                },
            });
            res.status(200).json(subcategories);
        } catch (error) {
            res.status(400).json('Get categories failed');
        }
    },

    getProductFromSubcategories: async (req, res) => {
        try {
            const categoriesId = parseInt(req.params.id);
            const subCategoriesId = parseInt(req.body.categoriesId);

            const category = await prisma.category.findFirst({
                where: { id: categoriesId },
            });
            if (!category) return res.json('Category is undefined');

            const product = await prisma.subCategoriesMultiLv2.findMany({
                where: {
                    categoryid: categoriesId,
                    id: subCategoriesId,
                },
                include: {
                    productId: {
                        include: {
                            ProductImage: true,
                        },
                    },
                },
            });
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            res.status(404).json(error.message);
        }
    },

    DeleteSubcategories: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.id);
            const subCategoriesId = parseInt(req.body.id);
            const category = await prisma.category.findFirst({
                where: {
                    id: categoryId,
                },
            });
            if (!category) return res.status(404).send('Category not found');

            await prisma.subCategoriesMultiLv2.delete({
                where: {
                    id: subCategoriesId,
                    categoryid: category.id,
                },
            });
            res.status(200).json('Delete Sub Categories Successfull');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
    updateSubCategories: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.id);
            const subCategoriesId = parseInt(req.body.id);
            const name = req.body.name;

            const existingCategory = await prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (!existingCategory) {
                return res.status(404).json('Categories is undefined');
            }
            await prisma.subCategoriesMultiLv2.update({
                where: {
                    id: subCategoriesId,
                    categoryid: categoryId,
                },
                data: {
                    name: name,
                },
            });
            res.status(200).send('Update Subcategories Successfully');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
};
module.exports = CategoriesController;

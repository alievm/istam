const Clothing = require("../models/Clothing");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const path = require('path');
const fs = require("fs");

exports.getAllClothing = async (req, res, next) => {
    try {
        const clothing = await Clothing.find();
        res.status(200).json(clothing);
    } catch (err) {
        next(err);
    }
};

exports.getClothingByFilter = async (req, res, next) => {
    try {
        const { subCategoryId, isTrending, name } = req.query;

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

        if (subCategoryId) {
            filter.subCategoryId = subCategoryId;
        }

        if (isTrending !== undefined) {
            filter.isTrending = isTrending === 'true';
        }

        const clothing = await Clothing.find(filter)
            .populate("categoryId subCategoryId");

        res.status(200).json(clothing);
    } catch (err) {
        next(err);
    }
};

exports.getClothingBySubCategory = async (req, res, next) => {
    try {
        const { subCategoryId } = req.query;

        // Если subCategoryId не указан, вернуть все записи
        const filter = subCategoryId ? { subCategoryId } : {};

        const clothing = await Clothing.find(filter)
            .populate("categoryId subCategoryId");
        res.status(200).json(clothing);
    } catch (err) {
        next(err);
    }
};

exports.getTrendingClothing = async (req, res, next) => {
    try {
        const trendingClothing = await Clothing.find({ isTrending: true })
            .populate("categoryId subCategoryId");
        res.status(200).json(trendingClothing);
    } catch (err) {
        next(err);
    }
};

exports.updateClothingTrending = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isTrending } = req.body;

        // Проверяем, существует ли одежда с таким ID
        const clothing = await Clothing.findById(id);
        if (!clothing) {
            return res.status(404).json({ message: "Clothing not found" });
        }

        // Обновляем статус тренда
        clothing.isTrending = isTrending;
        const updatedClothing = await clothing.save();

        res.status(200).json(updatedClothing);
    } catch (err) {
        next(err);
    }
};


exports.createClothing = async (req, res, next) => {
    try {
        const { name, categoryId, subCategoryId, sizes, colors } = req.body;
        const imageFile = req.file; // Assuming the file is sent as `file` in the request.

        // Check if categoryId is provided
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found" });

        // Check if subCategoryId is provided
        if (subCategoryId) {
            // Check if subcategory exists
            const subCategory = await SubCategory.findById(subCategoryId);
            if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

            // Ensure that the subcategory's category matches the selected category
            if (subCategory.categoryId && subCategory.categoryId.toString() !== categoryId) {
                return res.status(400).json({ message: "Invalid subcategory for the selected category" });
            }
        }

        // Handle image upload
        let imageUrl = "";
        if (imageFile) {
            const uploadDir = path.join(__dirname, "../uploads/images");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const imagePath = path.join(uploadDir, imageFile.originalname);
            fs.writeFileSync(imagePath, imageFile.buffer);
            imageUrl = `/uploads/images/${imageFile.originalname}`; // Save the relative path
        }

        // Create and save the new clothing item
        const newClothing = new Clothing({ name, categoryId, subCategoryId, sizes, colors, imageUrl });
        const savedClothing = await newClothing.save();
        res.status(201).json(savedClothing);
    } catch (err) {
        next(err);
    }
};


exports.deleteClothing = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Clothing.findByIdAndDelete(id);
        res.status(200).json({ message: "Clothing deleted successfully" });
    } catch (err) {
        next(err);
    }
};

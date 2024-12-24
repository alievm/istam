const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema(
    {
            name: { type: String, required: true },
            categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
            subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }, // Нет обязательности для связи с подкатегорией
            sizes: { type: [String], default: [] },
            colors: { type: [String], default: [] },
            imageUrl: { type: String },
            isTrending: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Clothing = mongoose.models.Clothing || mongoose.model("Clothing", clothingSchema);

module.exports = Clothing;

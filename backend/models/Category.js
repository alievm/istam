const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

// Проверка наличия модели, если уже существует, то возвращаем ее
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;

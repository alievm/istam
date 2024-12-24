const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const clothingRoutes = require("./routes/clothingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const errorHandler = require("./middlewares/errorHandler");
const newsRoutes = require("./routes/newsRoutes");
const path = require("path");
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/clothing", clothingRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/news", newsRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

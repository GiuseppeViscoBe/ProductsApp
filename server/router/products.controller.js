import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products: " + error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createProducts = async (req, res) => {
  try {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newProduct = new Product(product);
    await newProduct.save();

    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: `Product with id ${id} deleted` });
    console.log(id);
  } catch (error) {
    console.error("Error deleting product");
    res
      .status(404)
      .json({ success: false, message: `Product with id ${id} not found` });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});

    res
      .status(200)
      .json({ success: true, message: `Product with id ${id} updated`, data : updatedProduct });
    console.log(id);
  } catch (error) {
    console.error("Error updating product");
    res
      .status(404)
      .json({ success: false, message: `Product with id ${id} not found` });
  } 
};

export default {
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct
};

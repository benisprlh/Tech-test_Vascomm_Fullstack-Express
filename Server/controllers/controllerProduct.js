const { Product } = require("../models");

class ControllerProduct {
  static async addProduct(req, res, next) {
    const { name, price } = req.body;
    try {
      if (!req.file) {
        return res.status(400).send("No files were uploaded.");
      }
      const newProduct = await Product.create({
        name,
        price,
        image: req.file.buffer,
      });
      res.status(201).json({ msg: "Add Product Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  

  static async getProducts(req, res, next) {
    const { take, skip, search } = req.query;
    let paramQuerySQL = {
      limit: 10,
      offset: 0,
      order: [["id", "ASC"]],
    };
    let limit;
    let offset;

    if (search) {
      paramQuerySQL.where.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (skip) {
      limit = skip;
      paramQuerySQL.limit = limit;
    }

    if (take) {
      offset = take * limit - limit;
      paramQuerySQL.offset = offset;
    }
    try {
      const dataProducts = await Product.findAll();
      const newProducts = dataProducts.map((el) => {
        // console.log(el.image.data)
        const binary = Buffer.from(el.image).toString('base64');
        const newImage = `data:image/jpeg;base64,${binary}`;
        return {...el.dataValues, image: newImage}
      })
      res.status(200).json(newProducts);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const { name, price } = req.body;
    try {
        if (!req.file) {
            return res.status(400).send("No files were uploaded.");
          }
      const product = await Product.findByPk(req.params.id);
      if (!product) throw { name: 'not found' };
      await product.update({
        name,
        price,
        image: req.file.buffer,
      });
      product.image.toString('base64')
      res.status(200).json({msg: "Update Product Success"});
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) throw { name: 'not found' };
      await product.update({deletedAt: new Date()});
      res.status(200).json({ msg: `${product.title} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) throw { name: 'not found' };
      res.status(200).json(product)
    } catch (error) {
        next(error)
    }
  }
}

module.exports = ControllerProduct;

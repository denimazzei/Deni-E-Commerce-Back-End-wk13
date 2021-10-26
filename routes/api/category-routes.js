const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    const cData = await Category.findAll(
      {
        include: {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      }
    )
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(cData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
    const cById = await Category.findOne(
      {
        where: {
          id: req.params.id
        },
        // be sure to include its associated Products
        include: {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(cById);
});

router.post('/', async (req, res) => {
  // create a new category
    const newCategory = await Category.create(
      {
        category_name: req.body.category_name
      })
      .catch((err) => {
        res.status(500).json(err);
      });
      res.json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(updateCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(deleteCategory);
});

module.exports = router;

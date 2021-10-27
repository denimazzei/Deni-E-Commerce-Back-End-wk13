const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
    Category.findAll(
      {
        include: {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      }
    )
    .then(cData => res.json(cData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
    Category.findOne(
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
    .then(cData => {
      if (!cData) {
        res.status(404).json({ message: "No category with this ID"});
        return;
      }
      res.json(cData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
    Category.create(
      {
        category_name: req.body.category_name
      })
      .then(cData => res.json(cData))
      .catch((err) => {
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
    {
      where: {
        category_name: req.body.category_name
      }
    })
    .then(cData => {
      if(!cData[0]) {
        res.status(400).json({message: "no category with this ID"});
        return;
      } res.json(cData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(cData => {
      if(!cData) {
        res.status(400).json({message: "no category with this ID"});
        return;
      } res.json(cData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;

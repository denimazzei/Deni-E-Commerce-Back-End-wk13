const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll(
    {
      attributes: ["id", "tag_name"],
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    }
  )
  .catch((err) => {
    res.status(500).json(err);
  });
  res.json(tagData);
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagById = await Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      // be sure to include its associated Products
      include: {
        model: Product,
      }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  res.json(tagById);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(
    {
      tag_name: req.body.tag_name
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(newTag);
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    res.json(deleteTag);
});

module.exports = router;

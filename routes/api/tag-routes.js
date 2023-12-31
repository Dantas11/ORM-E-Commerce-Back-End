const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags, include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock', 
          'category_id'
        ],
        through: ProductTag,
        as: 'tagIds'
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // finds a single tag by its `id` (include its associated Product data)
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id','tag_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock', 
          'category_id'
        ],
        through: ProductTag,
        as: 'tagIds'
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new tag
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // updates a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
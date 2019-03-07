const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const { Page, generateSlug } = require("../models");

router.get('/', (req, res, next) => {
  res.redirect('../')
});

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  console.log(req.body)
  const page = new Page({
    title: req.body.title,
    // slug: generateSlug(req.body.title),
    content: req.body.content
  });

  Page.beforeValidate((page) => {
    page.slug = generateSlug(page.title)
  })

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage())
});

router.get('/:slug', async (req, res, next) => {
  let currentSlug = req.params.slug
  let slugMatch = await Page.findOne({
    where: {slug: currentSlug}
  })
  if (slugMatch === currentSlug) {
    res.json(slugMatch)
  } else {
    res.sendStatus(404)
  }
})

module.exports = router


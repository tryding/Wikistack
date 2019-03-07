const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const { Page, generateSlug } = require("../models");
const wikiPage = require('../views/wikipage')

router.get('/', (req, res, next) => {
  res.redirect('../')
});

router.post('/', async (req, res, next) => {

  console.log(req.body)
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  Page.beforeValidate((page) => {
    page.slug = generateSlug(page.title)
  })

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage())
});

router.get('/:slug', async (req, res, next) => {
  try {
    let page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    console.log(page)
    res.json(wikiPage(page))
  } catch(error) {next(error)}
})

module.exports = router


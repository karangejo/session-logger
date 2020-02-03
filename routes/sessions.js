const express = require('express')
const router = express.Router()
const Session = require('../models/session')


// Getting all
router.get('/', async (req, res) => {
  try {
    const sessionsBelongingToOwner = await Test.find({owner: req.body.owner})
    res.json(sessionsBelongingToOwner)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
/*
// Getting One
router.get('/:id', getTest, (req, res, next) => {
  res.json(res.test)
})
*/
// Creating one
router.post('/', async function(req, res){
  console.log(req);
  const sessionToSave = new Session({
    owner: req.body.owner,
    date: req.body.date,
    size: req.body.size,
    shape: req.body.shape,
    location: req.body.location,
    windDir: req.body.windDir
  })
  try {
    const newSession = await sessionToSave.save()
    res.status(201).json(newSession)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
//router.patch('/:id', getSubscriber, async (req, res) => {
  //if (req.body.name != null) {
    //res.subscriber.name = req.body.name
//  }
//  if (req.body.subscribedToChannel != null) {
  //  res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//  }
  //try {
  //  const updatedSubscriber = await res.subscriber.save()
  //  res.json(updatedSubscriber)
//  } catch (err) {
  //  res.status(400).json({ message: err.message })
  //}
//})
/*
// Deleting One
router.delete('/:id', getTest, async (req, res) => {
  try {
    await res.test.remove()
    res.json({ message: 'Deleted Test' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTest(req, res, next) {
  let test
  try {
    test = await Test.findById(req.params.id)
    if (test == null) {
      return res.status(404).json({ message: 'Cannot find test' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.test = test
  next()
}
*/

module.exports = router

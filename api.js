//api.js
//routes.js
const express = require('express')
const router = express.Router()
const ListItemModel = require("./listItemModel")

router.get("/list", (req, res) => {
  ListItemModel.find({})
    .then((data) => {res.send(data)})
})

router.post("/list", (req, res) => {
  // Добавляем новый элемент в БД
  ListItemModel.create(req.body)
    .then((data) => {
      let newItem = data
      // Если у него есть родитель, то ставим родителю children: true
      if(data.parent !== "0"){
        ListItemModel.findByIdAndUpdate(newItem.parent, { $set: { children: true, subList: true}})
        // ListItemModel.findByIdAndUpdate(newItem.parent, { $set: { subList: true } })
//        ListItemModel.updateOne(
//          { _id: newItem.parent },
//          { $push: { children: data._id } }
//        )
          .then((data) => {

            // Находим его родителя, + новый элемент и отправляем их на фронт
            ListItemModel.findOne({ _id: newItem.parent})
            .then((data) => {            
              let updatedParent = data
              let family = {
                newItem,
                updatedParent         
              }
              res.send(family)
            })
          })
          // Если у него нет родителя, то отправляем на фронт только новый элемент
      } else {
            let family = {
              newItem,
              updatedParent: null         
            }
            res.send(family)
      }
    
  })
})


router.put("/list/:id", (req, res) => {
  ListItemModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {res.sendStatus(200)})    
})

router.delete("/list/:id/:marker", (req, res) => {

  if (req.params.marker === "L"){
    // Ищем текущий элемент
    let currentItem
    ListItemModel.findById(req.params.id)
    
      // Удаляем элемент
      .then((data) => {
        currentItem = data 
        return ListItemModel.deleteOne({ _id: req.params.id })})
    
      // Удаляем детей
      .then((data) => {
        return ListItemModel.remove({parent: req.params.id})})
      // Удаляем всех потомков
      .then((data) => {
        return ListItemModel.remove({ancestors: {$all : [req.params.id]}})})
      // Ищем братьев
      .then((data) => {
        return ListItemModel.findOne({parent: currentItem.parent})})
      // Назначаем родителю children: false
      .then((data) => {
        if (!data && currentItem.parent !== "0"){
          return ListItemModel.findByIdAndUpdate(currentItem.parent,{$set:{children: false}})
        }
      })
      .then((data) => {
        res.sendStatus(200)})
      }
      
  if (req.params.marker === "SL") {
       
    // Удаляем детей
    ListItemModel.remove({ parent: req.params.id })
      // Удаляем всех потомков
      .then(() => {return ListItemModel.remove({ancestors: {$all : [req.params.id]}})})
    // Обнуляем его поле children и  назначаем sublist: false
      .then(() => {return ListItemModel.updateOne(
                    { _id: req.params.id },
        { $set: { children: false, subList: false } })        
      })
      .then(() => {res.sendStatus(200)})
  }
})



module.exports = router
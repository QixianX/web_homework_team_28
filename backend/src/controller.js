const fs = require("fs")

const {
  asyncReadFile,
  asyncWriteFile
} = require('./dao')

//读取所有Todo任务
exports.getAllTodo = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
  if (err) {
    return res.status(500).send()
  }
  res.send(JSON.parse(data))
})

//创建一个新的Todo任务
exports.addTodo = async (req, res) => {
  const newTodo = req.body
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file);
  var max = 0;
  for(var i = 0; i < todo_list.length; i++) {
    if (todo_list[i].id > max){
      max = todo_list[i].id
    }
  }
  newTodo.id = max + 1;

  if (todo_list.filter(v => v.task === newTodo.task).length != 0) {
    res.status(400).send()
  } else {
    todo_list.push(newTodo)
    await asyncWriteFile(JSON.stringify(todo_list), req.app.locals.dataFilePath)
    res.status(201).send(todo_list)
  }
}

//删除一个Todo任务
exports.deleteTodo = async (req, res) => {
  const index = req.body.index
  const id = req.params.id//测试用
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)
  const newList = []
  
  for(var i = 0; i < todo_list.length; i++){
    if(todo_list[i].id != index){
      newList.push({"id":todo_list[i].id,"task":todo_list[i].task}) 
    }
  }
  await asyncWriteFile(JSON.stringify(newList), req.app.locals.dataFilePath)
  res.send(204).send(todo_list)
  
}

//修改一个todo任务
exports.updateTodo = async (req, res) => {

  //获取待修改任务的id和task
  const id = req.body.id
//  const id = req.params.id//测试
  const task = req.body.task
  
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)

  for (var i = 0; i < todo_list.length; i++) {
    if (todo_list[i].id == id){
      todo_list[i].task = task
    }
  }

  await asyncWriteFile(JSON.stringify(todo_list), req.app.locals.dataFilePath)
  res.send(204).send(todo_list)
}

const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const todoSequelize = require("../../database/setup/database")
const TaskPlannerModel = require("../../database/models/TaskPlannerModels")
const TodosRouter = Router();
      
TodosRouter.post("/addtodo",async (req,res) => {
    try{
        const { newUserId, newTask, newDoBefore, newCompleted } = req.body;
    const newTodo = {
        task: newTask,
        completed: newCompleted,
        doBefore: new Date(newDoBefore),
        userId: newUserId
    }
    const todo = await TaskPlannerModel.create(newTodo);
    console.log("TODO", todo);
    res.status(StatusCodes.OK).json( {todo} );}
    catch(e){
        console.log("ERROR",e)
    }
})

TodosRouter.get("/alltodos", async( req,res ) => {
    const todos =  await TaskPlannerModel.findAll();
    if( todos.length === 0){
        res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        return;
    }
    res.json(todos);
})

TodosRouter.get("/bytodoid", async( req,res ) => {
    const todoId = parseInt(req.query.todoId);

    if( !todoId ){
        res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        return;
    }
    const todo =  await TaskPlannerModel.findOne( { where: { id: todoId } } );
    res.json({todo});
})


TodosRouter.get("/byuserid", async( req,res ) => {
    const userId = parseInt(req.query.userId);

    if( !userId ){
        res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        return;
    }
    const todo =  await TaskPlannerModel.findOne( { where: { userId: userId } } );
    res.json(todo);
})

TodosRouter.put("/updatetodo", async(req,res) => {
    const { todoId, newTask, newCompleted, newDoBefore } = req.body;
    console.log('Received Date:', newDoBefore); // Log the received date
    console.log(todoId,newTask,newDoBefore, newCompleted)
    try{
        await TaskPlannerModel.update(
            {
                task: newTask,
                completed: newCompleted,
                doBefore: newDoBefore,
            },
            { where: { id:todoId } }   
        );
        const todo = await TaskPlannerModel.findByPk(todoId);
    
        res.status(StatusCodes.OK).json( { updatedTodo: todo } )
    }catch(e){
        console.log("ERROR FROM UPDATE",e)
        res.status(500).json({ error: e.message });
    }
})

TodosRouter.put("/marktodo", async(req, res) => {
    const { id, newCompleted } = req.body;
    const currentTodo = await TaskPlannerModel.update(
        {
            completed: newCompleted
        },
        { where: { id: id } }
    );

    const updatedTodo = await TaskPlannerModel.findByPk(id);
    res.status(StatusCodes.OK).json({ updatedTodo: updatedTodo})
})

TodosRouter.delete("/deletetodo", async ( req,res ) => {
    const { todoId } = req.body;
    console.log(`Deleted todo id: ${todoId}`)
    const deletedTodo = await TaskPlannerModel.destroy( { where: { id: todoId } });
    if(deletedTodo){
        res.json( { deletedTodo: todoId } )
    }else {
        res.status(404).send("task not found");
    }
})

module.exports = { TodosRouter };
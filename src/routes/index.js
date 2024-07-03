const { Router } = require("express");
const { TodosRouter } = require("./todos")

const AppRouter = Router();

AppRouter.use("/todos", TodosRouter);

module.exports = { AppRouter };
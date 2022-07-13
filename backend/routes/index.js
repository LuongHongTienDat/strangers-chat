const userRouter = require('./userRoutes');
const profileRoute = require('./profileRoutes');
const messageRouter = require('./messageRoutes');

function routes(app){
    app.use('/api/profile', profileRoute);
    app.use('/api/user', userRouter);
    app.use('/api/message', messageRouter);

}

module.exports = routes;

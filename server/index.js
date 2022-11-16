require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require("koa-router");
const cors = require('@koa/cors');
app.use(cors());
app.use(bodyParser())
const router = new Router();

const connectDB = require('./connectDB');
const { login, register, getUser } = require('./controller/Login.controller');
const { getListActionLog, createLogAction, searchNameLogAction } = require('./controller/Log.controller');



connectDB();
app.use(router.routes()).use(router.allowedMethods());
const { getListDevices, createDevice } = require('./controller/Dashboard.controller');

router.post('/api/register',register)
router.post('/api/login',login);
router.get('/user/:id', getUser);

router.get('/api/devices',getListDevices)
router.post('/api/devices',createDevice)

router.get('/api/log/search',searchNameLogAction)
router.get('/api/log',getListActionLog)
router.post('/api/log',createLogAction)
app.listen(5000,()=>console.log(`The server is running at http://localhost:${5000}`));
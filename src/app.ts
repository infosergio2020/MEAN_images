import express from 'express'
import morgan from 'morgan'
import path from'path'

const app = express()

import indexRoutes from './routes/index'

// settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json()); //utiliza el metodo json para entender los datos que me llgan como JSON



//routes
app.use('/api', indexRoutes);

//this folder for this app will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
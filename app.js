require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const ratelimiter=require('express-rate-limit');
const app = express();

const AuthentMiddle=require('./middleware/authentication');

//connection
const ConnectDB=require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Routes
const AuthRouter=require('./routes/auth');
const JobRouter=require('./routes/jobs');

app.set('trust proxy',1);
app.use(ratelimiter({
  windowMs:15*60*1000,
  max:100,
})
);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

// extra packages
app.use('/api/v1/auth',AuthRouter);
app.use('/api/v1/jobs',AuthentMiddle,JobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {

    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

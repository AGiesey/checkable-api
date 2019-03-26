require('./models/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index.route');
const usersRouter = require('./routes/users.route');
const checklistsRouter = require('./routes/checklists.route');
const checklistItemsRouter = require('./routes/checklist-item.route');
const loginRouter = require('./routes/login.route')
const collaborationRouter = require('./routes/collaboration.route');

const app = express();

/* No view engine. This is an API */
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Currently allowing all access through cors, I want to whitelist the client eventually
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checklists', checklistsRouter);
app.use('/checklistItems', checklistItemsRouter);
app.use('/login', loginRouter);
app.use('/collaboration', collaborationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

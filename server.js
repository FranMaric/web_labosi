//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

//uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require('./routes/home.routes');
const orderRouter = require('./routes/order.routes');
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const signupRoute = require('./routes/signup.routes');
const cartRoute = require('./routes/cart.routes');
const userRoute = require('./routes/user.routes');
const checkoutRoute = require('./routes/checkout.routes');
const feedbackRoute = require('./routes/feedback.routes');

//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

//pohrana sjednica u postgres bazu korištenjem connect-pg-simple modula
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'web-lab4',
    password: '123',
    port: 5432,
});

app.use(session({
  store: new pgSession({
    pool : pool
  }),
  secret: 'FER-web',
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


//definicija ruta
app.use('/', homeRouter);
app.use('/order', orderRouter);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/signup', signupRoute);
app.use('/cart', cartRoute);
app.use('/user', userRoute);
app.use('/checkout', checkoutRoute);
app.use('/feedback', feedbackRoute);


//pokretanje poslužitelja na portu 3000
app.listen(3000);


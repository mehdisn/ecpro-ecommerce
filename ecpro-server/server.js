const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require("./models");
const Role = db.role;
var morgan = require('morgan');
var winston = require('./config/winston.config');

db.sequelize.sync({}).then(async () => {
  initial();
});

initial = async () => {
  try {
    await Role.create({
      id: 1,
      name: "user"
    });

    Role.create({
      id: 2,
      name: "admin"
    });
  } catch (err) {
    return
  }
}
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined', { stream: winston.stream }));

app.disable('etag');

app.get('/', (req, res) => {
  console.log("agha request omade");
  res.send('okeye be mola')
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/product.routes')(app);
require('./routes/category.routes')(app);
require('./routes/cart.routes')(app);
require('./routes/address.routes')(app);
require('./routes/order.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/home.routes')(app);
require('./routes/errorHandler.routes')(app, winston);
require('./routes/404.routes')(app);


app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
})

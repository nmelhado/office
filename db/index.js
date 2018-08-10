const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Department = conn.define('department', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

User.belongsTo(Department);
Department.hasMany(User);

const sync = async () => {
  await conn.sync({force: true})
}

const seed = async () => {
  const [Jim,Dwight,Michael,Pam,Kevin,Sales,Manager,Reception,Accounting] = await Promise.all([
    User.create({name: 'Jim'}),
    User.create({name: 'Dwight'}),
    User.create({name: 'Michael'}),
    User.create({name: 'Pam'}),
    User.create({name: 'Kevin'}),
    Department.create({name: 'Sales'}),
    Department.create({name: 'Manager'}),
    Department.create({name: 'Reception'}),
    Department.create({name: 'Accounting'})
  ])
  await Jim.update({
    departmentId: Sales.id
  })
  await Dwight.update({
    departmentId: Sales.id
  })
  await Michael.update({
    departmentId: Manager.id
  })
  await Pam.update({
    departmentId: Reception.id
  })
  await Kevin.update({
    departmentId: Accounting.id
  })
}

module.exports = {
  sync,
  seed,
  model: {
    User,
    Department
  }
}
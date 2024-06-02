import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  'backend_template',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
  },
)

export { sequelize, DataTypes };

require('../bootstrap');

module.exports = {
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DATABASE,
  port: 5432,
  storage: './__tests__/database.sqlite',
  logging: !(process.env.NODE_ENV === 'test'),
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};

module.exports = {
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: true,
  },
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_DATABASE,
  port: 5432,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};

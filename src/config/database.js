module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'carbonara',
  database: 'gitstar',
  port: 5432,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};

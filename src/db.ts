import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost', // Thay đổi thành host của PostgreSQL nếu cần thiết
    user: 'postgres',
    password: 'hung@6789', // Thay đổi thành mật khẩu của PostgreSQL
    database: 'koolsoftdb' // Thay đổi thành tên cơ sở dữ liệu của bạn
  }
});

export default db;

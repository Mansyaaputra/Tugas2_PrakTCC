import { Sequelize } from "sequelize";

const db = new Sequelize('note','root','bebas',{
    host: '34.171.86.52',
    dialect: 'mysql',});

    export default db;
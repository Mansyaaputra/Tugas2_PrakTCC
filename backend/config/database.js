import { Sequelize } from "sequelize";

const db = new Sequelize('note','root','bebas',{
    host: '34.31.182.242',
    dialect: 'mysql',});

    export default db;
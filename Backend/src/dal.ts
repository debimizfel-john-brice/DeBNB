import AppConfig from "./app_config";
import mysql from "mysql";

const connection = mysql.createPool({
    host: AppConfig.my_sql_host,
    database: AppConfig.my_sql_database,
    user: AppConfig.my_sql_user,
    password: AppConfig.my_sql_password,
    timezone: 'utc'
});

function execute(sql: string, ...values: any): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

export default {
    execute
}
import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "sysadmin",
        database: "pg_exemple",
        password: "1234",
        port: 5432,
        host: "127.0.0.1",
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public createSchema(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(data);
    }

    public getHotels(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT * FROM HOTELDB.Hotel;');
    }

    public getHotelNo(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');
    }

    public createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            hotelNo,
            hotelName,
            city
        ];
        const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }


    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    }

    public getRoomFromHotel(hotelNo: string, roomType: string): Promise<pg.QueryResult> {
        this.pool.connect();

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== '') {
            query = query.concat(` AND typeroom=\'${roomType}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }
}

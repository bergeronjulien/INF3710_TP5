import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Hotel} from "../../../common/tables/Hotel";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class IndexService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    public getHotels(): Observable<any[]> {

        return this.http.get<Hotel[]>(this.BASE_URL+ "/hotel").pipe(
            catchError(this.handleError<Hotel[]>("getHotels")),
        );
    }

    public getHotelPKs(): Observable<string[]>{

        return this.http.get<string[]>(this.BASE_URL+"/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }

    public insertHotel(hotel: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL+"/hotel/insert", hotel).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }
    

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}

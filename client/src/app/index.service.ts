import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class IndexService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    public getHotels(): Observable<any[]> {

        return this.http.get<any[]>(this.BASE_URL+ "/hotel").pipe(
            catchError(this.handleError<any[]>("getHotels")),
        );
    }

    public getHotelPKs(): Observable<any[]>{

        return this.http.get<any[]>(this.BASE_URL+"/hotel/hotelNo").pipe(
            catchError(this.handleError<any[]>("getHotelPKs")),
        );
    }

    public insertHotel(hotel: any): Observable<any[]> {
        return this.http.post<any>(this.BASE_URL+"/hotel/insert", hotel).pipe(
            catchError(this.handleError<any>("inserHotel")),
        );
    }
    

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}

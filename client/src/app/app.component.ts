import { Component, OnInit } from "@angular/core";
import { IndexService } from "./index.service";
import { Hotel } from '../../../common/tables/Hotel';
import { Room } from '../../../common/tables/Room';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private basicService: IndexService) { }

    public readonly title: string = "INF3710";
    public hotels: Hotel[] = [];
    public hotelPKs: string[] = [];
    public duplicateError: boolean = false;
    public invalidHotelPK: boolean = false;
    public ngOnInit(): void {
        this.basicService.getHotelPKs().subscribe((hotelPKs:string[])=>{
            this.hotelPKs = hotelPKs;
            console.log(this.duplicateError);
            console.log(this.hotelPKs);
        })
    }

    public getHotels(): void{
        this.basicService.getHotels().subscribe((hotels:Hotel[]) => {
            this.hotels = hotels;
        });
    }

    public insertHotel(hotelNo:string, hotelName:string, hotelCity:string): void{
        let hotel:any = {
            "hotelNo" : hotelNo,
            "hotelName" : hotelName,
            "city" : hotelCity
        }
        this.basicService.insertHotel(hotel).subscribe((res:number)=> {
            if (res > 0) {
                this.getHotels();
            }
            this.duplicateError = (res === -1);
        });
    }

    public insertRoom( roomNo:string, hotelNo: string, typeRoom: string, price: number): void{
        let room: Room = {
            roomno: roomNo,
            hotelno: hotelNo,
            typeroom: typeRoom,
            price: price
        };
        this.basicService.insertRoom(room).subscribe((res:number)=> {
            console.log(res);
        });
    }

    public validateHotelNo(hotelNo: string): void{
        this.invalidHotelPK = this.hotelPKs.indexOf(hotelNo) === -1;
    }
}

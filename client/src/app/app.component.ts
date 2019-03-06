import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hotel } from "../../../common/tables/Hotel";
import { Room } from "../../../common/tables/Room";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
    }

    public readonly title: string = "INF3710 TP5";
    public hotels: Hotel[] = [];
    public hotelPKs: string[] = [];
    public duplicateError: boolean = false;
    public invalidHotelPK: boolean = false;
    public ngOnInit(): void {
        this.communicationService.getHotelPKs().subscribe((hotelPKs: string[]) => {
            this.hotelPKs = hotelPKs;
            console.log(this.duplicateError);
            console.log(this.hotelPKs);
        });
    }

    public getHotels(): void {
        this.communicationService.getHotels().subscribe((hotels: Hotel[]) => {
            this.hotels = hotels;
        });
    }

    public insertHotel(hotelNo: string, hotelName: string, hotelCity: string): void {
        const hotel: any = {
            "hotelNo" : hotelNo,
            "hotelName" : hotelName,
            "city" : hotelCity
        };
        this.communicationService.insertHotel(hotel).subscribe((res: number) => {
            if (res > 0) {
                this.getHotels();
            }
            this.duplicateError = (res === -1);
        });
    }

    public insertRoom( roomNo: string, hotelNo: string, typeRoom: string, price: number): void {
        const room: Room = {
            roomno: roomNo,
            hotelno: hotelNo,
            typeroom: typeRoom,
            price: price
        };
        this.communicationService.insertRoom(room).subscribe((res: number) => {
            console.log(res);
        });
    }

    public validateHotelNo(hotelNo: string): void {
        this.invalidHotelPK = this.hotelPKs.indexOf(hotelNo) === -1;
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }
}
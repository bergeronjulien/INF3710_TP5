import { Component, OnInit } from "@angular/core";
import { Hotel } from "../../../../common/tables/Hotel";
import { CommunicationService } from "./../communication.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.css"]
})
export class HotelComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }

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



}

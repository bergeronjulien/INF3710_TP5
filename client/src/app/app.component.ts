import { Component, OnInit } from "@angular/core";
import { IndexService } from "./index.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public constructor(private basicService: IndexService) { }

    public readonly title: string = "INF3710";
    public hotels: any[];
    public hotelPKs: any[];

    public ngOnInit(): void {
        this.basicService.getHotelPKs().subscribe((hotelPKs:any[])=>{
            this.hotelPKs = hotelPKs.map(a => a.hotelno);
            console.log(this.hotelPKs);
        })
    }

    public getHotels(): void{
        this.basicService.getHotels().subscribe((hotels:any[]) => {
            this.hotels = hotels;
        });
    }

    public insertHotel(hotelNo:string, hotelName:string, hotelCity:string): void{
        let hotel:any = {
            "hotelNo" : hotelNo,
            "hotelName" : hotelName,
            "city" : hotelCity
        }
        this.basicService.insertHotel(hotel).subscribe((res:any)=> console.log(res));
    }
}

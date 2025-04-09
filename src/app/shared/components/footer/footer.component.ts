import { Component } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  ngOnInit(){
    console.log("Footer")
  }
}

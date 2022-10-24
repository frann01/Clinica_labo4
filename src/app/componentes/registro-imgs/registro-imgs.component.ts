import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-imgs',
  templateUrl: './registro-imgs.component.html',
  styleUrls: ['./registro-imgs.component.css']
})
export class RegistroImgsComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  volver()
  {
    this.router.navigateByUrl("")
  }


  Especialista()
  {
    this.router.navigateByUrl("registro/especialista")
  }

  usuario()
  {
    this.router.navigateByUrl("registro")
  }

}

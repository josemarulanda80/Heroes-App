import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroesRoutingModule } from '../../heroes-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
width:100%;
border-radius:5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {
publishers = [
  {
    id: 'Dc Comics',
    desc: 'Dc - Comics'
  },
  {
    id:'Marvel Comics',
    desc:'Marvel - Comics'
  },
];
heroe:Heroe={
  superhero:'',
  alter_ego:'',
  characters:'',
  first_appearance:'',
  publisher:Publisher.DCComics,
  alt_img:'',
}

  constructor( private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router:Router,
    private snackBar:MatSnackBar, public dialog:MatDialog) { }
guardar(){
 if (this.heroe.superhero.trim().length===0){
   return;

 }
if (this.heroe.id){
  this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe=>this.mostrarSnackbar('Registro actualizado'))
}else {
  this.heroeService.agregarHeroe (this.heroe).subscribe(heroe => {this.router.navigate(['/heroes',heroe.id]);
  this.mostrarSnackbar('Registro creado')
  })
}
}
borrarHeroe(){
  const dialog= this.dialog.open(ConfirmarComponent,{
    width:'250px',
    data:this.heroe,
  });
  dialog.afterClosed().subscribe(
    (result) =>{
      this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp => {
        this.router.navigate(['/heroes']);
      })
    }
  )
//  this.heroeService.borrarHeroe(this.heroe.id!).
//  subscribe(resp =>{ 
 //   this.router.navigate(['/heroes'])
 // })
  }

  mostrarSnackbar(mensaje:string){
    this.snackBar.open(mensaje, 'Ok!',{
      duration:2500
    });
  }
  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
        return;
    }
    this.activatedRoute.params.pipe(
      switchMap(({id})=>this.heroeService.getHeroePorId(id))
    ).subscribe(heroe=>this.heroe=heroe);
  }
}
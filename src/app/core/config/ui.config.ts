// Angular core modules
import { NgModule } from '@angular/core';


// libs
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    ToastrModule.forRoot()
  ]
})
export class UIConfigModule {}

import { Product } from './product';
import { User } from './user';

export class Movement {

   Id: any;
   ProductMoved: Product;
   Type_of_movement: string;
   MovementOrigin: User;
   Statut: string;
   Number: any;
   Value: any;
   Date: Date;
}

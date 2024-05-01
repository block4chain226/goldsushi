import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

type TypeItem = {
  id: string;
  addIngredients?: string[];
};

export class CreateOrderDto {
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  items: TypeItem;
  @IsOptional()
  @IsString()
  deliveryAt: string;
  @IsNumber()
  cost: number;
  @IsString()
  address: string;
  @IsBoolean()
  isDelivered: boolean;
  @IsUUID()
  userId: string;
  @IsUUID()
  orderTypeId: string;
  @IsUUID()
  paymentTypeId: string;
}
// items: [{itemId, addIngredients:[]}]
// TODO user add to cart -> transaction create order -> return orderId -> create carts with orderId

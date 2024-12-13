import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Cart } from "../orders/entities/cart.entity";

@Injectable()
export class TestService {
  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {

  }

  async getAllCartOrders(): Promise<any> {
    // return await this.dataSource.getRepository(Cart).query("select c.order_id, o.cost " +
    //   "from cart c left join orders o on o.order_id = c.order_id"
    // );
    return await this.dataSource.getRepository(Cart).createQueryBuilder("cart").leftJoinAndSelect("cart.order", "order").where("order.cost >= :cost", { cost: "250" }).getMany();
  }
}

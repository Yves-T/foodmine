import { HTTP_BAD_REQUEST } from "@constants/http_status";
import { OrderStatus } from "@constants/order_status";
import { OrderModel } from "@models/order.model";
import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import auth from "@middlewares/auth.mid";

const router = Router();
router.use(auth);

export interface tUserAuthRequest extends Request {
  user?: string;
}

router.post(
  "/create",
  asyncHandler(async (req: tUserAuthRequest, res: Response) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send("Cart is empty!");
      return;
    }

    const id = req.user;

    await OrderModel.deleteOne({ user: id, status: OrderStatus.NEW });

    const newOrder = new OrderModel({ ...requestOrder, user: id });
    await newOrder.save();
    res.send(newOrder);
  }),
);

router.get(
  "/newOrderForFCurrentUser",
  asyncHandler(async (req: tUserAuthRequest, res: Response) => {
    const id = req.user;
    const order = await OrderModel.findOne({
      user: id,
      status: OrderStatus.NEW,
    });
    if (order) {
      res.send(order);
    } else {
      res.status(HTTP_BAD_REQUEST).send();
    }
  }),
);
export default router;

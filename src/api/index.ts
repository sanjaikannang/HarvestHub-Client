import { auth } from "./auth.api";
import { admin } from "./admin.api";
import { farmer } from "./farmer.api";
import { buyer } from "./buyer.api";
import { deliveryPartner } from "./delivery-partner.api";
import { inspector } from "./inspector.api";
import { category } from "./category.api";
import { product } from "./product.api";
import { inspection } from "./inspection.api";
import { collectionCenter } from "./collection-center.api";
import { collectionCenterInventory } from "./collection-center-inventory.api";
import { bidding } from "./bidding.api";
import { payment } from "./payment.api";
import { order } from "./order.api";
import { payout } from "./payout.api";
import { platformSettings } from "./platform-settings.api";

export const api = {
    auth,
    admin,
    farmer,
    buyer,
    deliveryPartner,
    inspector,
    category,
    product,
    inspection,
    collectionCenter,
    collectionCenterInventory,
    bidding,
    payment,
    order,
    payout,
    platformSettings,
};

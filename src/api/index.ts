import { auth } from "./auth.api";
import { admin } from "./admin.api";
import { farmer } from "./farmer.api";
import { buyer } from "./buyer.api";
import { deliveryPartner } from "./delivery-partner.api";

export const api = {
    auth,
    admin,
    farmer,
    buyer,
    deliveryPartner,
};

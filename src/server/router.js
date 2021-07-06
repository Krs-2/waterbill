import userRouter from "./api/user.js";
import monthlyBillRouter from "./api/monthlybill";
import memberBillRouter from "./api/memberbill";

const apiroutes = { "/user": userRouter, "/monthlybill": monthlyBillRouter, "/memberbill": memberBillRouter };

export default apiroutes;

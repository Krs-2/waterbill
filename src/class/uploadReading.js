import moment from "moment";

export class UploadReading {
  constructor({ billId, userId, memberBillId, isApproved, billImage, consumedUnits, estimatedBill }) {
    this.billId = billId;
    this.userId = userId;
    this.memberBillId = memberBillId;
    this.isApproved = isApproved;
    this.billImage = billImage;
    this.consumedUnits = consumedUnits;
    this.estimatedBill = estimatedBill;
  }
  print() {
    console.log(
      "\tbillId : " +
        this.billId +
        "\tuserId : " +
        this.userId +
        "\tmemberBillId : " +
        this.memberBillId +
        "\tisApproved : " +
        this.isApproved +
        "\tbillImage : " +
        this.billImage +
        "\tconsumedUnits : " +
        this.consumedUnits +
        "\testimatedBill : " +
        this.estimatedBill
    );
  }
}

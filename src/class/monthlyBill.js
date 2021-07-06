import moment from "moment";
class MonthlyBill {
  constructor({ billId, startDate, endDate, year, month, totalUnits, totalBill, ratePerUnit, billImage, isActive }) {
    this.billId = billId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.year = year;
    this.month = month;
    this.totalUnits = totalUnits - 0;
    this.totalBill = totalBill - 0;
    this.ratePerUnit = ratePerUnit;
    this.billImage = billImage;
    this.isActive = isActive;
    this.updatedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  }
  print() {
    console.log(
      "Object  - " +
        "\t billId:" +
        this.billId +
        "\t startDate:" +
        this.startDate +
        "\t endDate:" +
        this.endDate +
        "\t year:" +
        this.year +
        "\t month:" +
        this.month +
        "\t totalUnits:" +
        this.totalUnits +
        "\t totalBill:" +
        this.totalBill +
        "\t ratePerUnit:" +
        this.ratePerUnit +
        "\t billImage:" +
        this.billImage +
        "\t updatedDate:" +
        this.updatedDate +
        "\t isActive" +
        this.isActive
    );
  }
}

export default MonthlyBill;

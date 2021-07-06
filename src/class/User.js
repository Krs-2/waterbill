import moment from "moment";
class User {
  constructor({ userId, name, blockNumber, plotNumber, isAdmin, phoneNumber, email, picture, password }) {
    this.userId = userId;
    this.name = name;
    this.blockNumber = blockNumber;
    this.plotNumber = plotNumber;
    this.isAdmin = isAdmin;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.picture = picture;
    this.userCreation = moment().format("YYYY-MM-DD HH:mm:ss");
    this.password = password;
  }
  print() {
    console.log(
      "\t" +
        "userId :" +
        this.userId +
        "\t" +
        "name :" +
        this.name +
        "\t" +
        "blockNumber :" +
        this.blockNumber +
        "\t" +
        "plotNumber :" +
        this.plotNumber +
        "\t" +
        "isAdmin :" +
        this.isAdmin +
        "\t" +
        "phoneNumber :" +
        this.phoneNumber +
        "\t" +
        "email :" +
        this.email +
        "\t" +
        "picture :" +
        this.picture +
        "\t" +
        "userCreation :" +
        this.userCreation +
        "\t" +
        "password :" +
        this.password
    );
  }
}

export default User;

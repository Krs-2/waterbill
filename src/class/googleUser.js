class GoogleUser {
  constructor(tokenId, accessToken, googleId, { imageUrl, email, name }) {
    this.tokenId = tokenId;
    this.accessToken = accessToken;
    this.googleId = googleId;
    this.email = email;
    this.name = name;
    this.imageUrl = imageUrl;
  }
  printSessionData() {
    console.log(
      "tokenId" +
        this.tokenId +
        "accessToken" +
        this.accessToken +
        "googleId" +
        this.googleId +
        "email" +
        this.email +
        "name" +
        this.name +
        "imageUrl" +
        this.imageUrl
    );
  }
  toJson() {
    return {
      tokenId: this.tokenId,
      accessToken: this.accessToken,
      googleId: this.googleId,
      email: this.email,
      name: this.name,
      imageUrl: this.imageUrl,
    };
  }
}
export default GoogleUser;

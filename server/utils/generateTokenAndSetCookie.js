import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.PRIVATE_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 36000 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};


export default generateTokenAndSetCookie;
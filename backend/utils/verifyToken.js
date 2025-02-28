import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers["Authorization"] ||
    req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  req.user = { id: "dummyUserId", email: "test@example.com" };
  console.log(" Bypassing authentication...");
  next();
  if (!authHeader) {
    console.log(" No authorization header found.");
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log(" Token received:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(" Token verification failed:", err.message);
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Invalid token" });
    }
    req.user = user;
    console.log(" User verified:", user);
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
  });
};

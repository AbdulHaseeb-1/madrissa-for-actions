const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.set("trust proxy", "127.0.0.1");
// ✅ Helmet for secure headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "https://admin.jiallama.edu.pk",
      "https://jiallama.edu.pk",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// ✅ Body parser
app.use(bodyParser.json());

// ✅ Parse cookies for JWT auth
app.use(cookieParser());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Strict rate limiter for question submission
const questionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: "Too many submissions from this IP, please try again later.",
});
app.use("/api/user-questions/add", questionLimiter);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Important Headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "trusted-img-cdn.com"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);

app.use(
  helmet.referrerPolicy({
    policy: "no-referrer-when-downgrade",
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  next();
});

app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  })
);

// ✅ Public routes
const bayanCategoryRoutes = require("./routes/public/bayanCategory");
const questionCategoryRoutes = require("./routes/public/questionCategory");
const questionRoutes = require("./routes/public/question");
const userQuestionsRoutes = require("./routes/public/userQuestions");
const sliderRoutes = require("./routes/public/slider");
const bayanRoutes = require("./routes/public/bayan");
const courseRoutes = require("./routes/public/course");
const AdminRoutes = require("./routes/public/admin");
const TaarufRoutes = require("./routes/public/taaruf");
const RandomItemsRoutes = require("./routes/public/randomItems");
const KitaabCategoryRoutes = require("./routes/public/kitaabCategory");
const RegisterCategoryRoutes = require("./routes/public/registerCategory");

// ✅ Admin routes (all use cookie-based auth)
const adminBayanCategoryRoutes = require("./routes/admin/adminBayanCategory");
const adminQuestionCategoryRoutes = require("./routes/admin/adminQuestionCategory");
const adminQuestionRoutes = require("./routes/admin/adminQuestions");
const adminUserQuestionsRoutes = require("./routes/admin/adminUserQuestions");
const sliderAdminRoutes = require("./routes/admin/adminSlider");
const adminBayanRoutes = require("./routes/admin/adminBayan");
const adminCourseRoutes = require("./routes/admin/adminCourse");
const adminUserRoutes = require("./routes/admin/users");
const adminPermissionRoutes = require("./routes/admin/permissions");
const adminRoleRoutes = require("./routes/admin/roles");
const adminTaarufRoutes = require("./routes/admin/Taaruf");
const adminDashoardRoutes = require("./routes/admin/adminDashboard");
const adminKitaabCategoriesRoutes = require("./routes/admin/adminKitaabCategory");
const adminRegisterCategoriesRoutes = require("./routes/admin/adminRegisterCategory");
// const adminFeatureRoutes = require('./routes/admin/features');

// ✅ Public routes
app.use("/api/bayanCategories", bayanCategoryRoutes);
app.use("/api/questionCategories", questionCategoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/user-questions", userQuestionsRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/bayans", bayanRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/taaruf", TaarufRoutes);
app.use("/api/random", RandomItemsRoutes);
app.use("/api/kitaabCategories", KitaabCategoryRoutes);
app.use("/api/registerCategories", RegisterCategoryRoutes);

// ✅ Admin routes

app.use("/api/admin/taaruf", adminTaarufRoutes);
app.use("/api/admin/questions", adminQuestionRoutes);
app.use("/api/admin/bayanCategories", adminBayanCategoryRoutes);
app.use("/api/admin/questionCategories", adminQuestionCategoryRoutes);
app.use("/api/admin/user-questions", adminUserQuestionsRoutes);
app.use("/api/admin/slider", sliderAdminRoutes);
app.use("/api/admin/bayans", adminBayanRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/permissions", adminPermissionRoutes);
app.use("/api/admin/roles", adminRoleRoutes);
app.use("/api/admin/courses", adminCourseRoutes);
app.use("/api/admin/dashboard", adminDashoardRoutes);
app.use("/api/admin/kitaabCategories", adminKitaabCategoriesRoutes);
app.use("/api/admin/registerCategories", adminRegisterCategoriesRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

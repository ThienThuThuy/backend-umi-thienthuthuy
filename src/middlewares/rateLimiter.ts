import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau!" },
    standardHeaders: true,
    legacyHeaders: false,
});


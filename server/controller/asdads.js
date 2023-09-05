async function sendOTPToEmail(email, otp) {
    const transporter = nodemailer.createTransport({
      // Cấu hình SMTP để gửi email
      service: "Gmail", // Thay "your_email_service_provider" bằng nhà cung cấp dịch vụ email của bạn (ví dụ: Gmail, Outlook, ...)
      auth: {
        user: "trungntpk02230@fpt.edu.vn",
        pass: "u l d z i f u w e j x w u a l a",
      },
    });
  
    const mailOptions = {
      from: "trungntpk02230@fpt.edu.vn",
      to: "trungntpk02230@fpt.edu.vn",
      subject: "Mã OTP xác nhận",
      text: Mã OTP của bạn là: ${otp},
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Error sending email:", error);
    }
  }
  
  router.get(
    "/emailLogin",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/auth/google/protected",
      failureRedirect: "/auth/google/failure",
    })
  );
  
  router.get("/google/failure", (req, res) => {
    res.send("đăng nhập thất bại");
  });
  router.get("/google/protected", isLogin, (req, res) => {
    console.log(req.user);
    const email = req.body.email; // Địa chỉ email của người dùng đã đăng nhập thành công
    const otp = generateOTP(); // Tạo mã OTP
    sendOTPToEmail(email, otp);
    req.session.email = email;
    req.session.otp = otp;
  
    res.render("otp/otp.hbs", { userEmail: email });
  });
  
  router.post("/emailLogin", (req, res) => {
    const userOTP = req.body.otp; // Lấy mã OTP được nhập từ form
    const email = req.session.email; // Lấy email từ session
    const otp = req.session.otp; // Lấy mã OTP từ session
  
    // Kiểm tra xem mã OTP nhập vào có đúng không
    if (userOTP === otp) {
      // Mã OTP đúng, xử lý logic khi xác thực thành công ở đây nếu cần
  
      res.render("screens/home.hbs", { userEmail: email }); // Ví dụ, render đến trang "success.hbs" nếu xác thực thành công
    } else {
      // Mã OTP sai, thông báo lên trang rằng nhập sai mã OTP
      res.render("otp/otp.hbs", {
        errorMessage: "Nhập sai mã OTP, vui lòng thử lại.",
        userEmail: email,
      });
    }
  });
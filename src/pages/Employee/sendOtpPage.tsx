import React, { useEffect, useState } from "react";
import type { FormProps, GetProps } from "antd";
import { Button, Card, Flex, Form, Input, message, Typography } from "antd";
import { debounce } from "lodash";
import { BACKEND_ROUTES } from "../../shared/backendRoutes";
import apiClient from "../../configs/axios.config";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../shared/enums/routes.enum";

type FieldTypeSendOtp = {
  username: string;
  phoneNumber: string;
};
type FieldTypeForgetPassword = {
  otp: string;
  phoneNumber: string;
};

type OTPProps = GetProps<typeof Input.OTP>;

const { method: sendOtpMethod, url: sendOtpUrl } = BACKEND_ROUTES.auth.sendOtp;
const { method: forgetPasswordMethod, url: forgetPasswordUrl } =
  BACKEND_ROUTES.auth.forgetPassword;

const SendOtpPage: React.FC = () => {
  const navigator = useNavigate();
  const [cellphone, setCellphone] = useState(null);
  const [captcha, setCaptcha] = useState<{ image: string; id: string } | null>(
    null
  );
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

  const [otp, setOtp] = React.useState(null);

  // const fetchCaptcha = async () => {
  //   const { method, url } = BACKEND_ROUTES.auth.captcha;
  //   setLoadingCaptcha(true);
  //   try {
  //     const response = await apiClient[method](url, {
  //       responseType: "blob",
  //     });

  //     const captchaId = response.headers["x-captcha-id"];
  //     const imageBlob = response.data;
  //     const imageUrl = URL.createObjectURL(imageBlob);

  //     setCaptcha({ image: imageUrl, id: captchaId });
  //   } catch (error) {
  //     message.error("مشکلی در دریافت کپچا رخ داد");
  //   } finally {
  //     setLoadingCaptcha(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCaptcha();
  // }, []);

  // const handleRefreshCaptcha = () => {
  //   fetchCaptcha();
  // };
  const onChangeOtp: OTPProps["onChange"] = (text) => {
    setOtp(text as any);
  };

  const [showFirstStep, setShowFirstStep] = React.useState(true);
  const debouncedOnFinishSendOtp = debounce(async (values) => {
    try {
      await apiClient[sendOtpMethod](sendOtpUrl, values);
      setCellphone(values.phoneNumber);
      message.success("کد با موفقیت ارسال شد");
      setShowFirstStep(false);
    } catch (error) {
      message.error(
        (error as any)?.response?.data?.detail ||
          "مشکلی پیش آمد، دوباره تلاش کنید",
        5
      );
    }
  }, 1000);

  const debouncedOnFinishForgetPassword = debounce(async (values) => {
    try {
      await apiClient[forgetPasswordMethod](forgetPasswordUrl, {
        otp: otp,
        phoneNumber: cellphone,
      });
      message.success("اطلاعات ورود برای شما پیامک شد");
      navigator(ROUTES_ENUM.HOME);
    } catch (error) {
      message.error(
        (error as any)?.response?.data?.detail ||
          "مشکلی پیش آمد، دوباره تلاش کنید"
      );
    }
  }, 1000);

  const onFinishFailed: FormProps<FieldTypeSendOtp>["onFinishFailed"] = (
    errorInfo
  ) => {};

  if (showFirstStep) {
    return (
      <>
        <Flex justify="center" align="center" style={{ marginTop: "2%" }}>
          <Card
            title={
              <Flex align="center" justify="center">
                {/* <img
src="/douranLogo.png" // Update this with your logo path
alt="Logo"
style={{
width: "50px",
height: "50px",
marginRight: "10px",
}}
/> */}
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  فراموشی اطلاعات ورود{" "}
                </span>
              </Flex>
            }
            bordered={false}
            style={{
              width: 400,
              height: 400,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form
              name="basic"
              labelCol={{}}
              wrapperCol={{}}
              style={{ maxWidth: 500, width: "100%" }}
              initialValues={{ remember: true }}
              onFinish={debouncedOnFinishSendOtp}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldTypeSendOtp>
                label="تلفن همراه"
                wrapperCol={{ offset: 0, span: 24 }}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "تلفن همراه خود را وارد نمایید",
                  },
                  {
                    pattern: /^0\d{10}$/,
                    message: "فقط اعداد انگلیسی -  شروع با 0",
                  },
                ]}
              >
                <Input
                  style={{ direction: "ltr" }}
                  placeholder="09123456789"
                  maxLength={11}
                />
              </Form.Item>

              <Form.Item<FieldTypeSendOtp>
                label="نام کاربری"
                wrapperCol={{ offset: 0, span: 24 }}
                name="username"
                rules={[
                  { required: true, message: "نام کاربری خود را وارد نمایید" },
                ]}
              >
                <Input style={{ direction: "ltr" }} placeholder="caa_***" />
              </Form.Item>

              {/* -------------- captcha ------------------ */}
              {/* CAPTCHA SECTION */}
              {/* {captcha && (
                <Flex vertical align="center">
                  <img
                    src={captcha.image}
                    alt="captcha"
                    style={{ marginBottom: "10px", borderRadius: "5px" }}
                  />
                  <Button
                    type="link"
                    onClick={handleRefreshCaptcha}
                    loading={loadingCaptcha}
                  >
                    دریافت کپچای جدید
                  </Button>
                </Flex>
              )}

              <Form.Item
                name="captcha"
                rules={[{ required: true, message: "کد امنیتی را وارد کنید" }]}
              >
                <Input placeholder="کد امنیتی را وارد کنید" />
              </Form.Item> */}

              {/* ------------------------- */}
              <div style={{ marginBottom: "3rem" }}></div>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "60%",
                    backgroundColor: ColorPalletEnum.Primary,
                  }}
                >
                  ارسال کد یکبار مصرف
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </>
    );
  } else {
    //------
    return (
      <>
        <Flex justify="center" align="center" style={{ marginTop: "2%" }}>
          <Card
            title={
              <Flex align="center" justify="center">
                {/* <img
            src="/douranLogo.png" // Update this with your logo path
            alt="Logo"
            style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
            }}
        /> */}
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  دریافت اطلاعات{" "}
                </span>
              </Flex>
            }
            bordered={false}
            style={{
              width: 400,
              height: 460,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form
              name="basic"
              style={{ maxWidth: 500, width: "100%" }}
              initialValues={{ remember: true }}
              onFinish={debouncedOnFinishForgetPassword}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Flex justify="center" vertical>
                <Typography.Paragraph style={{ fontSize: "15px" }}>
                  • کد یکبار مصرف دریافت شده را وارد نمایید، اطلاعات ورود برای
                  شما پیامک خواهد شد
                </Typography.Paragraph>
                <Typography.Paragraph style={{ fontSize: "15px" }}>
                  • در صورت عدم دریافت کد کمی صبر نموده و پس از ۲ دقیقه مجددا کد
                  یکبار مصرف را دریافت کنید
                </Typography.Paragraph>
              </Flex>

              <div style={{ marginBottom: "3rem" }}></div>

              <Form.Item<FieldTypeForgetPassword>
                // label="کد یکبار مصرف"
                // wrapperCol={{ offset: 0, span: 24 }}
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "نام کاربری خود را وارد نمایید",
                  },
                ]}
              >
                <Flex justify="center">
                  <Input.OTP
                    size="large"
                    length={4}
                    style={{ direction: "ltr", textAlign: "center" }}
                    formatter={(str) => str.toUpperCase()}
                    onChange={onChangeOtp}
                  />
                </Flex>
              </Form.Item>

              <div style={{ marginBottom: "3rem" }}></div>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "40%",
                    backgroundColor: ColorPalletEnum.Primary,
                  }}
                >
                  دریافت{" "}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </>
    );

    //------
  }
};

export default SendOtpPage;

// import React from "react";
// import { Flex, Input, Typography } from "antd";
// import type { GetProps } from "antd";

// type OTPProps = GetProps<typeof Input.OTP>;

// const { Title } = Typography;

// const App: React.FC = () => {
//   const onChange: OTPProps["onChange"] = (text) => {
//     console.log("onChange:", text);
//   };

//   const onInput: OTPProps["onInput"] = (value) => {
//     console.log("onInput:", value);
//   };

//   const sharedProps: OTPProps = {
//     onChange,
//     onInput,
//   };

//   return (
//     <Flex gap="middle" align="flex-start" vertical>
//       <Title level={5}>With formatter (Upcase)</Title>
//       <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
//       <Title level={5}>With Disabled</Title>
//       <Input.OTP disabled {...sharedProps} />
//       <Title level={5}>With Length (8)</Title>
//       <Input.OTP length={8} {...sharedProps} />
//       <Title level={5}>With variant</Title>
//       <Input.OTP variant="filled" {...sharedProps} />
//       <Title level={5}>With custom display character</Title>
//       <Input.OTP mask="🔒" {...sharedProps} />
//     </Flex>
//   );
// };

// export default App;

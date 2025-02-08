import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { debounce } from "lodash";
import { BACKEND_ROUTES } from "../../shared/backendRoutes";
import apiClient from "../../configs/axios.config";
import { ColorPalletEnum } from "../../shared/enums/colorPallet.enum";

type FieldType = {
  username: string;
  phoneNumber: string;
};

const { method, url } = BACKEND_ROUTES.auth.sendOtp;

const SendOtpPage: React.FC = () => {
  const debouncedOnFinish = debounce(async (values) => {
    try {
      await apiClient[method](url, values);
      message.success("درخواست با موفقیت ارسال شد");
    } catch (error) {
      message.error(
        (error as any)?.response?.data?.detail ||
          "مشکلی پیش آمد، دوباره تلاش کنید"
      );
    }
  }, 1000);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

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
            height: 460,
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
            onFinish={debouncedOnFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
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

            <Form.Item<FieldType>
              label="نام کاربری"
              wrapperCol={{ offset: 0, span: 24 }}
              name="username"
              rules={[
                { required: true, message: "نام کاربری خود را وارد نمایید" },
              ]}
            >
              <Input style={{ direction: "ltr" }} placeholder="cao_***" />
            </Form.Item>

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
};

export default SendOtpPage;

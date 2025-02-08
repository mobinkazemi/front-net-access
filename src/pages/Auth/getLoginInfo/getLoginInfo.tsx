import React from "react";
import type { FormProps } from "antd";
import { Button, Card, Flex, Form, Input, message } from "antd";
import { requestForLoginInfo } from "./functions/requestForLoginInfo";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import apiClient from "../../../configs/axios.config";
import { BACKEND_ROUTES } from "../../../shared/backendRoutes";
import { debounce } from "lodash";

type FieldType = {
  name: string;
  lastName: string;
  phoneNumber: string;
};

const { method, url } = BACKEND_ROUTES.auth.guest;
/*************  ✨ Codeium Command ⭐  *************/
/**
 * LoginPage component renders a login form where users can enter their phone number to receive login information.
 * 
 * Features:
 * - Uses a debounced function to handle form submission, preventing rapid repeated API calls.
 * - Displays success or error messages based on the result of the API call.
 * - Validates phone number input to ensure it starts with '0' and is 11 digits long.
 * - Utilizes Ant Design components for a structured and styled layout.
 */

/******  91a3685c-96af-4c65-9dc5-5b4aded3c54a  *******/
const LoginPage: React.FC = () => {
  const navigator = useNavigate();

  const debouncedOnFinish = debounce(async (values) => {
    try {
      const response = await apiClient[method](url, values);
      console.log(response);
      message.success("درخواست با موفقیت ارسال شد");
    } catch (error) {
      console.error(error);
      message.error("مشکلی پیش آمد، دوباره تلاش کنید");
    }
  }, 1000); // 1000ms (1 second) debounce delay

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const apiResult = apiClient[method](url, values)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
    console.log(apiResult);
  };

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
                دریافت اطلاعات ورود{" "}
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
                { required: true, message: "تلفن همراه خود را وارد نمایید" },
                {
                  pattern: /^0\d{10}$/,
                  message: "فقط اعداد انگلیسی -  شروع با 0",
                },
              ]}
            >
              <Input placeholder="09123456789" maxLength={11} />
            </Form.Item>

            <div style={{ marginBottom: "3rem" }}></div>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{
                  width: "30%",
                  backgroundColor: ColorPalletEnum.Primary,
                }}
              >
                دریافت
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default LoginPage;

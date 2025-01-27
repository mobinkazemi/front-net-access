import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../../shared/enums/routes.enum";
import { ColorPalletEnum } from "../../../../shared/enums/colorPallet.enum";

export const contentOfNotLoggedIn = () => {
  const navigator = useNavigate();

  const onClickForgotPassword = () => {
    navigator(ROUTES_ENUM.RESET);
  };
  const onClickLogin = () => {
    navigator(ROUTES_ENUM.LOGIN);
  };

  return (
    <Flex justify="center" align="center" vertical>
      <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
        {/* <h2></h2> */}
      </div>{" "}
      <div>
        <Button
          onClick={onClickLogin}
          type="primary"
          style={{
            width: "10rem",
            height: "4rem",
            fontSize: "1.1rem",
            marginBottom: "1rem",
            backgroundColor: ColorPalletEnum.Primary,
          }}
        >
          دریافت اطلاعات ورود{" "}
        </Button>
      </div>
      <div>
        <Button
          onClick={onClickForgotPassword}
          type="primary"
          style={{
            width: "10rem",
            height: "4rem",
            fontSize: "1rem",
            backgroundColor: ColorPalletEnum.Forgotten_Password,
          }}
        >
          فراموشی اطلاعات ورود{" "}
        </Button>
      </div>
    </Flex>
  );
};

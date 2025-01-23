import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { ColorPalletEnum } from "../../../shared/enums/colorPallet.enum";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "../../../shared/enums/routes.enum";

const onLoginContent = () => {
  const navigator = useNavigate();
  const menu = (
    <Menu>
      {/* <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => navigator(ROUTES_ENUM.HOME)}
      >
        View Profile
      </Menu.Item> */}
      <Menu.Item
        key="login"
        icon={<LogoutOutlined />}
        onClick={() => {
          navigator(ROUTES_ENUM.LOGIN);
        }}
      >
        ورود
      </Menu.Item>
      <Menu.Item
        key="register"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.clear();
          navigator(ROUTES_ENUM.REGISTER);
        }}
      >
        دریافت اطلاعات ورود
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-navigation-profile-section">
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="profile-dropdown">
          <Avatar
            size="large"
            icon={<UserOutlined style={{ color: ColorPalletEnum.Primary }} />}
            style={{
              paddingLeft: "10px",
              paddingBottom: "10px",
              marginLeft: "10px",
              cursor: "pointer",
              backgroundColor: ColorPalletEnum.WhiteContentBackground,
            }}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default onLoginContent;

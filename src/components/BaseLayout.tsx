import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { ColorPalletEnum } from "../shared/enums/colorPallet.enum";
const { Content, Footer } = Layout;

const BaseLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
      <Layout>
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: ColorPalletEnum.WhiteContentBackground,
            borderRadius: "10px",
            borderBottom: `2px solid ${ColorPalletEnum.Border}`,
            overflow: "auto",
            maxHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <Footer style={{ textAlign: "center" }}>Net Access ©2025</Footer>
    </Layout>
  );
};

export default BaseLayout;

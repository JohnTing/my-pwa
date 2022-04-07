

import { BarChartOutlined, CloseSquareOutlined } from "@ant-design/icons"
import { Button, Layout, Menu } from "antd";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { SignoutModel } from "./SignoutModel";

const { Header, Content, Footer, Sider } = Layout;






export function AppLayout() {



/*
                <Menu.Item key="1" icon={<BarChartOutlined />}>
                    <Link to={"dashboard"}>dashboard</Link>
                </Menu.Item>

                <Menu.Item key="999" icon={<CloseSquareOutlined />}>
                <SignoutModel/>
                </Menu.Item>
*/
    return <Layout>

        <Header >
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            
            <Menu.Item key="1" icon={<BarChartOutlined />}>
                    <Link to={"dashboard"}>dashboard</Link>
                </Menu.Item>

                <Menu.Item key="999" icon={<CloseSquareOutlined />}>
                <SignoutModel/>
                </Menu.Item>


            </Menu>

        </Header>

        <Content style={{ margin: '8px 8px 0' }}>

                <Outlet />

        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>

    </Layout>
}
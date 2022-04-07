import { Button, Layout, Menu } from "antd"
import { getAuth, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom"
import Login from "./Login"
import MyMap from "./MyMap"
import Dashboard from "./Dashboard"
import { isLoginIn } from "../utils/firebase"

import { AppLayout } from "./AppLayout"



export function AppRouters() {


    const routers: RouteObject[] = [
        {
            path: '/app',
            element: isLoginIn() ?
            <AppLayout/>
                : <Navigate to="/login" />,
            children: [
                { path: 'dashboard', element: <Dashboard /> }
            ]
        },
        {
            path: '/',
            element: !isLoginIn() ? <Login />
                : <Navigate to="/app" />,
            children: [
                { path: '/login', element: <Login /> }
            ],
        }
    ]

    return useRoutes(routers)
}
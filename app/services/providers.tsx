"use client"

import { store } from "@/lib/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"
import { AuthProvider } from "./userProvider"

export default function Providers ({children}: {children: ReactNode}) {
    return <>
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    </>
}
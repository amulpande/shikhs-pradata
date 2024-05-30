import LoginHomePage from "@/app/(main)/login/page"
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { store } from "@lib/store/store";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        // login page uses userouter so made mock 
        push: jest.fn(),
    }),
}));

describe('Login home page test', () => {

    it('Should take email and password input', () => {
        render(
            <Provider store={store}>

                <LoginHomePage />
            </Provider>
        )

        const myEmailInput = screen.getByLabelText('Email')
        const myPasswordInput = screen.getByLabelText('Password')

        fireEvent.change(myEmailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(myPasswordInput, { target: { value: 'password123' } })
    })
})
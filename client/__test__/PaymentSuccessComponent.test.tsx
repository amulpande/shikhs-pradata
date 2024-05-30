import { fireEvent, render, screen } from '@testing-library/react'
import PaymentSuccessComponent from '@/app/payment/success/page'

// describe
describe("Payment-SuccessFull-Page",()=>{
    it("Should have Payment Complete",() => {
        render(<PaymentSuccessComponent/>)

        const myEelement = screen.getByText('Payment Complete')

        expect(myEelement).toBeInTheDocument()
    })
})

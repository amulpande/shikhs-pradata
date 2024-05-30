import { fireEvent, render, screen } from "@testing-library/react"
import ProfilePage from "@/app/(main)/profile/page"
import { toBeEnabled } from "@testing-library/jest-dom/matchers"

describe('Profile Page Test',()=>{
    it('Renders inputs fields and check they are disabled or not on edit click button',()=>{
        render(<ProfilePage/>)
        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *")
        const contactInput = screen.getByLabelText("Mobile number *")
        const AddressInput = screen.getByLabelText("Address *")

        expect(firstNameInput).toBeDisabled()
        expect(lastNameInput).toBeDisabled()
        expect(contactInput).toBeDisabled()
        expect(AddressInput).toBeDisabled()

        const buttonToCheck = screen.getByRole('button',{name:'Edit profile'})
        fireEvent.click(buttonToCheck)

        expect(firstNameInput).toBeEnabled()
        expect(lastNameInput).toBeEnabled()
        expect(contactInput).toBeEnabled()
        expect(AddressInput).toBeEnabled()
    }),

    it('Checks that input are taking values or not',()=>{
        render(<ProfilePage/>)

        const firstNameInput = screen.getByLabelText("First Name *");
        const lastNameInput = screen.getByLabelText("Last Name *")
        const contactInput = screen.getByLabelText("Mobile number *")
        const AddressInput = screen.getByLabelText("Address *")

        fireEvent.change(firstNameInput,{target : {value:'Amul Pande'}})
        fireEvent.change(lastNameInput,{target : {value:'Amul Pande'}})
        fireEvent.change(contactInput,{target : {value:'Amul Pande'}})
        fireEvent.change(AddressInput,{target : {value:'Amul Pande'}})
    })
})

// describe('Profile Page test',()=>{
    
// })
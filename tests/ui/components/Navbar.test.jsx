import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { Navbar } from "../../../src/ui"

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));
describe('test in Navbar', () => { 
    test('should display the userName', () => { 
        render(
            <AuthContext.Provider value={{logged:true, user:'Miguel Herrera'}}>
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar />  
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Miguel Herrera')).toBeTruthy();
     })
     
     test('should call logout and navigate when the button (Logout) is clicked', () => { 
        render(
            <AuthContext.Provider value={{logged:true, user:'Miguel Herrera', logout: jest.fn()}}>
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar />  
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const buttonLogout = screen.getByRole('button',{name: 'Logout'});
        fireEvent.click(buttonLogout);
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {"replace": true} )

     })
 })
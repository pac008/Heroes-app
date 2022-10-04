import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('test en AppRouter', () => { 
    test('should display the login if is not authenticated', () => { 
        const contextValue = {
            logged: false
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getAllByText('Login').length).toBe(2);
     });

     test('should display the component the marvel if is autenticated', () => { 
        const contextValue = {
            logged: true,
            user: 'Miguel'
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(screen.getByText('MarvelPage')).toBeTruthy();
      })
 });
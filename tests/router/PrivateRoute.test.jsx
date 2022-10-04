import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";


describe('test in PrivateRoute', () => { 
    test('if is authenticated should display the children', () => { 
        Storage.prototype.setItem = jest.fn();
        const contextValue = {
            logged: true,
            user: 'Miguel'
        };
        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/marvel']} >
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Private Route') ).toBeTruthy()
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/marvel")
     });
 });
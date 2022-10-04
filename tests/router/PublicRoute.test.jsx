import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('test in PublicRoute', () => { 
    test('if is not authenticated should display the children', () => { 
        
        const contextValue = {
            logged: false
        }
       
        render(
            <AuthContext.Provider value={contextValue} >
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        // screen
        expect( screen.getByText('Public Route') ).toBeTruthy()
     });

    test('shuold navigate if is authenticated', () => { 
        
        const contextValue = {
            logged: true,
            user: 'Miguel'
        }
       
        render(
            <AuthContext.Provider value={contextValue} >
                <MemoryRouter initialEntries={['/login']} >
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Marvel page</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // screen
        expect( screen.getByText('Marvel page') ).toBeTruthy()
     });
 })
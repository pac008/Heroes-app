

import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Searchpage } from "../../../src/heroes"

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

// jest.mock('../../../src/heroes', () => ({
//     ...jest.requireActual('react-router-dom'),
//     // useNavigate: () => mockedUseNavigate
// }))

describe('test in SeatchPage', () => { 
    test('should display correctly with default values', () => { 
       const { container } = render(
            <MemoryRouter>
                <Searchpage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
     });

    test('should display to batman and the Input with query values', () => { 
       render(
            <MemoryRouter initialEntries={['/search?q=batman']}>  
                <Searchpage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
     });

    test('should display an error if the heroe is not founded (batman123)', () => { 
       render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>  
                <Searchpage />
            </MemoryRouter>
        );
        const text1 = screen.getByText('Not hero with');
        const text2 = screen.getByText('batman123');
        expect(text1).toBeTruthy();
        expect(text2).toBeTruthy();
     });

    test('should call the navigate to the new screen', () => { 
       render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>  
                <Searchpage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'superman'}})
        const form = screen.getByLabelText('form');
        fireEvent.submit(form);
        
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman')
     });

 })
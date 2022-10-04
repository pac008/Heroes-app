import { authReducer }  from "../../../src/auth/context/authReducer";
import { types }  from "../../../src/auth/types/types";

const initialState = {
    logged: false,
    // name: 'Miguel'
}

describe('Test in authReducer', () => { 
    test('should return the default state', () => { 
        const state = authReducer(initialState, {});
        expect(state.logged).toBeFalsy();
     });

    test('should call login and set the user', () => { 
        const state = authReducer(initialState, { type: types.login, payload: 'Miguel' });
        expect(state.logged).toBeTruthy();
        expect(state.user).toBe('Miguel');
     });

    test('should call login and set the user', () => { 
        const stateLogeed = authReducer(initialState, { type: types.login, payload: 'Miguel' });
        console.log('sate1',stateLogeed);
        const state = authReducer(state, { type: types.logout});
        console.log('sate',state);
        
        expect(state.logged).toBeFalsy();
     });
 });
import LoginValidate from './login_validate';

describe('LoginValidate', () => {
    it('should return error if email is not provided', () => {
        const values = { password: 'password' };
        const result = LoginValidate(values);

        expect(result).toEqual({ email: 'Required' });
    });

    it('should return error if email is invalid', () => {
        const values = { email: 'invalid', password: 'password' };
        const result = LoginValidate(values);

        expect(result).toEqual({ email: 'Invalid email address' });
    });

    it('should return error if password is not provided', () => {
        const values = { email: 'email@example.com' };
        const result = LoginValidate(values);

        expect(result).toEqual({ password: 'Required' });
    });

    it('should return error if password length is less than 8 characters', () => {
        const values = { email: 'email@example.com', password: 'pass' };
        const result = LoginValidate(values);

        expect(result).toEqual({ password: 'must 8-20 characters long' });
    });

    it('should return error if password length is more than 20 characters', () => {
        const values = { email: 'email@example.com', password: 'passwordpasswordpassword' };
        const result = LoginValidate(values);

        expect(result).toEqual({ password: 'must 8-20 characters long' });
    });

    it('should return error if password contains spaces', () => {
        const values = { email: 'email@example.com', password: 'password password' };
        const result = LoginValidate(values);

        expect(result).toEqual({ password: 'Invalid password' });
    });

    it('should return empty object if all values are provided and email and password are valid', () => {
        const values = { email: 'email@example.com', password: 'password' };
        const result = LoginValidate(values);

        expect(result).toEqual({});
    });
});

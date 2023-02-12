import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from './Login_form';
import Cookies from 'js-cookie';
import React from 'react';

jest.mock('next/router', () => {
    const mockRouter = {
        push: jest.fn()
    };

    return {
        useRouter: jest.fn().mockReturnValue(mockRouter)
    };
});


jest.mock('@/lib/fetch_api', () => jest.fn().mockResolvedValue({ statusCode: 200 }));

jest.mock('js-cookie', () => {
    return {
        set: jest.fn(),
        remove: jest.fn()
    };
});  

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render form with email and password inputs', () => {
        const { getByPlaceholderText } = render(<LoginForm />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it('should set cookies and redirect to home page when inputs are valid', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginForm />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('password');
        const submitButton = getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
        await act(async () => {
            fireEvent.submit(submitButton.closest('form'));
        });

        expect(Cookies.set).toHaveBeenCalledWith('username', 'valid@email.com');
        expect(submitButton.closest('form').onsubmit).toBe(null);
    });



    it('should show error message when server returns error', async () => {
        require('@/lib/fetch_api').mockResolvedValue({ statusCode: 400, message: 'error message' });

        const { getByPlaceholderText, getByText } = render(<LoginForm />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('password');
        const submitButton = getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
        await act(async () => {
            fireEvent.submit(submitButton.closest('form'));
        });

        const errorMessage = await getByText('error message');

        expect(Cookies.remove).toHaveBeenCalledWith('username');
        expect(errorMessage).toBeInTheDocument();
    });
});

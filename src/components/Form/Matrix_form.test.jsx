import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MatrixForm } from './Matrix_form';
import { MatrixValidate } from '@/lib/matrix_validate';

jest.mock('@/lib/matrix_validate', () => ({
  MatrixValidate: jest.fn(() => ({})),
}));

jest.mock('@/lib/fetch_api', () => jest.fn());

describe('MatrixForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with inputs and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<MatrixForm />);

    const matrixInput = getByPlaceholderText('[[1,4,7,8],[10,14,18,20],[23,30,32,65]]');
    const targetInput = getByPlaceholderText('32 (input numbers only)');
    const { getAllByTestId } = render(<MatrixForm />);
    const computeButton = getAllByTestId('compute-button');

    expect(matrixInput).toBeTruthy();
    expect(targetInput).toBeTruthy();
    expect(computeButton).toBeTruthy();
  });

  it('calls the MatrixValidate function when the form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(<MatrixForm />);

    const matrixInput = getByPlaceholderText('[[1,4,7,8],[10,14,18,20],[23,30,32,65]]');
    const targetInput = getByPlaceholderText('32 (input numbers only)');
    const submitButton = getByText('Compute');

    fireEvent.change(matrixInput, { target: { value: '[[1,2],[3,4]]' } });
    fireEvent.change(targetInput, { target: { value: '3' } });
    await act(async () => {
            fireEvent.submit(submitButton.closest('form'));
        });

    expect(MatrixValidate).toHaveBeenCalled();
  });
});

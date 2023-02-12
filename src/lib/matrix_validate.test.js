import { MatrixValidate } from './matrix_validate';

describe('MatrixValidate', () => {
    it('should return error if matrix is not provided', () => {
        const values = { target: 'target' };
        const result = MatrixValidate(values);

        expect(result).toEqual({ matrix: 'Required' });
    });

    it('should return error if matrix is invalid', () => {
        const values = { matrix: 'invalid', target: 'target' };
        const result = MatrixValidate(values);

        expect(result).toEqual({ matrix: 'Invalid matrix' });
    });

    it('should return error if target is not provided', () => {
        const values = { matrix: '[[1,2],[3,4]]' };
        const result = MatrixValidate(values);

        expect(result).toEqual({ target: 'Required' });
    });

    it('should return empty object if all values are provided and matrix is valid', () => {
        const values = { matrix: '[[1,2],[3,4]]', target: 'target' };
        const result = MatrixValidate(values);

        expect(result).toEqual({});
    });
});

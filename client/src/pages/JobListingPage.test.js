import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobListingPage from './JobListingPage';
import axios from 'axios';

// Mocking axios for consistent test results
jest.mock('axios');



describe('JobListingPage - handlePreferenceToggle', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { _id: '1', title: 'Frontend Developer', location: 'Wellington', salary: '70k', sector: 'IT', workType: 'Full-Time', description: 'Frontend dev job', datePosted: new Date() },
                { _id: '2', title: 'Backend Developer', location: 'Christchurch', salary: '80k', sector: 'IT', workType: 'Full-Time', description: 'Backend dev job', datePosted: new Date() }
            ],
        });
    });

    it('should clear region when location preference is checked', async () => {
        await act(async () => {
            render(<JobListingPage />);
        });

        // Initially, the location preference is checked, and region select should be empty
        const locationCheckbox = screen.getByLabelText(/Location/i);
        expect(locationCheckbox.checked).toBe(true);

        // Simulate unchecking the location checkbox
        fireEvent.click(locationCheckbox);
        expect(locationCheckbox.checked).toBe(false);

        // Check that the region filter is cleared after unchecking the location checkbox
        const regionSelect = screen.getByLabelText(/Region/i);
        expect(regionSelect.value).toBe('');
    });

    it('should fetch jobs and display them', async () => {
        await act(async () => {
            render(<JobListingPage />);
        });

        // Wait for jobs to load and verify that they are displayed
        await waitFor(() => {
            expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
            expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
        });
    });
});

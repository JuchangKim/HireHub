// JC - Testing for job preferences card

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobPreferences from './JobPreferences';

// JC - Mock data for formData
const mockFormData = {
  jobPreferences: {
    jobTitle: '',
    location: '',
    salary: '',
    industry: '',
  },
};

// JC - Mock function for handleChange
const mockHandleChange = jest.fn();

describe('JobPreferences Component', () => {
  it('should render the job preferences card', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Check if the Card Title is rendered
    expect(screen.getByText('Job Preferences (Optional)')).toBeInTheDocument();
  });

  it('should render the preferred job title input', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Check if the Job Title input is rendered
    expect(screen.getByLabelText('Preferred Job Title')).toBeInTheDocument();
  });

  it('should call handleChange when preferred job title is changed', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Get the Job Title input and change its value
    const jobTitleInput = screen.getByLabelText('Preferred Job Title');
    fireEvent.change(jobTitleInput, { target: { value: 'Software Engineer' } });

    // JC - Check if handleChange is called
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should render the preferred location dropdown', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Check if the Location dropdown is rendered
    expect(screen.getByLabelText('Preferred Location')).toBeInTheDocument();
  });

  it('should call handleChange when preferred location is changed', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Get the Location dropdown and change its value
    const locationSelect = screen.getByLabelText('Preferred Location');
    fireEvent.change(locationSelect, { target: { value: 'Auckland' } });

    // JC - Check if handleChange is called
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should render the preferred salary dropdown', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Check if the Salary dropdown is rendered
    expect(screen.getByLabelText('Preferred Salary')).toBeInTheDocument();
  });

  it('should call handleChange when preferred salary is changed', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Get the Salary dropdown and change its value
    const salarySelect = screen.getByLabelText('Preferred Salary');
    fireEvent.change(salarySelect, { target: { value: '40-50k' } });

    // JC - Check if handleChange is called
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should render the preferred industry dropdown', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Check if the Industry dropdown is rendered
    expect(screen.getByLabelText('Preferred Industry')).toBeInTheDocument();
  });

  it('should call handleChange when preferred industry is changed', () => {
    render(<JobPreferences formData={mockFormData} handleChange={mockHandleChange} />);

    // JC - Get the Industry dropdown and change its value
    const industrySelect = screen.getByLabelText('Preferred Industry');
    fireEvent.change(industrySelect, { target: { value: 'IT' } });

    // JC - Check if handleChange is called
    expect(mockHandleChange).toHaveBeenCalled();
  });
});

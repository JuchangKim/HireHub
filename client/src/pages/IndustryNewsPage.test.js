import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IndustryNewsPage from './IndustryNewsPage';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// Mock the axios get request
jest.mock('axios');

const mockArticles = [
  {
    id: 1,
    title: 'Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns',
    description: 'A major tech company has just released its latest line of gadgets, promising to revolutionize the market.',
    imageUrl: 'https://example.com/image1.jpg',
    industry: ['IT', 'Engineering'],
    datePosted: '5/10/2024, 9:36:24 AM',
  },
  {
    id: 2,
    title: 'Pedestrian level crossings removed ahead of City Rail Link opening',
    description: 'Seven pedestrian level crossings in Auckland are to be removed to improve safety ahead of the opening of the City Rail Link (CRL).',
    imageUrl: 'https://example.com/image2.jpg',
    industry: ['Engineering'],
    datePosted: '3/10/2024, 3:24:17 PM',
  },
];

describe('IndustryNewsPage', () => {
  beforeEach(() => {
    // Mock the axios get call to return the mockArticles
    axios.get.mockResolvedValue({ data: mockArticles });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and filters', async () => {
    render(
      <BrowserRouter>
        <IndustryNewsPage />
      </BrowserRouter>
    );

    // Check if the search input and select dropdown are present
    expect(screen.getByPlaceholderText('Search by keyword in news title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Wait for articles to load
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.getByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeInTheDocument();
    });
  });

  it('filters articles by keyword', async () => {
    render(
      <BrowserRouter>
        <IndustryNewsPage />
      </BrowserRouter>
    );

    // Wait for articles to load
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.getByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeInTheDocument();
    });

    // Filter articles by keyword
    const searchInput = screen.getByPlaceholderText('Search by keyword in news title');
    fireEvent.change(searchInput, { target: { value: 'Tesla' } });

    // Expect only the first article to be displayed
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.queryByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeNull();
    });
  });

  it('filters articles by industry', async () => {
    render(
      <BrowserRouter>
        <IndustryNewsPage />
      </BrowserRouter>
    );

    // Wait for articles to load
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.getByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeInTheDocument();
    });

    // Filter articles by industry
    const industrySelect = screen.getByRole('combobox');
    fireEvent.change(industrySelect, { target: { value: 'Engineering' } });

    // Expect both articles to match the industry 'Engineering'
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.getByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeInTheDocument();
    });

    // Change filter to a non-matching industry
    fireEvent.change(industrySelect, { target: { value: 'IT' } });

    // Expect only the first article to be displayed
    await waitFor(() => {
      expect(screen.getByText('Uber, Lyft drivers use Teslas as makeshift robotaxis, raising safety concerns')).toBeInTheDocument();
      expect(screen.queryByText('Pedestrian level crossings removed ahead of City Rail Link opening')).toBeNull();
    });
  });
});

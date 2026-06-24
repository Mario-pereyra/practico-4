import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    // Mock the global fetch
    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    ) as any;
  });

  it('renders movies catalog search input and brand logo', async () => {
    render(<App />);
    
    // Check if Navbar brand renders
    expect(screen.getByText(/Cine/i)).toBeInTheDocument();
    
    // Wait for catalog search input to be in the DOM
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/Buscar por título de película/i)
      ).toBeInTheDocument();
    });
  });
});

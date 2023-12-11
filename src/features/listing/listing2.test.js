
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Listing from './Listing';
import mockedData from '../../../fakejson/frontpage.json'; // Import the mocked data
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockedData),
  })
);

const mockStore = configureStore([]);

test('renders loading state initially', () => {
  const store = mockStore({
    listing:{
      listing:  {},
      after:"",
      isLoading: false,
      hasError: false
      }
    ,
  });

  render(
    <Provider store={store}>
      <Router> 
        <Listing />
      </Router>
      
    </Provider>
  );

  const loadingElement = screen.getByText(/please wait/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders posts after fetching', async () => {
  const store = mockStore({
    listing: {
      listing: mockedData,
      after: "",
      isLoading: false,
      hasError: null,
    },
  });

  render(
    <Provider store={store}>
      <Router> 
        <Listing />
      </Router>
      
    </Provider>
  );

  // Wait for the fetch operation to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  // Get all div elements with a specific data-testid
  const divItems = screen.getAllByTestId(/post-/);

  // Ensure there is at least one div
  expect(divItems.length).toBeGreaterThan(0);

  // Example: Assert the content of the first div
  expect(divItems[0]).toHaveTextContent('Post 1');

});

// Add more tests for error state, etc.
test('renders error state when fetching fails', async () => {
  //const errorMessage = 'Failed to fetch data';
  const store = mockStore({
    listing: {
      listing: [], // Could be actual data or empty array depending on how you handle errors
      after: "",
      isLoading: false,
      hasError: true,
    },
  });

  // Mock the fetch function to simulate an error
  global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

  render(
    <Provider store={store}>
      <Router>
        <Listing />
      </Router>
    </Provider>
  );

  // Wait for the fetch operation to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  // Ensure that the error message is rendered
  const errorElement = screen.getByText(/Error/i);
  expect(errorElement).toBeInTheDocument();

  // Ensure that the loading message is not present
  const loadingElement = screen.queryByText(/please wait/i);
  expect(loadingElement).not.toBeInTheDocument();

  // Ensure that the post content is not present
  const postElement = screen.queryByText(/Post 1/i);
  expect(postElement).not.toBeInTheDocument();
});
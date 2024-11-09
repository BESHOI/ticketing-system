import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TicketList from '@/components/ticket-list'

// Mock the window innerHeight
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 840 })

describe('Ticket List', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders loading state initially', () => {
    render(<TicketList />)
    expect(screen.getByText('Loading tickets...')).toBeInTheDocument()
  })

  it('renders tickets after loading', async () => {
    render(<TicketList />)

    // Fast-forward timers to complete the loading
    jest.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(screen.queryByText('Loading tickets...')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('ticket-1')).toBeInTheDocument()
  })

  it('renders the correct number of visible items', async () => {
    render(<TicketList />)

    jest.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(screen.queryByText('Loading tickets...')).not.toBeInTheDocument()
    })

    // Given the mocked window height of 840px and a fixed row height of 120px
    // we expect to see 8 rows (840 / 120 = 7 ) + 1 extra row at the endIndex
    const visibleItems = screen.getAllByText(/Ticket \d+/)
    expect(visibleItems.length).toBe(8)
  })

  it('updates visible items on scroll', async () => {
    render(<TicketList />)

    jest.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(screen.queryByText('Loading tickets...')).not.toBeInTheDocument()
    })

    const ticketsList = screen.getByTestId('tickets-list')

    // Simulate scrolling,
    // Scroll down by the height of the viewport
    fireEvent.scroll(ticketsList, { target: { scrollTop: 840 } })

    // After scrolling, we should see Ticket 8
    await waitFor(() => {
      expect(screen.getByTestId('ticket-8')).toBeInTheDocument()
    })

    // The first ticket should no longer be visible
    expect(screen.queryByTestId('ticket-1')).not.toBeInTheDocument()
  })
})

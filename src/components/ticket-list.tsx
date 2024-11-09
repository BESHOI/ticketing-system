'use client'

import { ROW_HEIGHT } from '@/lib/constant'
import { Tickets } from '@/lib/generateData'
import { Ticket } from '@/types/tickets'
import { useEffect, useState } from 'react'
import VirtualList from './virtiual-list'

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch tickets
    const fetchTickets = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTickets(Tickets)
      setLoading(false)
    }

    fetchTickets()
  }, [])

  let visibleRows = 0

  if (typeof window !== 'undefined') {
    // Calculate the number of visible rows
    visibleRows = Math.ceil(window.innerHeight / ROW_HEIGHT)
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
          <p className="text-xl">Loading tickets...</p>
        </div>
      ) : (
        <VirtualList items={tickets} rowHeight={ROW_HEIGHT} visibleRows={visibleRows} />
      )}
    </>
  )
}

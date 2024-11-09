'use client'

import { cn } from "@/lib/utils"
import { Priority, Status, Ticket } from "@/types/tickets"
import { useMemo, useRef, useState } from "react"

type Props = {
  items: Ticket[],
  rowHeight: number,
  visibleRows: number
}

export default function VirtualList({ items, rowHeight, visibleRows }: Props) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * rowHeight
  const startIndex = Math.floor(scrollTop / rowHeight)
  const endIndex = Math.min(startIndex + visibleRows + 1, items.length)

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      top: (startIndex + index) * rowHeight
    }))
  }, [items, startIndex, endIndex, rowHeight])

  const onScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }

  // priority tag color
  const PRIORITY = {
    [Priority.Low]: "bg-green-700",
    [Priority.Medium]: "bg-yellow-700",
    [Priority.Heigh]: "bg-red-700",
  };

  // status tag color
  const STATUS = {
    [Status.Open]: "bg-blue-900",
    [Status.InProgress]: "bg-yellow-900",
    [Status.Closed]: "bg-black"
  };

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={cn(totalHeight > (visibleRows * rowHeight) && "h-[calc(100vh-5rem)]", "overflow-auto border rounded-md custom-scrollbar")}
      data-testid="tickets-list"
    >
      <ul className='relative bg-white text-black' style={{ height: totalHeight }}>
        {visibleItems.map((item) => (
          <li
            key={item.id}
            className="absolute w-full border-b p-4"
            style={{ top: item.top, height: rowHeight }}
            data-testid={`ticket-${item.id}`}
          >
            <p className="text-sm sm:text-lg font-semibold">{'Ticket' + ' ' + item.id + ': ' + item.subject.charAt(0).toUpperCase() + item.subject.slice(1)}</p>
            <div className="flex gap-2 mt-2">
              <p className={cn("flex items-center gap-1 outline-2 outline-black text-sm")}>
                <span className="text-gray-800 font-medium">status:</span>
                <span className={cn(STATUS[item.status], "text-xs sm:text-sm px-2 rounded-full text-white")}>{item.status}</span>
              </p>
              <p className={cn("flex items-center gap-1 outline-2 outline-black text-sm")}>
                <span className="text-gray-800 font-medium">priority:</span>
                <span className={cn(PRIORITY[item.priority], "text-xs sm:text-sm px-2 rounded-full text-white")}>{item.priority}</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-1">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

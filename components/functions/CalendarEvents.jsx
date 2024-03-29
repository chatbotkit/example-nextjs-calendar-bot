'use client'

import { useContext } from 'react'

import { ConversationContext } from '@chatbotkit/react'

export default function CalendarEvents({ events }) {
  const { request } = useContext(ConversationContext)

  function handleDecline(id) {
    request('declineCalendarEvent', { id })
  }

  return (
    <div>
      <h2>Calendar Events</h2>
      <ul>
        {events.map(({ id, title }) => (
          <li key={id}>
            {title}{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleDecline.bind(null, id)}
            >
              Decline
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

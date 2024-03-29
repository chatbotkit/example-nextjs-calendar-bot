'use client'

import { useContext } from 'react'

import { ConversationContext } from '@chatbotkit/react'

export default function AvailabilitySlotsForm({ slots }) {
  const { request } = useContext(ConversationContext)

  function captureSlot(slot) {
    request('captureSlot', slot)
  }

  return (
    <form className="flex flex-row flex-wrap gap-2">
      {slots.map((slot, index) => {
        const day = slot.day
        const time = slot.time
        const duration = slot.duration

        return (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-2 cursor-pointer"
            onClick={captureSlot.bind(null, slot)}
          >
            {day} at {time} for {duration} minutes
          </div>
        )
      })}
    </form>
  )
}

'use client'

import { useContext } from 'react'

import { ConversationContext } from '@chatbotkit/react'

export default function AvailabilitySlotsForm({ slots }) {
  const { request } = useContext(ConversationContext)

  function captureSlot(slot) {
    request('captureSlot', { slot })
  }

  return (
    <form className="flex flex-row flex-wrap gap-2">
      {slots.map(({ slot }, index) => {
        return (
          <div
            key={index}
            className="bg-white hover:shadow-md hover:transform hover:-translate-y-0.5 rounded-xl p-4 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={captureSlot.bind(null, slot)}
          >
            {slot}
          </div>
        )
      })}
    </form>
  )
}

'use client'

import { useContext } from 'react'

import { ConversationContext } from '@chatbotkit/react'

export default function CaptureDetailsForm({ events }) {
  const { request } = useContext(ConversationContext)

  function captureDetails(event) {
    request('captureDetails', {
      name: event.target.form.name.value,
      email: event.target.form.email.value,
    })
  }

  return (
    <form className="flex flex-col gap-2">
      <label className="flex flex-col gap-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-gray-200 rounded-xl p-2 w-full max-w-md"
        />
      </label>
      <label className="flex flex-col gap-1">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-200 rounded-xl p-2 w-full max-w-md"
        />
      </label>
      <button
        type="button"
        onClick={captureDetails}
        className="border border-gray-200 rounded-xl p-2 w-full max-w-md"
      >
        Book Appointment
      </button>
    </form>
  )
}

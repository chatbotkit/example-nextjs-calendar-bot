import ChatArea from '@/components/ChatArea'
import '@/components/functions'

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-2xl py-20 space-y-6">
      <p>
        Hi there,
        <br />
        <br />
        Please use the chat area below to book an appointment with me. My
        intelligent assistant will help you with selecting the right time and
        date for your appointment.
      </p>
      <ChatArea />
    </div>
  )
}

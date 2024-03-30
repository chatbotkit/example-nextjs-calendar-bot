import { complete } from '@/actions/conversation'
import ChatArea from '@/components/ChatArea'
import Footer from '@/components/Footer'
import '@/components/functions'

import ConversationManager from '@chatbotkit/react/components/ConversationManager'

export default function Page() {
  return (
    <ConversationManager endpoint={complete}>
      <div className="mx-auto w-full max-w-2xl py-20 space-y-6">
        <p className="text-lg text-gray-700">
          Please use the area below to book an appointment with me. My
          intelligent assistant will help you with selecting the right time and
          date for your appointment.
        </p>
        <ChatArea />
        <Footer />
      </div>
    </ConversationManager>
  )
}

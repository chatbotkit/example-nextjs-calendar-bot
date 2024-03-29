'use client'

import { useContext } from 'react'

import { complete } from '@/actions/conversation'

import { ChatInput, ConversationContext } from '@chatbotkit/react'
import ConversationManager from '@chatbotkit/react/components/ConversationManager'

export function ChatMessages() {
  const {
    thinking,

    text,
    setText,

    message,
    messages,

    submit,
  } = useContext(ConversationContext)

  return (
    <div>
      <div>
        {messages.map(({ id, type, text, children }, index) => {
          switch (type) {
            case 'user':
              return (
                <div key={id || index}>
                  <div>
                    <strong>user:</strong> {text}
                  </div>
                </div>
              )

            case 'bot':
              return (
                <div key={id || index}>
                  <div>
                    <strong>bot:</strong> {text}
                  </div>
                  {children ? <div>{children}</div> : null}
                </div>
              )
          }
        })}
        {message ? (
          <div key={message.id}>
            <strong>bot:</strong> {message.text}
          </div>
        ) : null}
        {thinking ? (
          <div key="thinking">
            <strong>bot:</strong> thinking...
          </div>
        ) : null}
      </div>
      <ChatInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={submit}
        placeholder="Type something..."
        style={{
          border: 0,
          outline: 'none',
          resize: 'none',
          width: '100%',
          marginTop: '10px',
        }}
      />
    </div>
  )
}

export default function ChatArea() {
  return (
    <ConversationManager endpoint={complete}>
      <ChatMessages />
    </ConversationManager>
  )
}

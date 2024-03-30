'use client'

import { useContext } from 'react'

import { ChatInput, ChatMessage, ConversationContext } from '@chatbotkit/react'

import clsx from 'clsx'

export function UserMessage({ text, children, ...props }) {
  return (
    <div {...props} className="flex space-x-2 items-end justify-end">
      {text ? (
        <ChatMessage
          className="bg-blue-500 rounded-lg text-white shadow-md p-4 prose"
          text={text}
        />
      ) : null}
      {children}
    </div>
  )
}

export function BotMessage({ text, children, ...props }) {
  return (
    <div {...props} className="flex space-x-2 items-end">
      {text ? (
        <ChatMessage
          className="bg-white rounded-lg shadow-md p-4 prose"
          text={text}
        />
      ) : null}
      {children}
    </div>
  )
}

export default function ChatArea() {
  const {
    thinking,

    text,
    setText,

    message,
    messages,

    submit,
  } = useContext(ConversationContext)

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm bg-gray-100 p-4 flex flex-col gap-4">
      {messages.length ? (
        <div className="flex flex-col gap-4">
          {messages
            .filter(({ type }) => ['user', 'bot'].includes(type))
            .map(({ id, type, text, children }, index, messages) => {
              const disableInteractivity = index < messages.length - 1

              switch (type) {
                case 'user':
                  return <UserMessage key={id} text={text} />

                case 'bot':
                  return (
                    <BotMessage key={id} text={text}>
                      {children ? (
                        <div
                          className={clsx(
                            'transition-all duration-300 ease-in-out w-full max-w-md',
                            {
                              'opacity-40 pointer-events-none':
                                disableInteractivity,
                            }
                          )}
                        >
                          {children}
                        </div>
                      ) : null}
                    </BotMessage>
                  )
              }
            })}
          {message ? <BotMessage key={message.id} text={message.text} /> : null}
          {thinking ? <BotMessage key="thinking" text="● ● ●" /> : null}
        </div>
      ) : null}
      <ChatInput
        className="rounded-md border border-gray-100 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={submit}
        placeholder="Your message..."
      />
    </div>
  )
}

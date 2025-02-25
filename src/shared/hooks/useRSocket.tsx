import { useEffect, useState } from 'react';

import { Encodable, IdentitySerializer, JsonSerializer, RSocketClient } from 'rsocket-core';
import { Payload, ReactiveSocket } from 'rsocket-types';
import RSocketWebSocketClient from 'rsocket-websocket-client';

interface UseRSocketOptions {
  host: string;
  payloadData: object;
  connectMapping: string;
}

type CreateClientProps = UseRSocketOptions & { receiver: (payload: object) => void };

/**
 * create rs client
 *
 * @param wsHost
 * @param receiver
 */
function createClient({ host, payloadData, connectMapping, receiver }: CreateClientProps) {
  // receiver
  const responder = {
    fireAndForget(payload: Payload<object, Encodable>) {
      payload.data && receiver(payload.data);
    },
  };

  const client = new RSocketClient({
    serializers: {
      data: JsonSerializer,
      metadata: IdentitySerializer,
    },
    setup: {
      payload: {
        data: payloadData,
        metadata: `${String.fromCharCode(connectMapping.length)}${connectMapping}`,
      },
      keepAlive: 60000,
      lifetime: 180000,
      dataMimeType: 'application/json',
      metadataMimeType: 'message/x.rsocket.routing.v0',
    },
    responder,
    transport: new RSocketWebSocketClient({
      url: `${host}`,
    }),
  });

  return client.connect();
}

export default function useRSocket(
  { host, payloadData, connectMapping }: UseRSocketOptions,
  onReceive?: (data: object) => void,
) {
  // state
  const [socket, setSocket] = useState<ReactiveSocket<object, Encodable>>();
  const [message, setMessage] = useState<object>();

  // useEffect
  useEffect(() => {
    const client = createClient({
      host,
      payloadData,
      connectMapping,
      receiver: (data) => {
        setMessage(data);
      },
    });

    client.subscribe({
      onComplete: (comSocket) => {
        console.log('connected notification rsocket...');
        setSocket(comSocket);
      },
      onError: (error) => {
        throw new Error(error.message);
      },
    });
  }, []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
        console.log('closed notification rsocekt...');
      }
    };
  }, [socket]);

  useEffect(() => {
    if (!message) {
      return;
    }

    onReceive && onReceive(message);
  }, [message]);

  return { socket };
}

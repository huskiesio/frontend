import {IHCAPIMessage, IHCAPIThread} from '@huskiesio/types'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface ReducedMessage {
senderId: string;
messages: IHCAPIMessage[];
}

interface StuffedThread extends IHCAPIThread {
  messages: IHCAPIMessage[]
}

interface UnsavedMessage {
  senderId: string;
	threadId: string;
	payload: Buffer;
}

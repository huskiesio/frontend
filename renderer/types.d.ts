interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface ReducedMessage {
senderId: string;
messages: IHCAPIMessage[];
}

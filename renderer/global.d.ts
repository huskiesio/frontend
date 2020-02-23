import 'reactn';

declare module 'reactn/default' {
  export interface State {
    threads: StuffedThread[];
    currentThread: string;
    currentUser: UserInfo;
  }
}

interface User {
  name: string,
  avatar?: string
}

interface Message {
  message: string;
  author: User
}

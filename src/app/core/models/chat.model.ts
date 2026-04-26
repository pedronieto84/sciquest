export interface ChatMessage {
  id?: string;
  senderId: string;
  text: string;
  createdAt: any; // Firestore Timestamp
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: any;
  participantData: {
    [uid: string]: {
      username: string;
      displayName: string;
      avatar: string;
    };
  };
}

export interface Friend {
  uid: string;
  username: string;
  displayName: string;
  avatar: string;
  addedAt: any;
}

export interface FriendRequest {
  fromUid: string;
  fromDisplayName: string;
  fromUsername: string;
  fromAvatar: string;
  createdAt: any;
}

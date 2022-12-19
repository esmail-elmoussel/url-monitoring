export interface PushoverMessage {
  message: string;
  user: string;
  title?: string;
  html?: 1; // set to 1 to enable HTML parsing
}

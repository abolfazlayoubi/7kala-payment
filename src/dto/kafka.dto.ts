export enum KafkaActions {
  CREATE = "insert",
  UPDATE = "update",
  DELETE = "delete",
}
export interface KafkaMessageDto<T> {
  type: KafkaActions;
  table: string;
  data: T;
  old?: T;
}

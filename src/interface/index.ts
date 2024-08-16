export interface LoginParams {
  userName: string;
  password: string;
  tenantId: string;
}

interface LinkMetadata {
  [key: string]: any;       // 可以存储任何额外的链接元数据
}

export interface Message {
  text: string;  // 消息内容
  type: 'SEND' | 'RECEIVED';  // 发送或接收
  displayType?: 'LIST' | 'EXECUTE_LINK'  // 清单｜执行链接  
  tipInfo?:any
  list?:any
  showInfo?: boolean;         // 是否显示提示信息
  infoType?: 'success' | 'error' | 'warning'; // 提示信息的类型
  mainInfo?: string;          // 主要提示信息
  additionalInfo?: string;    // 附加提示信息
  hasActionButton?: boolean;  // 是否存在执行按钮
  actionButtonText?: string;  // 执行按钮的文本
  link?: {
    url?: string;              // 链接的 URL
    text?: string;             // 链接的文本
    metadata?: LinkMetadata;  // 额外的链接元数据
  };
}

export interface ListItem {
  publishError : boolean;
  publishSucess : boolean;
  no1: string;
  no2: string;
  no3: string;
  no4: string;
  no5: string;
}
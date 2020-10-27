declare namespace ophis {
  export type IDriveTypes = "USB" | "SD" | "DOWNLOAD";

  /** 操作记录类型 */
  export type OpType =
    | "variable"
    | "alert"
    | "var-bool"
    | "bom-add"
    | "bom-del"
    | "bom-export"
    | "bom-import"
    | "camera-control"
    | "camera-down"
    | "camera-up"
    | "camera-left"
    | "camera-right"
    | "display"
    | "fn-clear"
    | "fn-task"
    | "fn-reboot"
    | "fn-login"
    | "fn-logout"
    | "fn-export"
    | "fn-quit"
    | "user-manage"
    | "user-del"
    | "user-add";

  export interface IVariableInfo {
    /** 旧值 */
    Origin: string;
    /** 操作结果 */
    Result: string;
    /** 接收端 */
    ReceiveEnd: string;
    /** 变量名 */
    VarName: string;
    /** 变量类型 */
    DataType: OpType;
  }

  /**
   * 基础信息
   */
  export interface BaseInfo extends IVariableInfo {
    /** 用户名 */
    User: string;
    /** 图元名 */
    SymbolName: string;
    /** 操作描述 */
    Describe: string;
    /** 画面号 */
    Frame: number;
    /** 操作端 */
    ControlEnd: string;
  }

  export interface InfoWithTime extends BaseInfo {
    /** 操作时间戳 */
    Time: number;
  }

  /**
   * 可能不带时间信息的操作信息
   */
  export interface InfoOptionTime extends BaseInfo {
    /** 操作时间戳 */
    Time?: number;
  }

  export interface TimeRange {
    /** 开始时间 >= */
    s: number;
    /** 结整时间 <  */
    e: number;
  }

  /** 查询条件 */
  export interface ISelectOption {
    /** 时间区间 */
    time?: TimeRange;
    /** 查询的偏移 */
    offset: number;
    /** 一页的数量 */
    limit: number;
    /** 排序方式 */
    order: "ASC" | "DESC";
    /** 附加信息，原样不动返回 */
    ext?: any;
  }

  export interface QueryResult {
    /** 时间区间 */
    time: TimeRange;
    /** 总条数 */
    total: number;
    /** 偏移 */
    offset: number;
    /** 查询到的数据 */
    data: InfoWithTime[];
    /** 表格的 id */
    tableId: number;
  }

  /** 查询记录状态 */
  interface IEventState {
    type: "state";
    /** 如果状态有值，则设置状态，否则读取状态 */
    state?: boolean;
  }

  interface IEventSelect extends ISelectOption {
    type: "select";
    tableId: number;
  }

  /** 查询存储列表 */
  interface IEventDrives {
    type: "drives";
  }

  /** 插入记录 */
  interface IEventInsert {
    type: "insert";
    info: InfoOptionTime;
  }

  /** 导出记录 */
  interface IEventExport {
    type: "export";
    drive: IDriveTypes;
    lang: "cn" | "en";
  }

  type ISocketEvents = IEventState | IEventSelect | IEventDrives | IEventInsert | IEventExport;

  interface IResInsert {
    type: "insert";
    info: InfoWithTime;
  }

  interface IResState {
    type: "state";
    state: boolean;
  }

  interface IResSelect {
    type: "select";
    result: QueryResult;
  }

  interface IResDrives {
    type: "drives";
    drives: IDriveTypes[];
  }

  interface IResParamError {
    type: "perr";
    msg: string;
  }

  interface IResDownload {
    type: "download";
    url: string;
  }

  interface IResProgress {
    type: "tip";
    msg: string;
  }

  type ISocketRes = IResProgress | IResParamError | IResDownload | IResInsert | IResState | IResSelect | IResDrives;
}

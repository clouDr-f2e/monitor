/// <reference types="wechat-miniprogram" />
import { Severity } from '@mito/utils';
import { BREADCRUMBTYPES } from '@mito/common';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
import { IAnyObject, TNumStrObj } from './common';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | Replace.IRouter | Replace.TriggerConsole | WxLifeCycleBreadcrumb | WxOnShareAppMessageBreadcrumb | WxRequestErrorBreadcrumb | TNumStrObj;
    category?: string;
    time?: number;
    level: Severity;
}
export interface WxLifeCycleBreadcrumb {
    path: string;
    query: IAnyObject;
}
export interface WxOnShareAppMessageBreadcrumb {
    path: string;
    query: IAnyObject;
    options: WechatMiniprogram.Page.IShareAppMessageOption;
}
export interface WxOnTabItemTapBreadcrumb {
    path: string;
    query: IAnyObject;
    options: WechatMiniprogram.Page.ITabItemTapOption;
}
export interface WxRequestErrorBreadcrumb {
    requestOptions: WechatMiniprogram.RequestOption;
    errMsg: string;
}
//# sourceMappingURL=breadcrumb.d.ts.map
/// <reference types="wechat-miniprogram" />
import { Severity } from '../utils/Severity';
import { BREADCRUMBTYPES } from '../common/constant';
import { ReportDataType } from './transportData';
import { Replace } from './replace';
import { IAnyObject } from './common';
export interface BreadcrumbPushData {
    type: BREADCRUMBTYPES;
    data: ReportDataType | string | Replace.IRouter | Replace.TriggerConsole | WxLifeCycleBreadcrumb | WxOnShareAppMessageBreadcrumb | WxRequestErrorBreadcrumb;
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

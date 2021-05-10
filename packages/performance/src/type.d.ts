
export interface ICalScore {
  dpss: ICalScore[];
  st: number;
  els: ElementList;
  root?: Element;
}
export type ElementList = Array<{
  ele: Element;
  st: number;
  weight: number;
}>;
export type IPerfDetail = {
  redirectTime: number | undefined; // Time of redirection
  dnsTime: number | undefined; // DNS query time
  ttfbTime: number | undefined; // Time to First Byte
  tcpTime: number | undefined; // Tcp connection time
  transTime: number | undefined; // Content transfer time
  domAnalysisTime: number | undefined; // Dom parsing time
  fptTime: number | undefined; // First Paint Time or Blank Screen Time
  domReadyTime: number | undefined; // Dom ready time
  loadPageTime: number | undefined; // Page full load time
  resTime: number | undefined; // Synchronous load resources in the page
  sslTime: number | undefined; // Only valid for HTTPS
  ttlTime: number | undefined; // Time to interact
  firstPackTime: number | undefined; // first pack time
  fmpTime: number | undefined; // First Meaningful Paint
};

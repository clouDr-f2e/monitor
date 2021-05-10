
import { IPerfDetail } from './type';
class PagePerf {
  public getPerfTiming(): IPerfDetail {
    try {
      if (!window.performance || !window.performance.timing) {
        console.log('your browser do not support performance');
        return;
      }
      const { timing } = window.performance;
      let redirectTime = 0;

      if (timing.navigationStart !== undefined) {
        redirectTime = parseInt(String(timing.fetchStart - timing.navigationStart), 10);
      } else if (timing.redirectEnd !== undefined) {
        redirectTime = parseInt(String(timing.redirectEnd - timing.redirectStart), 10);
      } else {
        redirectTime = 0;
      }

      return {
        redirectTime,
        dnsTime: parseInt(String(timing.domainLookupEnd - timing.domainLookupStart), 10),
        ttfbTime: parseInt(String(timing.responseStart - timing.requestStart), 10), // Time to First Byte
        tcpTime: parseInt(String(timing.connectEnd - timing.connectStart), 10),
        transTime: parseInt(String(timing.responseEnd - timing.responseStart), 10),
        domAnalysisTime: parseInt(String(timing.domInteractive - timing.responseEnd), 10),
        fptTime: parseInt(String(timing.responseEnd - timing.fetchStart), 10), // First Paint Time or Blank Screen Time
        domReadyTime: parseInt(String(timing.domContentLoadedEventEnd - timing.fetchStart), 10),
        loadPageTime: parseInt(String(timing.loadEventStart - timing.fetchStart), 10), // Page full load time
        // Synchronous load resources in the page
        resTime: parseInt(String(timing.loadEventStart - timing.domContentLoadedEventEnd), 10),
        // Only valid for HTTPS
        sslTime:
          location.protocol === 'https:' && timing.secureConnectionStart > 0
            ? parseInt(String(timing.connectEnd - timing.secureConnectionStart), 10)
            : undefined,
        ttlTime: parseInt(String(timing.domInteractive - timing.fetchStart), 10), // time to interact
        firstPackTime: parseInt(String(timing.responseStart - timing.domainLookupStart), 10), // first pack time
        fmpTime: 0, // First Meaningful Paint
      };
    } catch (e) {
      throw e;
    }
  }
}

export default PagePerf;

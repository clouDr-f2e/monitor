
import { ICalScore, ElementList } from './type';

const getStyle = (element: Element | any, attr: any) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null)[attr];
  } else {
    return element.currentStyle[attr];
  }
};
// element weight for calculate score
enum ELE_WEIGHT {
  SVG = 2,
  IMG = 2,
  CANVAS = 4,
  OBJECT = 4,
  EMBED = 4,
  VIDEO = 4,
}

const START_TIME: number = performance.now();
const IGNORE_TAG_SET: string[] = ['SCRIPT', 'STYLE', 'META', 'HEAD', 'LINK'];
const LIMIT: number = 3000;
const WW: number = window.innerWidth;
const WH: number = window.innerHeight;
const DELAY: number = 500; // fmp retry interval

class FMPTiming {
  public fmpTime: number = 0;
  private statusCollector: Array<{ time: number }> = []; // nodes change time
  private flag: boolean = true;
  private observer: MutationObserver = null;
  private callbackCount: number = 0;
  private entries: any = {};

  constructor() {
    if (!performance || !performance.getEntries) {
      console.log('your browser do not support performance.getEntries');
      return;
    }
    this.initObserver();
  }
  private getFirstSnapShot() {
    const time: number = performance.now();
    const $body: HTMLElement = document.body;
    if ($body) {
      this.setTag($body, this.callbackCount);
    }
    this.statusCollector.push({
      time,
    });
  }
  private initObserver() {
    this.getFirstSnapShot();
    this.observer = new MutationObserver(() => {
      this.callbackCount += 1;
      const time = performance.now();
      const $body: HTMLElement = document.body;
      if ($body) {
        this.setTag($body, this.callbackCount);
      }
      this.statusCollector.push({
        time,
      });
    });
    // observe all child nodes
    this.observer.observe(document, {
      childList: true,
      subtree: true,
    });
    // calculate score when page loaded
    if (document.readyState === 'complete') {
      this.calculateFinalScore();
    } else {
      window.addEventListener(
        'load',
        () => {
          this.calculateFinalScore();
        },
        false,
      );
    }
  }
  private calculateFinalScore() {
    if (MutationEvent && this.flag) {
      if (this.checkNeedCancel(START_TIME)) {
        // cancel observer for dom change
        this.observer.disconnect();
        this.flag = false;
        const res = this.getTreeScore(document.body);
        let tp: ICalScore = null;
        for (const item of res.dpss) {
          if (tp && tp.st) {
            if (tp.st < item.st) {
              tp = item;
            }
          } else {
            tp = item;
          }
        }
        // Get all of soures load time
        performance.getEntries().forEach((item: PerformanceResourceTiming) => {
          this.entries[item.name] = item.responseEnd;
        });
        if (!tp) {
          return false;
        }
        const resultEls: ElementList = this.filterResult(tp.els);
        const fmpTiming: number = this.getFmpTime(resultEls);
        this.fmpTime = fmpTiming;
      } else {
        setTimeout(() => {
          this.calculateFinalScore();
        }, DELAY);
      }
    }
  }
  private getFmpTime(resultEls: ElementList): number {
    let rt = 0;
    for (const item of resultEls) {
      let time: number = 0;
      if (item.weight === 1) {
        const index: number = parseInt(item.ele.getAttribute('fmp_c'), 10);
        time = this.statusCollector[index].time;
      } else if (item.weight === 2) {
        if (item.ele.tagName === 'IMG') {
          time = this.entries[(item.ele as HTMLImageElement).src];
        } else if (item.ele.tagName === 'SVG') {
          const index: number = parseInt(item.ele.getAttribute('fmp_c'), 10);
          time = this.statusCollector[index].time;
        } else {
          const match = getStyle(item.ele, 'background-image').match(/url\(\"(.*?)\"\)/);
          let url: string;
          if (match && match[1]) {
            url = match[1];
          }
          if (!url.includes('http')) {
            url = location.protocol + match[1];
          }
          time = this.entries[url];
        }
      } else if (item.weight === 4) {
        if (item.ele.tagName === 'CANVAS') {
          const index: number = parseInt(item.ele.getAttribute('fmp_c'), 10);
          time = this.statusCollector[index] && this.statusCollector[index].time;
        } else if (item.ele.tagName === 'VIDEO') {
          time = this.entries[(item.ele as HTMLVideoElement).src];
          if (!time) {
            time = this.entries[(item.ele as HTMLVideoElement).poster];
          }
        }
      }
      if (typeof time !== 'number') {
        time = 0;
      }
      if (rt < time) {
        rt = time;
      }
    }
    return rt;
  }
  /**
   * The nodes with the highest score in the visible area are collected and the average value is taken,
   * and the low score ones are eliminated
   */
  private filterResult(els: ElementList): ElementList {
    if (els.length === 1) {
      return els;
    }
    let sum: number = 0;
    els.forEach((item: any) => {
      sum += item.st;
    });
    const avg: number = sum / els.length;
    return els.filter((item: any) => {
      return item.st > avg;
    });
  }
  private checkNeedCancel(start: number): boolean {
    const time: number = performance.now() - start;
    const lastCalTime: number =
      this.statusCollector.length > 0 ? this.statusCollector[this.statusCollector.length - 1].time : 0;
    return time > LIMIT || time - lastCalTime > 1000;
  }
  private getTreeScore(node: Element): ICalScore | any {
    if (!node) {
      return {};
    }
    const dpss = [];
    const children: any = node.children;
    for (const child of children) {
      // Only calculate marked elements
      if (!child.getAttribute('fmp_c')) {
        continue;
      }
      const s = this.getTreeScore(child);
      if (s.st) {
        dpss.push(s);
      }
    }

    return this.calcaulteGrades(node, dpss);
  }
  private calcaulteGrades(ele: Element, dpss: ICalScore[]): ICalScore {
    const { width, height, left, top } = ele.getBoundingClientRect();
    let isInViewPort: boolean = true;
    if (WH < top || WW < left) {
      isInViewPort = false;
    }
    let sdp: number = 0;
    dpss.forEach((item: any) => {
      sdp += item.st;
    });
    let weight: number = Number(ELE_WEIGHT[ele.tagName as any]) || 1;
    // If there is a common element of the background image, it is calculated according to the picture
    if (
      weight === 1 &&
      getStyle(ele, 'background-image') &&
      getStyle(ele, 'background-image') !== 'initial' &&
      getStyle(ele, 'background-image') !== 'none'
    ) {
      weight = ELE_WEIGHT.IMG;
    }
    // score = the area of element
    let st: number = isInViewPort ? width * height * weight : 0;
    let els = [{ ele, st, weight }];
    const root = ele;
    // The percentage of the current element in the viewport
    const areaPercent = this.calculateAreaParent(ele);
    // If the sum of the child's weights is greater than the parent's true weight
    if (sdp > st * areaPercent || areaPercent === 0) {
      st = sdp;
      els = [];
      for (const item of dpss) {
        els = els.concat(item.els);
      }
    }
    return {
      dpss,
      st,
      els,
      root,
    };
  }
  private calculateAreaParent(ele: Element): number {
    const { left, right, top, bottom, width, height } = ele.getBoundingClientRect();
    const winLeft: number = 0;
    const winTop: number = 0;
    const winRight: number = WW;
    const winBottom: number = WH;
    const overlapX = right - left + (winRight - winLeft) - (Math.max(right, winRight) - Math.min(left, winLeft));
    const overlapY = bottom - top + (winBottom - winTop) - (Math.max(bottom, winBottom) - Math.min(top, winTop));

    if (overlapX <= 0 || overlapY <= 0) {
      return 0;
    }
    return (overlapX * overlapY) / (width * height);
  }
  // Depth first traversal to mark nodes
  private setTag(target: Element, callbackCount: number): void {
    const tagName: string = target.tagName;
    if (IGNORE_TAG_SET.indexOf(tagName) === -1) {
      const $children: HTMLCollection = target.children;
      if ($children && $children.length > 0) {
        for (let i = $children.length - 1; i >= 0; i--) {
          const $child: Element = $children[i];
          const hasSetTag = $child.getAttribute('fmp_c') !== null;
          // If it is not marked, whether the marking condition is met is detected
          if (!hasSetTag) {
            const { left, top, width, height } = $child.getBoundingClientRect();
            if (WH < top || WW < left || width === 0 || height === 0) {
              continue;
            }
            $child.setAttribute('fmp_c', `${callbackCount}`);
          }
          this.setTag($child, callbackCount);
        }
      }
    }
  }
}

export default FMPTiming;

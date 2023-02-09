import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

  // 确定是否应分离此路由(及其子树)以便以后复用，返回true时执行store方法，存储当前路由快照；返回false时直接跳过
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  // 存储分离的路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    cacheRouters()[getRouteSnapshotURL(route)] = handle;
  }

  // 确定是否应重新连接此路由(及其子树)，返回true时执行retrieve方法；返回false时结束，路由重载
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!cacheRouters()[getRouteSnapshotURL(route)];
  }

  // 检索以前存储的路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return cacheRouters()[getRouteSnapshotURL(route)];
  }

  // 确定是否应复用路由，返回true时执行shouldAttach方法，返回false时执行shouldDetach方法
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

export const getRouteSnapshotURL = (route: any) => {
  let fullRouteUrlPath: string[] = [];
  route.pathFromRoot.forEach((item: any) => {
    fullRouteUrlPath = fullRouteUrlPath.concat(item._routerState.snapshot?.url || item._routerState.url);
  });
  return `${fullRouteUrlPath.join('_')}`;
}

export const cacheRouters = () => {
  (window as any).cacheRouters = (window as any).cacheRouters || {};
  return (window as any).cacheRouters;
}
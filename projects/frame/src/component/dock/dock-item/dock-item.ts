export class DockItem {

  id: string = '';

  name: string = '';

  path: string = '';

  iconPath: string = '';

  keepInDock: boolean = true;

  running: boolean = false;

  scale: number = 1;

  margin: number = 4;

  isMinWin: boolean = false;

  width: number = 30;

  routeSnapshotURL: string = '';


  init(value: any) {
    this.id = value.id;
    this.name = value.name;
    this.path = value.path;
    this.iconPath = value.iconPath;
    this.keepInDock = value.keepInDock;
    this.running = value.running;
    this.isMinWin = value.isMinWin;
    if (this.isMinWin) {
      this.width = 0;
      this.margin = 0;
      this.routeSnapshotURL = value.routeSnapshotURL;
      setTimeout(() => {
        this.width = 30;
        this.margin = 4;
      }, 0);
    }
    return this;
  }

  disappear() {
    this.width = this.margin = 0;
  }

}
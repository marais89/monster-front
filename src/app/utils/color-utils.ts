import {DialogType, Status} from '../individu-create/individu-create.component';

export  class ColorUtils {


 public static COLOROFSTATUS(status: Status): string {
    switch (status) {
      case Status.active:
        return 'green';
      case Status.attente:
        return 'orange';
      case Status.bloque:
        return 'red';
      case Status.resilie:
        return 'black';
    }
  }

  public static COLORFROMTYPE(type: DialogType): string {
    switch (type) {
      case DialogType.ERROR:
        return 'red';
      case DialogType.INFO:
        return 'blue';
      case DialogType.SUCCESS:
        return 'green';
    }
  }

}

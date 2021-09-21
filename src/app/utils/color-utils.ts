import {DialogType} from '../individu-create/individu-create.component';

export  class ColorUtils {

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

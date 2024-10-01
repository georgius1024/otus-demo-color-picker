import { inject, computed, Ref } from 'vue';
import tinycolor2 from 'tinycolor2';
type HSV = tinycolor2.ColorFormats.HSV;
export default function useColorContext() {
  const colorUpdate = inject<(value: string) => void>('ColorUpdate');
  const colorValue = inject<Ref<string>>('ColorValue');
  const hexToHSV = (): HSV => tinycolor2(colorValue?.value).toHsv();
  const HSVtoHex = (value: HSV): string => tinycolor2(value).toHexString();
  const colorHSV = computed({
    get: hexToHSV,
    set: (value: HSV) => colorUpdate && colorUpdate(HSVtoHex(value))
  });
  const baseColor = computed<string>(() => 
    tinycolor2({ ...colorHSV.value, s: 1, v: 1 }).toHexString()
  )
  return { colorUpdate, colorValue, getHSV: hexToHSV, colorHSV, baseColor };
}

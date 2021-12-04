export class CookProfile {
  /* tslint:disable:no-bitwise */

  constructor(data: Array<number>) {
    this.data = data;
  }

  CATAGORY_STANDARD = 0;
  CATAGORY_FAVORITE = 1;
  data: Array<number>;

  static newData(realData): Array<number> {
    if (realData.length < 25) { return null; }
    const rdata = new Array();
    let j = 0;

    for (let i = 0; i < realData.length; i += 2) {
      const sh = realData.substring(i, i + 2);
      rdata[j++] = parseInt(sh, 16) & 0xFF;
    }

    return rdata;
  }

  static fromData(realData) {
    const data = CookProfile.newData(realData);
    if (data) {
      return new CookProfile(data);
    }
  }

  getId() {
    return this.mergeByte(this.data[0], this.data[1]);
  }

  calcrc(data: any, count: number) {
    let crc = 0;
    let j = 0;

    while (--count >= 0) {
      crc = crc ^ data[j++].toString(10) << 8;

      for (let i = 0; i < 8; ++i) {
        if ((crc & 0x8000) !== 0) {
          crc = crc << 1 ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }

    return crc & 0xFFFF;
  }

  mergeByte(b1: number, b2: number) {
    let i = b1;
    i = i << 8;
    return i | b2 & 0xFF;
  }

  setId(recipeId) {
    this.data[0] = recipeId >> 8 & 0xFF;
    this.data[1] = recipeId & 0xFF;
  }

  getType() {
    return this.data[2];
  }

  getDuration() {
    return this.data[3] * 60 + this.data[4];
  }

  setDuration(duration) {
    this.data[3] = Math.floor(duration / 60);
    this.data[4] = duration % 60;
  }

  getDurationHour() {
    return this.data[3];
  }

  setDurationHour(durationHour) {
    this.data[3] = durationHour & 0xFF;
  }

  getDurationMinute() {
    return this.data[4];
  }

  setDurationMinute(durationMinute) {
    this.data[4] = durationMinute & 0xFF;
  }

  getDurationMax() {
    return this.data[5] * 60 + this.data[6];
  }

  getDurationMaxHour() {
    return this.data[5];
  }

  getDurationMaxMinute() {
    return this.data[6];
  }

  setDurationMax(durationMaxHour, durationMaxMinute) {
    this.data[5] = durationMaxHour & 0xFF;
    this.data[6] = durationMaxMinute & 0xFF;
  }

  getDurationMin() {
    return this.data[7] * 60 + this.data[8];
  }

  getDurationMinHour() {
    return this.data[7];
  }

  getDurationMinMinute() {
    return this.data[8];
  }

  setDurationMin(durationMinHour, durationMinMinute) {
    this.data[7] = durationMinHour & 0xFF;
    this.data[8] = durationMinMinute & 0xFF;
  }

  getSchedule() {
    return (this.data[9] & 0x7F) * 60 + (this.data[10] & 0x7F);
  }

  setSchedule(schedule) {
    const scheduleFlag = this.data[9] & 0x80;
    this.data[9] = schedule / 60 & 0xFF;
    this.data[9] |= scheduleFlag;
    this.data[10] = (schedule % 60 | this.data[10] & 0x80) & 0xFF;
  }

  getScheduleHour() {
    return this.data[9] & 0x7F;
  }

  setScheduleHour(hour) {
    this.data[9] = hour & 0xFF | 0x80;
  }

  getScheduleMinute() {
    return this.data[10] & 0x7F;
  }

  setScheduleMinute(minute) {
    this.data[9] |= 0x80;
    this.data[10] = minute & 0xFF | this.data[10] & 0x80;
  }

  isScheduleEnabled() {
    return (this.data[9] >> 7 & 1) !== 0;
  }

  setScheduleEnabled(enabled: boolean) {
    if (enabled) {
      this.data[9] |= 0x80;
      console.warn('this.data[9] is ', this.data[9]);
    } else {
      this.data[9] &= 0x7F;
    }
  }

  isAutoKeepWarmEnabled() {
    return (this.data[10] & 0x80) !== 0;
  }

  setAutoKeepWarmEnabled(enabled) {
    if (enabled) { this.data[10] = this.data[10] | 0x80; } else { this.data[10] = this.data[10] & 0x7F; }
  }

  isCanConfigTaste() {
    return this.getId() === 1;
  }

  isCanSchedule() {
    return (this.data[2] & 0x40) !== 0;
  }

  setCanSchedule(canSchedule: boolean) {
    if (canSchedule) { this.data[2] = this.data[2] | 0x40; } else { this.data[2] = this.data[2] & 0xBF; }
  }

  isCanAutoKeepWarm() {
    return (this.data[2] & 0x20) !== 0;
  }

  setCanAutoKeepWarm(canAutoKeepWarm: boolean) {
    if (canAutoKeepWarm) { this.data[2] = this.data[2] | 0x20; } else { this.data[2] = this.data[2] & 0xDF; }
  }

  isCanSetTime() {
    return this.data[5] !== this.data[7] || this.data[6] !== this.data[8];
  }

  setFavorite(set: boolean) {
    if (set) { this.data[2] = this.data[2] | 0x80; } else { this.data[2] = this.data[2] & 0x7F; }
  }

  isFavorite() {
    return (this.data[2] & 0x80) !== 0;
  }

  getCatagory() {
    return this.getId() < 0x100 ? this.CATAGORY_STANDARD : this.CATAGORY_FAVORITE;
  }

  setData(data) {
    this.data = data;
  }

  isCanChooseRice() {
    return this.getId() <= 2;
  }

  isCanShowCookDetail() {
    return this.getId() !== 0x0102 && this.getId() !== 0x0103;
  }

  isCookingCurve() {
    return this.getId() <= 2;
  }

  isCookingProgress() {
    return this.getId() === 3 || this.getId() >= 0x100;
  }

  getLastTemperature(): number {
    return this.data[103];
  }

  setLastTemperature(temp: any) {
    this.data[103] = parseInt(temp, 10);
  }

  toHexData() {
    const crc16 = this.calcrc(this.data, this.data.length - 2);

    this.data[this.data.length - 2] = crc16 >> 8 & 0xFF;
    this.data[this.data.length - 1] = crc16 & 0xFF;
    let sb = '';
    for (const b of this.data) {
      const dh = (b & 0xFF).toString(16).padStart(2,  '0');
      sb = sb.concat(dh);
    }

    return sb.toString();
  }


  setDataFromHex(realData) {
    const newData = CookProfile.newData(realData);
    if (newData) {
      this.data = newData;
    }
  }
}



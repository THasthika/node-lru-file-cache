type KB = 'KB';
type MB = 'MB';
type GB = 'GB';
type TB = 'TB';

type SIZE_PREFIXES = KB | MB | GB | TB;

const SIZES = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};

function sizeStringToNumber(ssize: string): number {
  const regexPattern = /([\d]+(\.[\d]+)?) ?([KMGT]B)/;
  const regexResult = regexPattern.exec(ssize);

  if (regexResult == null) {
    throw new Error('Invalid Size Format');
  }

  const postFix = regexResult[3] as SIZE_PREFIXES;
  const strNum = regexResult[1];

  const num = Number.parseFloat(strNum);
  const multiplier = SIZES[postFix];

  const size = Math.floor(num * multiplier);

  return size;
}

function randomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  sizeStringToNumber,
  randomString,
};

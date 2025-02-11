import fs from 'fs';
/**
 * json 파일 호출
 * @param filename 파일 이름 (확장명 제외)
 */
export const loadJson = async (filename: string) => {
  const data = fs.readFileSync(`${filename}.json`, 'utf8');
  return JSON.parse(data);
};

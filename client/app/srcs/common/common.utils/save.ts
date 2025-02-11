import fs from 'fs';
/**
 * json 파일 저장
 * @param filename 파일 이름 확장명 제외
 * @param data 파일 내용(array or object)
 */
export const saveJson = async (filename: string, data: object) => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(data, null, 2));
};

type Artifcle = {
  /** article id */
  id: number;
  /** md 파일 경로 */
  path: string;
  /** 발행일 */
  publish_date: string;
  /** 최종 수정일 */
  update_date: string;
  /** 이미지 경로 */
  src: string;
  /** 게시글 타이틀 */
  title: string;
  /** 작성자 이메일 */
  user_email: string;
  /** 다음 게시글 아이디 */
  next_id: number;
  /** 이전 게시글 아이디 */
  prev_id: number;
};
type Users = {
  /** 유저 이메일 */
  email: string;
  /** 유저 비밀번호(암호화) */
  password: string;
  /** 유저 salt */
  salt: string;
};
type Tag = {
  /** 태그 아이디 */
  id: number;
  /** 태그 이름 */
  name: string;
};

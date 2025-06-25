//-- Authentication types
export type TUserRole = "admin" | "user";
export type TSignUp = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type Tuser = {
  email: string;
  role: TUserRole;
  iat: number;
};

//-- Course types
export type TCourse = {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  modules: TModule[];
  id: string;
};
export type TCourseReq = {
  title: string;
  thumbnail: string;
  price: number;
  description: string;
};

export type TModule = {
  _id: string;
  courseId: string;
  title: string;
  moduleNumber: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lectures: TLecture[];
  id: string;
};
export type TModuleReq = {
  courseId: string;
  title: string;
};

export type TLecture = {
  _id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isLocked: boolean;
  __v: number;
};
export type TLectureReq = {
  moduleId: string;
  title: string;
  videoUrl: string;
  isLocked?: boolean;
  pdfNotes?: string[];
};

export type TPurchase = {
  courseId: string;
};

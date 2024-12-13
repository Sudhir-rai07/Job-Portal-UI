import { ReactElement } from "react";

export type BoxProp = {
  categoryName: string;
  icon: ReactElement;
};

export type CategoryType = {
  icon: ReactElement;
  category: string;
};

export type JobType = {
  _id: string;
  employer: string;
  role: string;
  company: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  salary: string;
  experience: string;
  language: string;
  isAccepting: string;
  applications: string[];
  posted_date: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
};

export type JobCardType = {
  _id: string;
  company : string;
  posted_date: Date;
  role:string;
  location: string;
  description: string;
  employment_type: string;
  salary: string;
  experience: string;
};

export type User = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  gender: string;
  profileImage: string;
  about: string;
  role: string;
  education: string;
  resume: string;
  skills: string[];
  address: string;
  jobsApplied: string[];
  isVerifed: boolean;
  updatedAt: string;
  createdAt: string;
};

export type ApplicationType = {
  _id: string;
  applicant: string;
  job: JobType;
  coverLetter: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export type RecordErrorType = Record<string, string | undefined>
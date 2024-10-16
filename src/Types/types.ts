import { ReactElement } from "react";

export type BoxProp = {
    categoryName: string;
    icon: ReactElement;
  }

export type CategoryType = {
    icon: ReactElement;
    category: string;
  }

  export type JobType = {
    _id: string;
    applications: string[];
    company: string;
    location: string;
    role: string;
    requirements: string[];
    employment_type
: string;
    description: string;
    tags?: TagType;
    salary: string;
    experience:string;
    language:string;
    imgUrl?: string;
    datePosted?: Date | undefined
  }

  type TagType = string[];

 export type User = {
    about?: string,
    address?: string,
    createdAt?: string,
    education?: string,
    email?: string,
    fullname?: string,
    gender?: string,
    isVerifed?: boolean,
    jobsApplied?: string[] | string,
    profileImage?: string,
    resume?: string,
    skills?: string[],
    updatedAt?: string,
    username?: string,
    _id?: string,
  }
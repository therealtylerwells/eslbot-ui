export interface JobType {
  _id?: string,
  link?: string,
  text?: string,
  location?: string,
  website?: string,
  websiteLink?: string,
  externalPosting?: Boolean,
  postingApproved?: Boolean,
  // Internal stuff
  name?: string,
  email?: string,
  jobTitle?: string,
  city?: string,
  country: string,
  jobDescription?: string,
  // If posted by registered user ...
  jobPosterId?: string,
  dateAdded?: Date,
  createdAt?: Date,
}

export interface HTTPResponseType {
  success: boolean,
  message?: string,
  job?: JobType[],
  response?: JobType[],
  jobs?: JobType[]
}
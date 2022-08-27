enum Track {
  A,
  B,
}

type StartTime = string;
type EndTime = string;

type Time = [StartTime, EndTime];

type Timetable = Time[];

interface Company {
  name: string;
  homepage: string;
  image?: string;
}

interface Speaker {
  name: string;
  company?: Company;
  image: string;
}

interface Session {
  title: string;
  description: string;
  speaker: Speaker;
  track: Track;
  time: Time;
}

export type { Session, Company, Speaker, Timetable };
export { Track };

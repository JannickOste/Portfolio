export type GithubProfileAPIResult = {
  login?:               string;
  id?:                  number;
  node_id?:             string;
  avatar_url?:          string;
  gravatar_id?:         string;
  url?:                 string;
  html_url?:            string;
  followers_url?:       string;
  following_url?:       string;
  gists_url?:           string;
  starred_url?:         string;
  subscriptions_url?:   string;
  organizations_url?:   string;
  repos_url?:           string;
  events_url?:          string;
  received_events_url?: string;
  type?:                string;
  site_admin?:          boolean;
  name?:                string;
  company?:            any;
  blog?:                string;
  location?:           any;
  email?:              any;
  hireable?:           any;
  bio?:                any;
  twitter_username?:   any;
  public_repos?:        number;
  public_gists?:        number;
  followers?:           number;
  following?:           number;
  created_at?:          string;
  updated_at?:          string;
  message?:            string;
}

export type GithubAPIRepositoryResult = {
  id?: number;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: boolean;
  owner?: GithubRepositoryOwner;
  html_url?: string;
  description?: string;
  fork?: boolean;
  url?: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: any;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: GithubRepositoryLicense;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: any[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
}

export type GithubRepositoryLicense = {
  key?: string;
  name?: string;
  spdx_id?: string;
  url?: string;
  node_id?: string;
}

export type GithubRepositoryOwner = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
}

class GithubAPI 
{
    static getProfile      = async(name:string): Promise<GithubProfileAPIResult>      => await (await fetch(`https://api.github.com/users/${name}`)).json();
    static getRepositories = async(name:string): Promise<GithubAPIRepositoryResult[]> => await (await fetch(`https://api.github.com/users/${name}/repos`)).json();
    static sanitizeDate = (input:string|undefined) => input?.split("T").map((s: string) => s.split("-").join(" ").replace("Z", "")).join(" - ");

    static stringToDate = (dateString: string) => { // Doesnt return correct output when returning out, gotta look into
        const [date, time] = dateString.split("T") as string[];
        let numeric = 0;
        const out = new Date();
        if(date.split("-").length >= 3)
            numeric += out.setFullYear(parseInt(date.split("-")[0]), parseInt(date.split("-")[1]), parseInt(date.split("-")[2]));
        
        numeric += out.setTime(time.replace("Z", "").split(":").reduce((count, timeSlice, i) => count + parseInt(timeSlice)*Math.pow(60, 2-i), 0))
    return new Date(numeric);
    }
}

export default GithubAPI;
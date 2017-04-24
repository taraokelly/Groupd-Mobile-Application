//User Object
export interface User {
    //_id?: String,
    email: String;
    username: String;
    password: String;
    gender?: String;
    firstName: String;
    surname: String;
    address: String;
    skills: String[];
    bio: String;
    occupation: String;
    ratings: Ratings,
	bookmarks: String[];
	projects: String[];
}

export interface Ratings{
		rating: Rating,
		ratedby: [ Ratedby ]
	}

export interface Rating{
    	sum_of_rates: number,
		rate_count: number
  }

export interface Ratedby{
            username: String,
            rate: number 
        }
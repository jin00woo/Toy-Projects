class Github {
  constructor(){
    this.client_id = "82851dd42a8fac72abf8";
    this.client_secret = "9786cb567f5756cd8d832e90abb0c6cae42d8682";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
    
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    console.log(repos);
    
    return {
      profile,
      repos
    }
  }
}
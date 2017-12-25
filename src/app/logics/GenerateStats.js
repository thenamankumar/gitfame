const generateStats = (data) => {
  // Sort Repos for most contributions
  data.repos.sort((l, r) => {
    if (l.user_commits < r.user_commits) {
      return 1;
    } else if (l.user_commits === r.user_commits) {
      if (l.total_commits < r.total_commits) {
        return 1;
      }
      return -1;
    }
    return -1;
  });

  // Top Repos
  data.topStarsRepo = { stars: 0 };

  data.topForksRepo = { forks: 0 };

  data.topContributionsRepo = data.repos[0];

  data.repos.forEach((repo) => {
    if (repo.stars > data.topStarsRepo.stars) {
      data.topStarsRepo = repo;
    }
    if (repo.forks > data.topForksRepo.forks) {
      data.topForksRepo = repo;
    }
  });

  // Language Scoring
  data.languages.forEach((language) => {
    language.score = language.commits / data.commits;
  });

  return data;
};

export default generateStats;

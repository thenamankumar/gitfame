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

  data.languages = [];

  data.repos.forEach((repo) => {
    if (!repo) {
      return;
    }

    if (repo.stars > data.topStarsRepo.stars) {
      data.topStarsRepo = repo;
    }
    if (repo.forks > data.topForksRepo.forks) {
      data.topForksRepo = repo;
    }
    const repoLangs = repo.languages.nodes;

    repoLangs.forEach((language, index) => {
      let found = false;

      data.languages.forEach((lang) => {
        if (lang.name === language.name) {
          found = true;
          const c = repoLangs.length;
          lang.score += (repo.user_commits) * ((c / (index + 2)) + (1 / c));
          lang.repos += 1;
        }
      });

      if (!found) {
        language.score = 0;
        language.repos = 1;
        data.languages.push(language);
      }
    });
  });

  // Sort Languages for highest score
  data.languages.sort((l, r) => {
    if (l.score < r.score) {
      return 1;
    } else if (l.score === r.score) {
      if (l.repos < r.repos) {
        return 1;
      }
      return -1;
    }
    return -1;
  });

  // User Scoring
  data.score = {};

  const daysFromCreated = (new Date() - new Date(data.createdAt)) / (1000 * 60 * 60 * 24);
  data.commitsPerDay = (data.commits / 365).toFixed(1) || 0;

  // 30 points for total commits
  if (data.commitsPerDay < 1) {
    data.score.work = 0;
  } else if (data.commitsPerDay < 2) {
    data.score.work = 10;
  } else if (data.commitsPerDay < 3) {
    data.score.work = 20;
  } else {
    data.score.work = 30;
  }

  // 30 points for total commits
  if (data.commits > data.commitsPerDay * 730) {
    data.score.consistency = 30;
  } else if (data.commits > data.commitsPerDay * 365) {
    data.score.consistency = 20;
  } else if (data.commits > data.commitsPerDay * 180) {
    data.score.consistency = 10;
  } else {
    data.score.consistency = 0;
  }

  // 20 points for stars
  const starPerRepo = (data.stars / data.own_repos).toFixed(1) || 0;
  if (starPerRepo < 0.5) {
    data.score.stars = 0;
  } else if (starPerRepo < 1) {
    data.score.stars = 5;
  } else if (starPerRepo < 2) {
    data.score.stars = 10;
  } else if (starPerRepo >= 2) {
    data.score.stars = 20;
  }

  // 20 points for forks
  const forksPerRepo = (data.forks / data.own_repos).toFixed(1) || 0;
  if (forksPerRepo < 0.5) {
    data.score.forks = 0;
  } else if (forksPerRepo < 1) {
    data.score.forks = 5;
  } else if (forksPerRepo < 2) {
    data.score.forks = 10;
  } else if (forksPerRepo >= 2) {
    data.score.forks = 20;
  }

  data.score.total = data.score.work + data.score.consistency + data.score.stars + data.score.forks;

  return data;
};
export default generateStats;

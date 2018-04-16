const colors = [
  '#ef4e7b',
  '#9240bb',
  '#4f72b7',
  '#0b97ac',
  '#22c4de',
  '#00b199',
  '#53ba6e',
  '#6db981',
  '#f26f54',
  '#f69332',
  '#f8e54f',
];

const generateReport = data => {
  let commitsForked = 0;
  let commitsOwned = 0;
  const commitsPerRepo = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const popularRepos = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stars',
        backgroundColor: colors[0],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: colors[0],
        hoverBorderColor: 'white',
      },
      {
        data: [],
        label: 'Forks',
        backgroundColor: colors[1],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: colors[1],
        hoverBorderColor: 'white',
      },
      {
        data: [],
        label: 'Watchers',
        backgroundColor: colors[2],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: colors[2],
        hoverBorderColor: 'white',
      },
    ],
  };
  const languageStat = [];
  const reposPerLanguage = {
    labels: [],
    datasets: [
      {
        // owned repos
        data: [],
        label: 'Owned',
        backgroundColor: 'rgba(248, 229, 79, 0.15)',
        borderWidth: 2,
        borderColor: 'rgba(248, 229, 79, 1)',
        pointBackgroundColor: 'rgba(248, 229, 79, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(248, 229, 79, 1)',
      },
      {
        // forked repos
        data: [],
        label: 'Forked',
        backgroundColor: 'rgba(146, 64, 187, 0.4)',
        borderWidth: 2,
        borderColor: 'rgba(146, 64, 187, 1)',
        pointBackgroundColor: 'rgba(146, 64, 187, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(146, 64, 187, 1)',
      },
    ],
  };

  // sort repos in desc commits
  (data.repos || []).sort((l, r) => {
    if (l.user_commits < r.user_commits) {
      return 1;
    }
    return -1;
  });

  (data.repos || []).forEach(repo => {
    // total commits owned / forked
    if (repo.isFork) {
      commitsForked += repo.user_commits;
    } else {
      commitsOwned += repo.user_commits;
    }

    if (repo.user_commits) {
      const cprLength = commitsPerRepo.labels.length;
      if (cprLength < 10) {
        commitsPerRepo.labels.push(repo.full_name);
        commitsPerRepo.datasets[0].data.push(repo.user_commits);
      } else if (cprLength === 10) {
        commitsPerRepo.labels[10] = 'Others';
        commitsPerRepo.datasets[0].data[10] = repo.user_commits;
      } else {
        commitsPerRepo.datasets[0].data[10] += repo.user_commits;
      }
    }

    (repo.languages.nodes || []).forEach(lang => {
      const foundIndex = languageStat.findIndex(presentLang => presentLang.name === lang.name);

      if (foundIndex > -1) {
        languageStat[foundIndex].commits += repo.user_commits;
        languageStat[foundIndex].ownedCommits += repo.isFork ? 0 : repo.user_commits;
        languageStat[foundIndex].forkedCommits += repo.isFork ? repo.user_commits : 0;
        languageStat[foundIndex].repos += 1;
        languageStat[foundIndex].ownedRepos += repo.isFork ? 0 : 1;
        languageStat[foundIndex].forkedRepos += repo.isFork ? 1 : 0;
      } else {
        languageStat.push({
          name: lang.name,
          color: lang.color,
          commits: repo.user_commits,
          ownedCommits: repo.isFork ? 0 : repo.user_commits,
          forkedCommits: repo.isFork ? repo.user_commits : 0,
          repos: 1,
          ownedRepos: repo.isFork ? 0 : 1,
          forkedRepos: repo.isFork ? 1 : 0,
        });
      }
    });
  });

  // sort repos in desc stars + forks + watches
  (data.repos || []).sort((l, r) => {
    if (l.stars + l.forks + l.watchers < r.stars + r.forks + r.watchers) {
      return 1;
    }
    return -1;
  });

  (data.repos || []).forEach(repo => {
    const score = repo.stars + repo.forks + repo.watchers;

    if (score) {
      const popularLength = popularRepos.labels.length;
      if (popularLength <= 3) {
        popularRepos.labels.push(repo.full_name.split('/')[1].substr(0, 15));
        popularRepos.datasets[0].data.push(repo.stars);
        popularRepos.datasets[1].data.push(repo.forks);
        popularRepos.datasets[2].data.push(repo.watchers);
      }
    }
  });

  (languageStat || []).sort((l, r) => {
    if (l.repos < r.repos) {
      return 1;
    }
    return -1;
  });

  const topLanguage = languageStat[0];

  (languageStat || []).forEach((lang, index) => {
    if (index < 10) {
      reposPerLanguage.labels.push(lang.name);
      reposPerLanguage.datasets[0].data.push(lang.ownedRepos);
      reposPerLanguage.datasets[1].data.push(lang.forkedRepos);
    }
  });

  return {
    ...data,
    commitsForked,
    commitsOwned,
    commitsPerRepo,
    popularRepos,
    languageStat,
    topLanguage,
    reposPerLanguage,
  };
};

export default generateReport;

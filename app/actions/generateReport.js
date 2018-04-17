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
  if (data.status !== 200) {
    return data;
  }

  let commitsForked = 0;
  let commitsOwned = 0;
  const commitsPerRepo = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Commits',
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const popularReposOwned = {
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
    ],
  };
  const languageStat = [];
  const reposPerLanguageTotal = {
    labels: [],
    datasets: [
      {
        // total repos
        data: [],
        label: 'Repos',
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const starsPerLanguageOwned = {
    labels: [],
    datasets: [
      {
        // total stars
        data: [],
        label: 'Stars',
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  const reposPerLanguageOwnedTotalMain = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sub Language',
        backgroundColor: colors[0],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: colors[0],
        hoverBorderColor: 'white',
      },
      {
        data: [],
        label: 'Main Language',
        backgroundColor: colors[1],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: colors[1],
        hoverBorderColor: 'white',
      },
    ],
  };
  const reposPerLanguageByType = {
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

    // commits per repo analysis
    if (repo.user_commits) {
      const cprLength = commitsPerRepo.labels.length;
      let skip = 0;
      if (cprLength < 10) {
        if (repo.user_commits) {
          commitsPerRepo.labels.push(repo.full_name);
          commitsPerRepo.datasets[0].data.push(repo.user_commits);
        } else {
          skip += repo.user_commits;
        }
      } else if (cprLength === 10) {
        commitsPerRepo.labels[10] = 'Others';
        commitsPerRepo.datasets[0].data[10] = repo.user_commits;
        commitsPerRepo.datasets[0].data[10] += skip;
        skip = 0;
      } else {
        commitsPerRepo.datasets[0].data[10] += skip + repo.user_commits;
        skip = 0;
      }
    }

    // prepare language stats
    (repo.languages.nodes || []).forEach((lang, index) => {
      const foundIndex = languageStat.findIndex(presentLang => presentLang.name === lang.name);

      if (foundIndex > -1) {
        const foundLang = languageStat[foundIndex];
        languageStat[foundIndex] = {
          ...foundLang,
          total: {
            commits: foundLang.total.commits + repo.user_commits,
            repos: foundLang.total.repos + 1,
            stars: foundLang.total.stars + repo.stars,
            main: {
              repos: foundLang.total.main.repos + (!index ? 1 : 0),
              commits: foundLang.total.main.commits + (!index ? repo.user_commits : 0),
              stars: foundLang.total.main.stars + (!index ? repo.stars : 0),
            },
          },
          owned: {
            repos: foundLang.owned.repos + (repo.isFork ? 0 : 1),
            commits: foundLang.owned.commits + (repo.isFork ? 0 : repo.user_commits),
            stars: foundLang.owned.stars + (repo.isFork ? 0 : repo.stars),
            main: {
              repos: foundLang.owned.main.repos + (!repo.isFork && !index ? 1 : 0),
              commits: foundLang.owned.main.commits + (!repo.isFork && !index ? repo.user_commits : 0),
              stars: foundLang.owned.main.stars + (!repo.isFork && !index ? repo.stars : 0),
            },
          },
          forked: {
            repos: foundLang.forked.repos + (repo.isFork ? 1 : 0),
            commits: foundLang.forked.commits + (repo.isFork ? repo.user_commits : 0),
            stars: foundLang.forked.stars + (repo.isFork ? repo.stars : 0),
            main: {
              repos: foundLang.forked.main.repos + (repo.isFork && !index ? 1 : 0),
              commits: foundLang.forked.main.commits + (repo.isFork && !index ? repo.user_commits : 0),
              stars: foundLang.forked.main.stars + (repo.isFork && !index ? repo.stars : 0),
            },
          },
        };
      } else {
        languageStat.push({
          name: lang.name,
          color: lang.color,
          total: {
            commits: repo.user_commits,
            repos: 1,
            stars: repo.stars,
            main: {
              repos: !index ? 1 : 0,
              commits: !index ? repo.user_commits : 0,
              stars: !index ? repo.stars : 0,
            },
          },
          owned: {
            repos: !repo.isFork ? 1 : 0,
            commits: !repo.isFork ? repo.user_commits : 0,
            stars: !repo.isFork ? repo.stars : 0,
            main: {
              repos: !repo.isFork && !index ? 1 : 0,
              commits: !repo.isFork && !index ? repo.user_commits : 0,
              stars: !repo.isFork && !index ? repo.stars : 0,
            },
          },
          forked: {
            repos: repo.isFork ? 1 : 0,
            commits: repo.isFork ? repo.user_commits : 0,
            stars: repo.isFork ? repo.stars : 0,
            main: {
              repos: repo.isFork && !index ? 1 : 0,
              commits: repo.isFork && !index ? repo.user_commits : 0,
              stars: repo.isFork && !index ? repo.stars : 0,
            },
          },
        });
      }
    });
  });

  (languageStat || []).sort((l, r) => {
    if (l.total.repos < r.total.repos) {
      return 1;
    }
    return -1;
  });

  const topLanguage = languageStat[0] || {};

  (languageStat || []).forEach(lang => {
    const rplBtLength = reposPerLanguageByType.labels.length;
    const rplTLength = reposPerLanguageTotal.labels.length;
    if (rplBtLength <= 10 && (lang.owned.repos || lang.forked.repos)) {
      reposPerLanguageByType.labels.push(lang.name);
      reposPerLanguageByType.datasets[0].data.push(lang.owned.repos);
      reposPerLanguageByType.datasets[1].data.push(lang.forked.repos);
    }

    if (rplTLength <= 10 && lang.total.repos) {
      reposPerLanguageTotal.labels.push(lang.name);
      reposPerLanguageTotal.datasets[0].data.push(lang.total.repos);
    }
  });

  (languageStat || []).sort((l, r) => {
    if (l.owned.repos < r.owned.repos) {
      return 1;
    }
    return -1;
  });

  (languageStat || []).forEach(lang => {
    const rplOMLength = reposPerLanguageOwnedTotalMain.labels.length;
    if (rplOMLength <= 8 && lang.owned.repos) {
      reposPerLanguageOwnedTotalMain.labels.push(lang.name);
      reposPerLanguageOwnedTotalMain.datasets[0].data.push(lang.owned.main.repos);
      reposPerLanguageOwnedTotalMain.datasets[1].data.push(lang.owned.repos - lang.owned.main.repos);
    }
  });

  (languageStat || []).sort((l, r) => {
    if (l.owned.stars < r.owned.stars) {
      return 1;
    }
    return -1;
  });

  (languageStat || []).forEach(lang => {
    const splTLength = starsPerLanguageOwned.labels.length;
    if (splTLength <= 10 && lang.owned.stars) {
      starsPerLanguageOwned.labels.push(lang.name);
      starsPerLanguageOwned.datasets[0].data.push(lang.owned.stars);
    }
  });

  for (let i = 0; i < reposPerLanguageByType.labels.length; i += 1) {
    for (let j = 1; j < reposPerLanguageByType.labels.length; j += 1) {
      if (reposPerLanguageByType.labels[i] < reposPerLanguageByType.labels[j]) {
        let temp = reposPerLanguageByType.labels[i];
        reposPerLanguageByType.labels[i] = reposPerLanguageByType.labels[j];
        reposPerLanguageByType.labels[j] = temp;

        temp = reposPerLanguageByType.datasets[0].data[i];
        reposPerLanguageByType.datasets[0].data[i] = reposPerLanguageByType.datasets[0].data[j];
        reposPerLanguageByType.datasets[0].data[j] = temp;

        temp = reposPerLanguageByType.datasets[1].data[i];
        reposPerLanguageByType.datasets[1].data[i] = reposPerLanguageByType.datasets[1].data[j];
        reposPerLanguageByType.datasets[1].data[j] = temp;
      }
    }
  }

  // sort repos in desc stars + forks + watches
  (data.repos || []).sort((l, r) => {
    if (l.stars + l.forks + l.watchers < r.stars + r.forks + r.watchers) {
      return 1;
    }
    return -1;
  });

  // popular owned repo analysis
  (data.repos || []).forEach(repo => {
    const score = repo.stars + repo.forks + repo.watchers;

    if (score && !repo.isFork) {
      const popularLength = popularReposOwned.labels.length;
      if (popularLength <= 3 && (repo.stars || repo.forks)) {
        popularReposOwned.labels.push(repo.full_name.split('/')[1].substr(0, 15));
        popularReposOwned.datasets[0].data.push(repo.stars);
        popularReposOwned.datasets[1].data.push(repo.forks);
      }
    }
  });

  return {
    ...data,
    commitsForked,
    commitsOwned,
    commitsPerRepo,
    popularReposOwned,
    languageStat,
    topLanguage,
    reposPerLanguageTotal,
    reposPerLanguageOwnedTotalMain,
    reposPerLanguageByType,
    starsPerLanguageOwned,
  };
};

export default generateReport;

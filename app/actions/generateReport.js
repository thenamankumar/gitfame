const colors = [
  '#ff443d',
  '#ef4e7b',
  '#9240bb',
  '#4f72b7',
  '#0b97ac',
  '#22c4de',
  '#00b199',
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

  // sort repos in desc commits
  (data.repos || []).sort((l, r) => {
    if (l.user_commits < r.user_commits) {
      return 1;
    }
    return -1;
  });

  (data.repos || []).forEach((repo, index) => {
    // total commits owned / forked
    if (repo.isFork) {
      commitsForked += repo.user_commits;
    } else {
      commitsOwned += repo.user_commits;
    }

    // commits per repo
    if (index < 10) {
      commitsPerRepo.labels.push(repo.full_name);
      commitsPerRepo.datasets[0].data.push(repo.user_commits);
    } else if (index === 10) {
      commitsPerRepo.labels[10] = 'Others';
      commitsPerRepo.datasets[0].data[10] = repo.user_commits;
    } else {
      commitsPerRepo.datasets[0].data[10] += repo.user_commits;
    }
  });

  return {
    ...data,
    commitsForked,
    commitsOwned,
    commitsPerRepo,
  };
};

export default generateReport;

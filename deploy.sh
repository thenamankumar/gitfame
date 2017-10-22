# GH_USER: Username for the user
# GH_TOKEN: Token or pass for the user
# GH_REF: github.com/<user-name>/<repo-name>.git
rm -rf build/
polymer install
polymer build
cd build/default/
git init .
git config --local user.name "hereisnaman"
git config --local user.email "naman@outlook.in"
now=$(date)
echo "Deployed on $now" >> "Deployed_$now".txt
git add -A
git commit -m "Deploy to Build"
git push --force --quiet "https://${GH_USER}:${GH_TOKEN}@${GH_REF}" master:gh-pages
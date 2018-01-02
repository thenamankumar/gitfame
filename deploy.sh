rm -rf build/
npm i
echo -e "NODE_ENV=production\nAPI_URL=https://backend.gitfa.me\nGIT_ID=$GITHUB_CLIENT_ID\nGIT_SECRET=$GITHUB_CLIENT_SECRET\nGIT_TOKEN=$GITHUB_PERSONAL_TOKEN" >> env/prod.env
npm run build
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf /var/www/html/gitfame/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r build/* $USER@$SERVER:/var/www/html/gitfame

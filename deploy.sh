rm -rf build/
npm i
npm run build
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf /var/www/html/gitfame-beta/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r build/* $USER@$SERVER:/var/www/html/gitfame-beta
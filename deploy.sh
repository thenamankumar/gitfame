rm -rf build/
yarn
yarn build
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf /var/www/html/gitfame/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r build/* $USER@$SERVER:/var/www/html/gitfame

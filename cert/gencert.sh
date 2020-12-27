winpty openssl genrsa -out key.pem
winpty openssl req -new -key key.pem -out csr.pem
winpty openssl x509 -req -days 825 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

FROM Node11

USER root

RUN git clone https://github.com/Ganter123/Node11.git

RUN apt update

RUN apt install -y mongodb

RUN service  mongodb start

RUN npm install eslint -y

EXPOSE 27017

COPY docker-entrypoint.sh /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]

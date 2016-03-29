FROM debian:stable
MAINTAINER cyril@dbyzero.com

#Install packages needed
RUN apt-get update
#nodejs 4.x
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
#RUN apt-get install -y npm
RUN apt-get install -y git
RUN apt-get install -y openssh-client
RUN apt-get install -y vim
RUN apt-get install -y pkg-config
RUN apt-get install -y nginx
RUN ln -s /usr/bin/nodejs /bin/node
RUN npm install -g npm
RUN npm install -g brunch
RUN npm install -g bower

#Get and prepare server code
WORKDIR /root
RUN export HOME=/root
RUN mkdir .ssh
COPY id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN echo 'StrictHostKeyChecking=no ' >>  /etc/ssh/ssh_config
RUN git clone git@github.com:dbyzero/deimos_data_manager.git
WORKDIR deimos_data_manager
RUN npm install
#RUN bower install

#Run server
EXPOSE 3333
#todo load nginx
CMD ["brunch","watch","--server"]
VOLUME /root/puck-backend

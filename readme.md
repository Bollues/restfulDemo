react-cli + egg.js/spring + mysql

> npm: '6.14.8'
>
> node: '14.15.1'
>
> maven: '3.8.1'
>
> jdk: 1.8
>
> tomcat: 7

### be-egg.js

```bash
cd be
npm init egg --type=simple (一路回车)
npm i
```

```bash
npm run dev
open http://127.0.0.1:7001/
```

```bash
npm install --save egg-sequelize mysql2
```



### be-spring

> init in https://start.spring.io/

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.76</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

```bash
./mvnw spring-boot:run
```







### fe

```bash
npx create-react-app my-app
cd my-app
npm start
```

```bash
yarn add axios
yarn add http-proxy-middleware
```



